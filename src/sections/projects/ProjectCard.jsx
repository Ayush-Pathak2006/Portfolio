const ProjectCard = ({ project }) => {
    return (
        <article className="group border-b border-[var(--color-border)] py-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[80px_1fr_1.2fr_140px] lg:items-start lg:gap-10">
                {/* Number */}
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                    {project.number}
                </span>

                {/* Project identity */}
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        {project.role}
                    </p>

                    <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-[var(--color-accent)] md:text-4xl">
                        {project.title}
                    </h3>
                </div>

                {/* Description + technologies */}
                <div>
                    <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                        {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Project links */}
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                    <a
                        href={project.links.live}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                    >
                        Live
                        <span aria-hidden="true">↗</span>
                    </a>

                    <a
                        href={project.links.github}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                    >
                        GitHub
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;