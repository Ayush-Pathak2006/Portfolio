const DisplayHeading = ({ primary, secondary }) => {
    return (
        <h2 className="max-w-4xl text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            {primary}
            <br />
            <span className="font-display font-normal text-[var(--color-text-secondary)]">
                {secondary}
            </span>
        </h2>
    );
};

export default DisplayHeading;
