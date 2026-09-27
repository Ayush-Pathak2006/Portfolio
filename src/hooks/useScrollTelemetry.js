import { useEffect, useRef, useState } from "react";

const INITIAL = {
    depth: 0,
    distancePx: 0,
    isIdle: false,
    rageCount: 0,
    reachedBottom: false,
    direction: "down",
};

/**
 * Watches *how* the page is being scrolled, not just where. Everything is
 * quantised so React state settles a handful of times per session rather
 * than once per frame.
 *
 * depth: 0–1 document progress · distancePx: total travelled · isIdle: no input
 * for idleMs · rageCount: bursts of rapid direction reversals.
 */
const useScrollTelemetry = ({ idleMs = 25000, depthStep = 0.02, distanceStep = 500 } = {}) => {
    const [state, setState] = useState(INITIAL);

    // Ref mirror of the last committed value — the effect closure is created
    // once, so it must never read `state` directly.
    const committed = useRef(INITIAL);
    const lastY = useRef(0);
    const total = useRef(0);
    const dir = useRef("down");
    const flips = useRef(0);
    const lastFlipAt = useRef(0);
    const rage = useRef(0);
    const bottom = useRef(false);
    const idleTimer = useRef(null);
    const raf = useRef(0);

    useEffect(() => {
        lastY.current = window.scrollY;

        const commit = (next) => {
            committed.current = next;
            setState(next);
        };

        const armIdle = () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                if (document.visibilityState === "visible" && !committed.current.isIdle) {
                    commit({ ...committed.current, isIdle: true });
                }
            }, idleMs);
        };

        const read = () => {
            raf.current = 0;
            const y = window.scrollY;
            const delta = y - lastY.current;
            const travelled = Math.abs(delta);
            lastY.current = y;
            if (!travelled) return;

            total.current += travelled;

            const nextDir = delta > 0 ? "down" : "up";
            const now = performance.now();
            if (nextDir !== dir.current) {
                // A reversal within 400ms of the previous one counts toward rage.
                flips.current = now - lastFlipAt.current < 400 ? flips.current + 1 : 1;
                lastFlipAt.current = now;
                dir.current = nextDir;
                if (flips.current >= 4) {
                    flips.current = 0;
                    rage.current += 1;
                }
            }

            const max = document.documentElement.scrollHeight - window.innerHeight;
            const depth = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
            if (depth > 0.985) bottom.current = true;

            const prev = committed.current;
            const worthCommitting =
                Math.abs(depth - prev.depth) >= depthStep ||
                total.current - prev.distancePx >= distanceStep ||
                bottom.current !== prev.reachedBottom ||
                rage.current !== prev.rageCount ||
                prev.isIdle;

            if (!worthCommitting) return;

            commit({
                depth,
                distancePx: Math.round(total.current),
                isIdle: false,
                rageCount: rage.current,
                reachedBottom: bottom.current,
                direction: dir.current,
            });
        };

        const onScroll = () => {
            armIdle();
            if (!raf.current) raf.current = requestAnimationFrame(read);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        armIdle();

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, [idleMs, depthStep, distanceStep]);

    return state;
};

export default useScrollTelemetry;
