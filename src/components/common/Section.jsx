const Section = ({
    children,
    id,
    className = "",
}) => {
    return (
        <section
            id={id}
            className={`relative w-full py-16 md:py-24 ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;