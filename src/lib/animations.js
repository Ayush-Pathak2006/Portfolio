export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 24,
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};


export const fadeIn = {
    hidden: {
        opacity: 0,
    },

    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};


export const staggerContainer = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};