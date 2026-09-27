import Button from "../../components/common/Button";
import { heroContent } from "./hero.config";

const HeroActions = () => {
    return (
        <div className="flex flex-wrap items-center gap-6">
            <Button href={heroContent.primaryCta.href}>
                {heroContent.primaryCta.label}
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    ↘
                </span>
            </Button>

            <Button href={heroContent.secondaryCta.href} variant="secondary">
                {heroContent.secondaryCta.label} ↗
            </Button>
        </div>
    );
};

export default HeroActions;
