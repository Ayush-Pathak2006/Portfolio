import Container from "../../components/common/Container";
import Section from "../../components/common/Section";

import ProjectCard from "./ProjectCard";
import { projectsContent } from "./projects.config";

const Projects = () => {
    return (
        <Section
            id="projects"
            className="py-20 md:py-20"
        >
            <Container>
                <div className="border-t border-[var(--color-border)] pt-6">
                    <div className="grid gap-10 md:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
                        {/* Section label */}
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                {projectsContent.eyebrow}
                            </p>
                        </div>

                        {/* Content */}
                        <div>
                            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                                {projectsContent.title.primary}
                                <br />

                                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                                    {projectsContent.title.secondary}
                                </span>
                            </h2>

                            <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                                {projectsContent.intro}
                            </p>

                            <div className="mt-16 border-t border-[var(--color-border)]">
                                {projectsContent.projects.map((project) => (
                                    <ProjectCard
                                        key={project.number}
                                        project={project}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default Projects;