import PageLayout from "../components/layout/PageLayout";

import Hero from "../sections/hero/Hero";
import About from "../sections/about/About";
import Journey from "../sections/journey/Journey";
import Build from "../sections/build/Build";
import Projects from "../sections/projects/Projects";
import Skills from "../sections/skills/Skills";
import Contact from "../sections/contact/Contact";

const App = () => {
    return (
        <PageLayout>
            <Hero />
            <About/>
            <Journey />
            <Build />
            <Projects />
            <Skills />
            <Contact />
        </PageLayout>
    );
};

export default App;