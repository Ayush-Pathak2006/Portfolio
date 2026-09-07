import Container from "../common/Container";

const Footer = () => {
    return (
        <footer className="border-t border-[var(--color-border)] py-10">
            <Container>
                <div className="flex flex-col gap-4 text-sm text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between">
                    <p>
                        Designed, engineered & shipped by Ayush.
                    </p>

                    <p>
                        © {new Date().getFullYear()} Ayush Pathak
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;