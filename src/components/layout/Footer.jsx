import Button from "../common/Button";
import Container from "../common/Container";
import { personal } from "../../data/personal";
import { socialLinks } from "../../data/socialLinks";

const Footer = () => {
    return (
        <footer className="border-t border-[var(--color-border)] py-12 md:py-16">
            <Container>
                <div className="flex flex-col gap-6 text-sm text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between">
                    <p>Designed, engineered & shipped by {personal.shortName}.</p>

                    <div className="flex flex-wrap items-center gap-4">
                        {socialLinks.map((link) => (
                            <Button
                                key={link.label}
                                href={link.href}
                                variant="secondary"
                                external={link.label !== "Email"}
                                className="text-xs uppercase tracking-[0.14em]"
                            >
                                {link.label}
                            </Button>
                        ))}
                    </div>

                    <p>© {new Date().getFullYear()} {personal.name}</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
