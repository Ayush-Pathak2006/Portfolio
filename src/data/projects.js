import videoTreasure from "../assets/images/video-treasure.png";
import videoTreasureMobile from "../assets/images/video-treasure-mobile.png";
import rubyManor from "../assets/images/ruby-manor.png";

export const projectsContent = {
    eyebrow: "04 / Things I'm Not Afraid to Show",
    title: {
        primary: "Things I'm not",
        secondary: "afraid to show.",
    },
    intro:
        "Two products I designed, built, and deployed. Each one taught me something the previous one didn't.",
    projects: [
        {
            number: "01",
            title: "Video Treasure",
            role: "Full-stack development",
            description:
                "A single place to discover and watch videos pulled from multiple sources, so browsing doesn't mean hopping between sites. Search, aggregation, and a continuous viewing flow — shipped on Vercel.",
            technologies: ["React", "Node.js", "Supabase"],
            image: videoTreasure,
            imageSecondary: videoTreasureMobile,
            links: {
                live: "https://video-treasure.vercel.app",
                github: "https://github.com/Ayush-Pathak2006/Video-Treasure",
            },
        },
        {
            number: "02",
            title: "Ruby Manor",
            role: "Full-stack development",
            description:
                "A hotel booking product, not a brochure. Rooms and dining reservations, Google auth, waitlists when dates are full, and confirmation emails through Supabase Edge Functions. Built so availability and bookings stay in sync.",
            technologies: ["React", "Tailwind CSS", "Supabase", "React Router"],
            image: rubyManor,
            links: {
                live: "https://rubymanor.netlify.app",
                github: "https://github.com/Ayush-Pathak2006/Ruby_Manor",
            },
        },
    ],
};
