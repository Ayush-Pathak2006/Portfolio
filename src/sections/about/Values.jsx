const Values = ({ values }) => {
    return (
        <div className="mt-20 border-t border-[var(--color-border)]">
            {values.map((value, index) => (
                <div
                    key={value.title}
                    className="grid gap-4 border-b border-[var(--color-border)] py-8 md:grid-cols-[80px_1fr_1.5fr] md:items-start"
                >
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-medium tracking-tight">
                        {value.title}
                    </h3>

                    <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                        {value.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Values;
