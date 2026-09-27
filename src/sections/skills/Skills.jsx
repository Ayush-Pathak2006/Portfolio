import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import SkillCategory from "./SkillCategory";
import { skillsContent } from "./skills.config";

const Skills = () => {
    return (
        <SectionFrame id="skills" spacing="compact" eyebrow={skillsContent.eyebrow}>
            <Reveal>
                <DisplayHeading
                    primary={skillsContent.title.primary}
                    secondary={skillsContent.title.secondary}
                />

                <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                    {skillsContent.intro}
                </p>
            </Reveal>

            <div className="mt-12 border-t border-[var(--color-border)]">
                {skillsContent.categories.map((category) => (
                    <SkillCategory key={category.title} category={category} />
                ))}

                <div className="grid gap-4 py-8 md:grid-cols-[180px_1fr] md:gap-10">
                    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        Currently learning
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {skillsContent.learning.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-[var(--color-accent)]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </SectionFrame>
    );
};

export default Skills;
