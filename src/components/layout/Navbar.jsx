import Container from "../common/Container";

const NAV_ITEMS = [
    {
        label: "About",
        href: "#about",
    },
    {
        label: "Journey",
        href: "#journey",
    },
    {
        label: "Projects",
        href: "#projects",
    },
    {
        label: "Contact",
        href: "#contact",
    },
];

const Navbar = () => {
    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <Container>
                <nav className="mt-4 flex items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/80 px-5 py-3 backdrop-blur-xl">
                    <a
                        href="#"
                        className="text-sm font-semibold tracking-wide"
                    >
                        AYUSH
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#contact"
                        className="rounded-full bg-[var(--color-text-primary)] px-4 py-2 text-xs font-medium text-[var(--color-background)]"
                    >
                        Let's talk
                    </a>
                </nav>
            </Container>
        </header>
    );
};

export default Navbar;