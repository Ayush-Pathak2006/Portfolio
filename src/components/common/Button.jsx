const VARIANTS = {
    primary:
        "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]",

    secondary:
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
};

const Button = ({
    children,
    variant = "primary",
    href,
    onClick,
    className = "",
}) => {
    const baseStyles =
        "group inline-flex items-center justify-center text-sm font-medium transition-colors duration-300";

    const variantStyles =
        VARIANTS[variant] ?? VARIANTS.primary;

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