import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    categoryFeature,
    educationSpotlight,
    stackFlow,
    techAside,
    techCategories,
    techEcosystem,
} from "../../data/techData";
import { DUR, EASE, VIEWPORT_TALL } from "../../lib/motion";
import { cn } from "../../lib/utils";
import RevealText from "../../components/motion/RevealText";
import PinnedRail from "../../components/motion/PinnedRail";
import ScrollCounter from "../../components/motion/ScrollCounter";

/** Monogram tile standing in for a logo. */
const Glyph = ({ item, className }) => (
    <span
        aria-hidden="true"
        className={cn(
            "flex shrink-0 items-center justify-center border border-line bg-black/50 font-mono font-medium tracking-tight text-paper",
            className
        )}
    >
        {item.glyph}
    </span>
);

/**
 * Filterable stack index: a HUD for whatever is hovered or selected, a featured
 * card per category, peer cards, overflow chips, and a pinned horizontal rail.
 */
const TechIndex = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const featureId = categoryFeature[activeCategory];

    // Hover beats an explicit click, which beats the category default.
    const currentItem = useMemo(() => {
        const targetId = hoveredId || selectedId || featureId;
        return techEcosystem.find((item) => item.id === targetId) ?? techEcosystem[0];
    }, [hoveredId, selectedId, featureId]);

    const filtered = useMemo(
        () => techEcosystem.filter((item) => item.categories.includes(activeCategory)),
        [activeCategory]
    );
    const featured = filtered.find((item) => item.id === featureId) ?? filtered[0];
    const others = filtered.filter((item) => item.id !== featured.id);
    const peers = others.slice(0, 4);
    const overflow = others.slice(4);

    const changeCategory = (id) => {
        setActiveCategory(id);
        setSelectedId(null);
        setHoveredId(null);
    };

    const inspect = (id) => ({
        onClick: () => setSelectedId(id),
        onMouseEnter: () => setHoveredId(id),
        onMouseLeave: () => setHoveredId(null),
        onFocus: () => setHoveredId(id),
        onBlur: () => setHoveredId(null),
    });

    return (
        <section id="stack" className="relative border-t border-line/50 bg-graphite px-6 py-24 sm:px-10 md:px-16 md:py-32">
            {/* Clipping lives on this wrapper, not the section: an overflow-hidden
                ancestor would stop the rail below from pinning. */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-lavender/5 blur-[140px]" />
                <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-rust/5 blur-[140px]" />
            </div>

            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.7 }}
                            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute-dim"
                        >
                            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lavender" />
                            <span>04 / Stack</span>
                        </motion.div>

                        <RevealText
                            as="h2"
                            by="char"
                            delay={0.1}
                            stagger={0.05}
                            amount={0.6}
                            duration={DUR.base}
                            pad={0.14}
                            className="mt-3 block font-display text-4xl italic tracking-tight text-paper sm:text-5xl md:text-6xl"
                        >
                            Tools I reach for
                        </RevealText>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-2.5 max-w-xl font-mono text-xs leading-relaxed text-mute sm:text-sm"
                        >
                            What gets an idea from an empty repo to something live. These all show up in the work above.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.9, delay: 0.4 }}
                            className="mt-3 max-w-xl border-l border-line-strong pl-3 font-mono text-[10px] leading-relaxed text-mute-dim"
                        >
                            {techAside}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap gap-x-5 gap-y-2 pt-2 md:pt-0"
                        role="tablist"
                        aria-label="Filter technologies by category"
                    >
                        {techCategories.map((category) => {
                            const selected = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => changeCategory(category.id)}
                                    data-cursor="CLICK"
                                    className={cn(
                                        "relative pb-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
                                        selected ? "font-medium text-lavender" : "text-mute-dim hover:text-paper"
                                    )}
                                >
                                    {category.label}
                                    {selected && (
                                        <motion.span
                                            layoutId="activeCategoryUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-lavender"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Inspection HUD */}
                <div className="mb-10 mt-7" aria-live="polite">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.22 }}
                            className="relative overflow-hidden rounded-xl border border-line-strong bg-graphite-2/95 px-5 py-4 shadow-2xl backdrop-blur-md sm:px-6"
                        >
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-3.5">
                                    <Glyph item={currentItem} className="h-11 w-11 rounded-lg text-sm" />
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <h3 className="font-display text-xl italic text-paper sm:text-2xl">
                                                {currentItem.name}
                                            </h3>
                                            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lavender">
                                                {currentItem.categoryLabel}
                                            </span>
                                        </div>
                                        <p className="mt-0.5 font-mono text-xs text-mute">{currentItem.role}</p>
                                    </div>
                                </div>

                                {currentItem.joke ? (
                                    <div className="border-l-2 border-lavender/40 py-0.5 pl-3.5 sm:max-w-md">
                                        <p className="font-display text-xs italic leading-snug text-paper/90 sm:text-sm">
                                            &ldquo;{currentItem.joke}&rdquo;
                                        </p>
                                        {currentItem.note && (
                                            <p className="mt-0.5 font-mono text-[10px] text-mute-dim">↗ {currentItem.note}</p>
                                        )}
                                    </div>
                                ) : (
                                    currentItem.note && (
                                        <div className="border-l border-line py-0.5 pl-3 font-mono text-[11px] text-mute-dim sm:max-w-xs">
                                            ↗ {currentItem.note}
                                        </div>
                                    )
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="space-y-12">
                    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12">
                        <motion.div
                            layout
                            key={featured.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="md:col-span-6 lg:col-span-5"
                        >
                            <button
                                type="button"
                                {...inspect(featured.id)}
                                data-cursor="CORE"
                                aria-label={`${featured.name} — ${featured.role}`}
                                className={cn(
                                    "group relative flex h-full min-h-[200px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 sm:min-h-[230px] sm:p-7",
                                    currentItem.id === featured.id
                                        ? "border-lavender/60 bg-gradient-to-br from-graphite-2 via-[#18171f] to-black shadow-2xl ring-1 ring-lavender/30"
                                        : "border-line-strong bg-gradient-to-br from-graphite-2 to-black/80 hover:border-paper/30"
                                )}
                            >
                                <div
                                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lavender/10 blur-2xl"
                                    aria-hidden="true"
                                />
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper" />
                                        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-paper/80">
                                            {activeCategory === "all" ? "Most used" : `Featured ${activeCategory}`}
                                        </span>
                                    </div>
                                    <span className="rounded-full border border-lavender/30 px-2 py-0.5 font-mono text-[10px] text-lavender">
                                        {featured.categoryLabel}
                                    </span>
                                </div>

                                <div className="my-4 flex items-center gap-5">
                                    <Glyph
                                        item={featured}
                                        className="h-14 w-14 rounded-xl border-line-strong bg-black/60 text-lg transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-16"
                                    />
                                    <div>
                                        <h4 className="font-display text-2xl italic tracking-tight text-paper sm:text-3xl">
                                            {featured.name}
                                        </h4>
                                        <p className="mt-0.5 font-mono text-xs text-mute">{featured.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-line/60 pt-3">
                                    <p className="line-clamp-1 font-display text-[11px] italic text-paper/70 sm:text-xs">
                                        {featured.joke ? `“${featured.joke}”` : featured.role}
                                    </p>
                                    <span className="font-mono text-xs font-bold text-lavender">★</span>
                                </div>
                            </button>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:col-span-6 lg:col-span-7">
                            {peers.map((item, idx) => {
                                const inspected = currentItem.id === item.id;
                                return (
                                    <motion.button
                                        key={item.id}
                                        type="button"
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, delay: 0.05 * idx }}
                                        {...inspect(item.id)}
                                        data-cursor="LOOK"
                                        aria-label={`${item.name} — ${item.role}`}
                                        className={cn(
                                            "group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300",
                                            inspected
                                                ? "border-lavender/50 bg-graphite-2 shadow-lg ring-1 ring-lavender/20"
                                                : "border-line bg-black/30 hover:border-line-strong hover:bg-graphite-2/60"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Glyph
                                                item={item}
                                                className="h-9 w-9 rounded-lg text-[11px] transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-mute-dim">
                                                {item.categoryLabel}
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <div className="font-display text-lg italic text-paper transition-colors group-hover:text-lavender">
                                                {item.name}
                                            </div>
                                            <div className="mt-0.5 line-clamp-1 font-mono text-xs text-mute">{item.role}</div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {overflow.length > 0 && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute-dim">
                                    Supporting cast
                                </span>
                                <span className="font-mono text-[10px] text-mute-dim">
                                    <ScrollCounter value={overflow.length} /> more
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {overflow.map((item, idx) => {
                                    const inspected = currentItem.id === item.id;
                                    return (
                                        <motion.button
                                            key={item.id}
                                            type="button"
                                            layout
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.02 * idx }}
                                            {...inspect(item.id)}
                                            data-cursor="LOOK"
                                            aria-label={`${item.name} — ${item.role}`}
                                            className={cn(
                                                "group flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-left transition-all duration-300",
                                                inspected
                                                    ? "border-lavender/50 bg-lavender/10 shadow-sm"
                                                    : "border-line bg-black/25 hover:border-line-strong hover:bg-graphite-2"
                                            )}
                                        >
                                            <span className="font-mono text-[9px] text-mute-dim">{item.glyph}</span>
                                            <span className="font-mono text-[11px] text-paper transition-colors group-hover:text-lavender">
                                                {item.name}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {activeCategory === "all" && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7 }}
                            className="relative overflow-hidden rounded-2xl border border-lavender/30 bg-gradient-to-br from-[#15131c] via-graphite-2 to-black p-6 shadow-2xl sm:p-8"
                        >
                            <div
                                className="pointer-events-none absolute right-6 top-6 hidden select-none font-mono text-xs text-lavender opacity-10 sm:block"
                                aria-hidden="true"
                            >
                                <p>∇_θ L(θ) = E_x [∇_θ log p_θ(x)]</p>
                                <p className="mt-1">f(x) = σ(Wᵀx + b)</p>
                            </div>

                            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-lavender">
                                        <span className="inline-block h-1.5 w-1.5 rounded-sm bg-lavender" />
                                        <span>Degree in progress</span>
                                    </div>
                                    <h3 className="mt-2 font-display text-xl italic text-paper sm:text-2xl">
                                        {educationSpotlight.degree}
                                    </h3>
                                    <p className="mt-0.5 font-mono text-xs text-mute-dim">{educationSpotlight.institution}</p>
                                    <p className="mt-3 border-l-2 border-lavender/50 pl-3 font-display text-xs italic leading-relaxed text-paper/90 sm:text-sm">
                                        &ldquo;{educationSpotlight.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 lg:max-w-md">
                                    {educationSpotlight.domains.map((domain) => (
                                        <div
                                            key={domain}
                                            className="flex items-center gap-1.5 rounded-full border border-lavender/20 bg-lavender/5 px-3 py-1 font-mono text-[11px] text-paper backdrop-blur-sm"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-lavender" />
                                            <span>{domain}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeCategory === "all" && (
                        // No `layout` here: a layout transform on an ancestor of the
                        // rail's sticky child makes the pin jitter.
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={VIEWPORT_TALL}
                            transition={{ duration: 0.7 }}
                            className="border-t border-line/60 pt-8"
                        >
                            <div className="mb-5 flex items-baseline justify-between gap-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute-dim">
                                    One request, end to end
                                </span>
                                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-mute-dim">
                                    <span className="lg:hidden">swipe →</span>
                                    <span className="hidden lg:inline">scroll →</span>
                                </span>
                            </div>

                            <PinnedRail runway={0.35}>
                                {stackFlow.map((item, idx) => (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, y: 26 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: DUR.base, ease: EASE.out }}
                                        data-cursor="LOOK"
                                        className="group flex w-[240px] shrink-0 cursor-default flex-col justify-center pr-6 sm:w-[280px] lg:w-[300px]"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="block select-none font-display text-[20vw] italic leading-none text-paper/[0.05] transition-colors duration-500 group-hover:text-lavender/20 sm:text-[13vw] lg:text-[12vw]"
                                        >
                                            {item.step}
                                        </span>
                                        <div className="relative -mt-6 border-l border-line-strong py-1 pl-4 transition-colors duration-300 group-hover:border-lavender/50 sm:-mt-10">
                                            <span className="absolute -left-[3px] top-2 block h-1.5 w-1.5 rounded-full bg-lavender transition-transform duration-300 group-hover:scale-150" />
                                            <div className="font-mono text-[10px] font-semibold text-lavender">{item.step}</div>
                                            <div className="mt-1 font-display text-lg italic text-paper sm:text-xl">{item.label}</div>
                                            <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-mute-dim">
                                                {item.desc}
                                            </div>

                                            {/* Aside held closed until hover. */}
                                            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                                                <p className="overflow-hidden font-display text-xs italic leading-snug text-lavender/90">
                                                    &ldquo;{item.joke}&rdquo;
                                                </p>
                                            </div>

                                            <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-mute-dim/60">
                                                {String(idx + 1).padStart(2, "0")} / {String(stackFlow.length).padStart(2, "0")}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </PinnedRail>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto mt-16 max-w-3xl border-t border-line/40 pt-10 text-center"
                >
                    <p className="font-display text-base italic leading-relaxed text-paper/90 sm:text-lg md:text-xl">
                        &ldquo;The tool changes. Clear, maintainable product work does not.&rdquo;
                    </p>
                    <span className="mt-2.5 block font-mono text-[10px] uppercase tracking-widest text-mute-dim">
                        — A note to self
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default TechIndex;
