import TimelineItem from "./TimelineItem";

const Timeline = ({ entries }) => {
    return (
        <div className="mt-20 border-t border-[var(--color-border)]">
            {entries.map((entry) => (
                <TimelineItem
                    key={`${entry.period}-${entry.title}`}
                    entry={entry}
                />
            ))}
        </div>
    );
};

export default Timeline;