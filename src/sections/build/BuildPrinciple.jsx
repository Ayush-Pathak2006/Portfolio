const BuildPrinciple = ({ principle }) => {
    return (
        <article className="grid gap-6 border-b border-[var(--color-border)] py-10 md:grid-cols-[80px_1fr_1.5fr] md:gap-10">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                {principle.number}
            </span>

            <h3 className="text-2xl font-medium tracking-tight">
                {principle.title}
            </h3>

            <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                {principle.description}
            </p>
        </article>
    );
};

export default BuildPrinciple;
