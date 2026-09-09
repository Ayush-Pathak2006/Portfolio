import HeroActions from "./HeroActions";

const HeroContent = () => {
    return (
        <div className="max-w-6xl pb-12 md:pb-16">
            <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />

                <span>Software Engineer</span>
            </div>

            <h1 className="max-w-5xl text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
                I build
                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                    {" "}
                    software
                </span>
                <br />
                for the real
                <br />
                world.
            </h1>

            <div className="mt-10 flex flex-col gap-8 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg">
                    Full-stack developer interested in building
                    useful products across the frontend, backend,
                    data and intelligent systems.
                </p>

                <div className="shrink-0">
                    <HeroActions />
                </div>
            </div>
        </div>
    );
};

export default HeroContent;