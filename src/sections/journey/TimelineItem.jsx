const TimelineItem = ({ entry }) => {
    return (
        <article className="grid gap-6 border-b border-[var(--color-border)] py-10 md:grid-cols-[100px_1fr] md:gap-10">
            <div>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                    {entry.period}
                </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        {entry.organization}
                    </p>

                    <h3 className="mt-3 text-2xl font-medium tracking-tight">
                        {entry.title}
                    </h3>
                </div>

                <div>
                    <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                        {entry.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                        {entry.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default TimelineItem;