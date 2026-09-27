import { useEffect, useState } from "react";
import Button from "../common/Button";
import Container from "../common/Container";
import useScrolled from "../../hooks/useScrolled";
import { personal } from "../../data/personal";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const Navbar = () => {
    const scrolled = useScrolled(32);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const close = () => setMenuOpen(false);
        window.addEventListener("hashchange", close);
        return () => window.removeEventListener("hashchange", close);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <Container>
                <nav
                    className={`mt-4 flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
                        scrolled
                            ? "border-[var(--color-border)] bg-[var(--color-background)]/92 py-2.5"
                            : "border-[var(--color-border)] bg-[var(--color-background)]/80"
                    }`}
                    aria-label="Primary"
                >
                    <a
                        href="#hero"
                        className="text-sm font-semibold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                    >
                        {personal.shortName.toUpperCase()}
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <Button href="#contact" variant="solid" className="hidden sm:inline-flex">
                            Let's talk
                        </Button>

                        <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
                        </button>
                    </div>
                </nav>

                {menuOpen && (
                    <div
                        id="mobile-navigation"
                        className="mt-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)]/95 p-5 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-base text-[var(--color-text-secondary)]"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <Button href="#contact" variant="solid" onClick={() => setMenuOpen(false)}>
                                Let's talk
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
};

export default Navbar;
