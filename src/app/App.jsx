import MotionProvider from "./providers/MotionProvider";
import PortfolioExperience from "../sections/editorial/PortfolioExperience";

const App = () => {
    return (
        <MotionProvider>
            <PortfolioExperience />
        </MotionProvider>
    );
};

export default App;
