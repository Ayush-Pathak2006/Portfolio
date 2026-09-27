import Button from "../../components/common/Button";
import ProjectMedia from "./ProjectMedia";

const hasLink = (url) => Boolean(url) && url !== "#";

const ProjectCard = ({ project }) => {
    return (
        <article
            className={
                project.imageSecondary
                    ? "border-b border-[var(--color-border)] pt-10 pb-24 md:pt-14 md:pb-28"
                    : "border-b border-[var(--color-border)] py-10 md:py-14"
            }
        >
            <div className="grid gap-6 lg:grid-cols-[80px_1fr_140px] lg:items-start lg:gap-10">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                    {project.number}
                </span>

                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        {project.role}
                    </p>

                    <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
                        {project.title}
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
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

                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                    {hasLink(project.links.live) && (
                        <Button
                            href={project.links.live}
                            variant="pill"
                            external
                            aria-label={`Open live site for ${project.title}`}
                        >
                            Live
                            <span aria-hidden="true">↗</span>
                        </Button>
                    )}

                    {hasLink(project.links.github) && (
                        <Button
                            href={project.links.github}
                            variant="pill"
                            external
                            aria-label={`Open GitHub repository for ${project.title}`}
                        >
                            GitHub
                            <span aria-hidden="true">↗</span>
                        </Button>
                    )}
                </div>
            </div>

            {project.image && <ProjectMedia project={project} />}
        </article>
    );
};

export default ProjectCard;
