const SkillCategory = ({ category }) => {
  return (
    <div className="grid gap-4 border-b border-[var(--color-border)] py-8 md:grid-cols-[180px_1fr] md:gap-10">
      <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
        {category.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;