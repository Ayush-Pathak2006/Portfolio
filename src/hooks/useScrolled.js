import { useEffect, useState } from "react";

const useScrolled = (threshold = 24) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => {
            setScrolled(window.scrollY > threshold);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });

        return () => {
            window.removeEventListener("scroll", update);
        };
    }, [threshold]);

    return scrolled;
};

export default useScrolled;
