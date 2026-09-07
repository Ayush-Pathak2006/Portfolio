const VARIANTS = {
    primary:
        "bg-[var(--color-text-primary)] text-black hover:opacity-90",
    secondary:
        "border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]",
};

const Button = ({
    children,
    variant = "primary",
    href,
    onClick,
    className = "",
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

    const variantStyles = VARIANTS[variant] ?? VARIANTS.primary;

    const styles = `${baseStyles} ${variantStyles} ${className}`;

    if (href) {
        return (
            <a href={href} className={styles}>
                {children}
            </a>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={styles}
        >
            {children}
        </button>
    );
};

export default Button;