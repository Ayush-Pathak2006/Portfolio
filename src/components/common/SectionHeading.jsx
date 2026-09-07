const SectionHeading = ({
    eyebrow,
    title,
    description,
}) => {
    return (
        <div className="max-w-3xl">
            {eyebrow && (
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {eyebrow}
                </p>
            )}

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;