const Section = ({
    children,
    id,
    className = "",
}) => {
    return (
        <section
            id={id}
            className={`relative w-full py-24 md:py-32 ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;