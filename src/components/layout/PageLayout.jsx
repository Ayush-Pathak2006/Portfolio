import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "../motion/ScrollProgress";

const PageLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-[var(--color-background)]">
            <a
                href="#hero"
                className="absolute left-4 top-4 z-[60] -translate-y-24 rounded-full bg-[var(--color-text-primary)] px-4 py-2 text-sm text-[var(--color-background)] transition-transform focus:translate-y-0"
            >
                Skip to content
            </a>

            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default PageLayout;
