import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import ProjectCard from "./ProjectCard";
import { projectsContent } from "./projects.config";

const Projects = () => {
    return (
        <SectionFrame
            id="projects"
            spacing="compact"
            eyebrow={projectsContent.eyebrow}
        >
            <Reveal>
                <DisplayHeading
                    primary={projectsContent.title.primary}
                    secondary={projectsContent.title.secondary}
                />

                <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                    {projectsContent.intro}
                </p>
            </Reveal>

            <div className="mt-16 border-t border-[var(--color-border)]">
                {projectsContent.projects.map((project) => (
                    <ProjectCard key={project.number} project={project} />
                ))}
            </div>
        </SectionFrame>
    );
};

export default Projects;
