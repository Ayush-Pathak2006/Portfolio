const Container = ({ children, className = "" }) => {
    return (
        <div
            className={`mx-auto w-full max-w-[var(--max-content-width)] px-6 md:px-10 lg:px-12 ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;