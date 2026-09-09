import BuildPrinciple from "./BuildPrinciple";

const BuildPrinciples = ({ principles }) => {
    return (
        <div className="mt-20 border-t border-[var(--color-border)]">
            {principles.map((principle) => (
                <BuildPrinciple
                    key={principle.number}
                    principle={principle}
                />
            ))}
        </div>
    );
};

export default BuildPrinciples;