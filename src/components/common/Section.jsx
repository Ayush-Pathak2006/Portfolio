const SPACING = {
    none: "",
    hero: "",
    default: "py-16 md:py-20",
    compact: "py-12 md:py-16",
    generous: "py-20 md:py-28",
};

const Section = ({
    children,
    id,
    spacing = "default",
    className = "",
}) => {
    return (
        <section
            id={id}
            className={`relative w-full scroll-mt-28 ${SPACING[spacing] ?? SPACING.default} ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;
