/**
 * Shared motion vocabulary. Every animated component pulls from here so the
 * whole site moves like one object instead of twelve components that each guessed.
 */

export const EASE = {
    /** primary — decelerate hard, settle soft */
    out: [0.16, 1, 0.3, 1],
    /** curtains, scene swaps, anything that leaves and arrives */
    inOut: [0.76, 0, 0.24, 1],
    /** gentle, for small supporting elements */
    soft: [0.33, 1, 0.68, 1],
    /** sharp — use sparingly */
    expo: [0.87, 0, 0.13, 1],
};

export const SPRING = {
    snap: { type: "spring", stiffness: 380, damping: 30, mass: 0.5 },
    soft: { type: "spring", stiffness: 140, damping: 28, mass: 0.7 },
    heavy: { type: "spring", stiffness: 70, damping: 24, mass: 1.1 },
};

export const DUR = {
    fast: 0.4,
    base: 0.75,
    slow: 1.15,
    scene: 1.6,
};

export const STAGGER = {
    tight: 0.035,
    base: 0.07,
    loose: 0.13,
};

export const VIEWPORT = { once: true, amount: 0.45 };

/** Softer trigger for tall blocks that can't clear a 45% threshold. */
export const VIEWPORT_TALL = { once: true, amount: 0.15 };

/** The loader curtain clears around here; hero entrances wait for it. */
export const CURTAIN_CLEAR = 1.25;

/** Fade-and-rise used for section headers and asides. */
export const inView = (delay = 0, distance = 20) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.8, delay, ease: EASE.out },
});
