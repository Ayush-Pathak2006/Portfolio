import HeroActions from "./HeroActions";

const HeroContent = () => {
    return (
        <div className="max-w-2xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Software Engineer
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                I build products
                <br />
                from idea to
                <br />
                <span className="text-[var(--color-text-secondary)]">
                    production.
                </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
                I build full-stack applications across the frontend,
                backend and infrastructure — with a focus on creating
                products that are both technically solid and useful.
            </p>

            <HeroActions />
        </div>
    );
};

export default HeroContent;