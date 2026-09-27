const VARIANT_STYLES = {
    primary:
        "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]",
    secondary:
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
    pill:
        "rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
    solid:
        "rounded-full bg-[var(--color-text-primary)] px-4 py-2 text-xs font-medium text-[var(--color-background)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]",
};

const Button = ({
    children,
    variant = "primary",
    href,
    onClick,
    type = "button",
    className = "",
    external = false,
    ...props
}) => {
    const isPlain = variant === "primary" || variant === "secondary";
    const baseStyles = isPlain
        ? "group inline-flex items-center justify-center text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        : "inline-flex items-center justify-center gap-2 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

    const styles = `${baseStyles} ${VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                onClick={onClick}
                className={styles}
                {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button type={type} onClick={onClick} className={styles} {...props}>
            {children}
        </button>
    );
};

export default Button;
