import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default PageLayout;