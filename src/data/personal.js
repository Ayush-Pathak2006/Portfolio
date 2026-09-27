import portrait from "../assets/images/portrait.jpg";

export const personal = {
    name: "Ayush Pathak",
    shortName: "Ayush",
    role: "Software Engineer",
    location: "New Delhi, India",
    email: "ayushpathak13022006@gmail.com",
    github: "https://github.com/Ayush-Pathak2006",
    linkedin: "https://in.linkedin.com/in/ayush-pathak-75a985293",
    portrait,
};

export const heroContent = {
    eyebrow: "Software Engineer · New Delhi",
    headline: {
        primary: "I build",
        accent: "software",
        rest: ["people can", "actually use."],
    },
    description:
        "Full-stack developer and third-year B.Tech student. I work across the interface, the API, and the data — then ship it.",
    primaryCta: {
        label: "View my work",
        href: "#projects",
    },
    secondaryCta: {
        label: "Let's talk",
        href: "#contact",
    },
};

export const aboutContent = {
    eyebrow: "01 / About",
    title: {
        primary: "A little",
        secondary: "about me.",
    },
    intro: [
        "I'm Ayush — a software developer in New Delhi who likes taking a messy idea and turning it into something a person can click, book, search, or rely on.",
        "Most of my work sits across the stack: React on the client, APIs and auth in the middle, and a database that has to stay honest when the UI looks finished. I care about how those pieces talk to each other, not just how they look in isolation.",
        "I'm still early. That means I ship real projects, read the parts that break, and get more precise about architecture every time I do it again.",
    ],
    values: [
        {
            title: "Start from the product",
            description:
                "I ask what the user is trying to finish before I pick a library. A booking flow, a search result — the interface is the last mile of a decision.",
        },
        {
            title: "Make the system legible",
            description:
                "If I can't explain the data flow on a whiteboard, the code isn't ready. Clear boundaries between UI, API, and storage save more time than clever shortcuts.",
        },
        {
            title: "Ship, then tighten",
            description:
                "A deployed product teaches faster than a perfect local demo. I like getting something live, watching where it fails, and improving the next pass with evidence.",
        },
    ],
};

export const contactContent = {
    eyebrow: "06 / Let's Talk",
    title: {
        primary: "Let's build",
        secondary: "something useful.",
    },
    description:
        "Have a role, a product idea, or a question about something I shipped? Write it here — I'll read it.",
    email: personal.email,
    linkedin: personal.linkedin,
    github: personal.github,
    location: personal.location,
};
