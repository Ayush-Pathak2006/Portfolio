import { useCallback, useState } from "react";
import { projects } from "../../data/portfolio";
import Loader from "../../components/chrome/Loader";
import SmoothScroll from "../../components/chrome/SmoothScroll";
import CustomCursor from "../../components/chrome/CustomCursor";
import FloatingNav from "../../components/chrome/FloatingNav";
import ScrollCommentary from "../../components/chrome/ScrollCommentary";
import Footer from "../../components/chrome/Footer";
import AmbientBackdrop from "../../components/motion/AmbientBackdrop";
import GrainOverlay from "../../components/motion/GrainOverlay";
import Hero from "./Hero";
import Identity from "./Identity";
import WhatIBuild from "./WhatIBuild";
import ProjectsIntro from "./ProjectsIntro";
import ProjectScene from "./ProjectScene";
import TechIndex from "./TechIndex";
import Experience from "./Experience";
import Currently from "./Currently";
import Contact from "./Contact";

/**
 * Layer order: backdrop z-40 → grain z-45 → commentary z-47 → nav z-50 →
 * loader z-1000 → cursor z-99999.
 */
const PortfolioExperience = () => {
    const [loaded, setLoaded] = useState(false);
    const handleLoaded = useCallback(() => setLoaded(true), []);

    return (
        <>
            <Loader onDone={handleLoaded} />
            {loaded && <SmoothScroll />}
            <CustomCursor />

            <AmbientBackdrop />
            <GrainOverlay />
            <ScrollCommentary />

            <FloatingNav />
            <main>
                <Hero />
                <Identity />
                <WhatIBuild />
                <ProjectsIntro />
                {projects.map((project, i) => (
                    <ProjectScene key={project.id} project={project} flip={i % 2 === 1} />
                ))}
                <TechIndex />
                <Experience />
                <Currently />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default PortfolioExperience;
