import Container from "../../components/common/Container";
import Section from "../../components/common/Section";
import SkillCategory from "./SkillCategory";
import { skillsContent } from "./skills.config";

const Skills = () => {
  return (
    <Section id="skills" className="py-20 md:py-24">
      <Container>
        <div className="border-t border-[var(--color-border)] pt-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {skillsContent.eyebrow}
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                {skillsContent.title.primary}
                <br />

                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                  {skillsContent.title.secondary}
                </span>
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                {skillsContent.intro}
              </p>

              <div className="mt-12 border-t border-[var(--color-border)]">
                {skillsContent.categories.map((category) => (
                  <SkillCategory
                    key={category.title}
                    category={category}
                  />
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
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Skills;