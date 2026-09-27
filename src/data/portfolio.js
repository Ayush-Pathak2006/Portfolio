import { personal } from "./personal";
import { projectsContent } from "./projects";
import { journeyContent } from "./experience";

/**
 * Content for the editorial layout. Facts come from the other data files;
 * this module adds the page's voice — asides, rotating lines, commentary.
 */

export const person = {
    name: personal.name,
    first: personal.shortName,
    location: "New Delhi",
    year: "2026",
    email: personal.email,
    github: personal.github,
    linkedin: personal.linkedin,
    portrait: personal.portrait,
};

export const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Say Hi", href: "#contact" },
];

export const heroTags = ["Full Stack", "AI / ML", person.location, person.year];

export const heroStatusLines = [
    "Probably renaming a variable for the third time.",
    "It worked locally. That has to count for something.",
    "Reading the docs after trying everything else first.",
    "One more feature, then the README. Probably.",
    "Currently convinced it's a caching issue.",
    "Shipping first, tightening second.",
    "Somewhere between 'quick fix' and 'rewrite'.",
    "Supabase and I are on speaking terms again.",
];

export const about = {
    statement:
        "I like taking simple ideas and overcomplicating them until they start looking good.",
    lines: [
        "Full-stack developer.",
        "B.Tech AI & ML student.",
        "React on the client, APIs in the middle, a database that has to stay honest.",
    ],
    rotating: [
        "Early in the career. Late in the night.",
        "Early in the career. Already opinionated about folder structure.",
        "Early in the career. Learning mostly by shipping.",
        "Early in the career. Reading every error message twice.",
        "Early in the career. Deploying anyway.",
    ],
};

export const buildCategories = [
    {
        index: "01",
        title: "Full Stack",
        lines: ["React.", "Node.", "Express.", "REST APIs.", "Supabase.", "SQL & Mongo."],
        aside: "The part I'd put on a resume.",
    },
    {
        index: "02",
        title: "Products, not demos",
        lines: ["Auth.", "Bookings.", "Search.", "Emails that actually send.", "Empty states."],
        aside: "The part that takes longer than the demo suggests.",
    },
    {
        index: "03",
        title: "AI / ML",
        lines: ["B.Tech in AI & ML.", "Learning LLMs and RAG.", "Still very much a student of it."],
        aside: "The part I'm still actively wrong about.",
    },
];

export const projectsIntro = {
    title: ["Work I'm happy", "to show you."],
    tagline: "Both started small. Obviously.",
};

/** Adapts projectsContent into the scene shape: tone, status, image set, links. */
const projectExtras = {
    "Video Treasure": {
        id: "video-treasure",
        tone: "accent",
        status: "Live · Vercel",
        note: "Built because tab-hopping between video sites felt like a job.",
    },
    "Ruby Manor": {
        id: "ruby-manor",
        tone: "mint",
        status: "Live · Netlify",
        note: "A booking flow is mostly edge cases wearing a nice layout.",
    },
};

export const projects = projectsContent.projects.map((project) => {
    const extras = projectExtras[project.title] ?? { id: project.number, tone: "mute" };
    return {
        ...extras,
        index: project.number,
        title: project.title.toUpperCase().split(" "),
        description: project.description,
        tech: project.technologies.map((tech) => tech.toUpperCase()),
        // `kind` picks the frame: a browser-style card or a phone.
        images: [
            { src: project.image, kind: "desktop" },
            project.imageSecondary && { src: project.imageSecondary, kind: "mobile" },
        ].filter(Boolean),
        links: [
            { label: "Live site ↗", url: project.links.live },
            { label: "Source ↗", url: project.links.github },
        ],
    };
});

export const experience = [
    ...journeyContent.entries.map((entry) => ({
        year: entry.period.match(/\d{4}/)?.[0] ?? "",
        period: entry.period,
        role: entry.title,
        org: entry.organization,
        detail: entry.description,
    })),
    {
        year: "2023–27",
        period: "CGPA 8.13 / 10",
        role: "B.Tech, Artificial Intelligence & Machine Learning",
        org: "Guru Gobind Singh Indraprastha University",
        detail: "Currently in progress. The syllabus and I have reached an understanding.",
    },
];

export const experienceAsides = [
    "Learned that 'the ERP already does that' is a sentence worth verifying.",
    "Where Git stopped being a thing I was scared of.",
    "Third year. The assignments now have deploy steps.",
];

export const currently = [
    { label: "Building", value: "this portfolio, which was supposed to take a weekend" },
    { label: "Learning", value: "TypeScript, and how LLMs actually retrieve things" },
    { label: "Reading", value: "other people's code, to see how they avoided my mistakes" },
    { label: "Status", value: "open to internships and interesting problems" },
];

export const currentlyAside = "Four fields. At least one is aspirational.";

export const sectionAsides = {
    build: "Roughly in order of how much of my week they take up.",
    work: "Two products. Both live, both still getting small fixes.",
    experience: "A tidy timeline for a sequence of events that was not tidy.",
    currently: "Accurate as of whenever I last remembered to update this.",
};

export const contact = {
    lead: "Got a role, a product idea, or a question about something I shipped?",
    aside: "Three fields. I'll do the overthinking from here.",
    rotating: [
        "Yes, I actually read these.",
        "No formality required. 'Hey' works.",
        "This is your sign to hit send.",
        "There's a real person on the other side of this.",
    ],
};

export const footer = {
    line: "Designed and built with more attention to detail than was strictly necessary.",
    sub: "No bugs were consulted during production.",
};

/** Corner commentary, triggered by scroll depth. Must stay ascending by `at`. */
export const marginWhispers = [
    { at: 0.1, text: "Good start. There's a fair amount of this." },
    { at: 0.3, text: "Still here. Noted, and appreciated." },
    { at: 0.55, text: "Over halfway. No refunds on the time spent." },
    { at: 0.8, text: "Nearly through. The contact form is the last stop." },
];

export const idleQuips = [
    "Still there? Take your time.",
    "Nothing's broken. You've just stopped scrolling.",
];

export const rageQuips = [
    "Whatever you're looking for, it's probably below.",
    "Easy. The layout doesn't change if you scrub it.",
];

export const bottomQuips = ["That's everything. There's no secret extra section."];

const UNITS = [
    { metres: 0.18, one: "banana", many: "bananas" },
    { metres: 5.5, one: "giraffe", many: "giraffes" },
    { metres: 11, one: "DTC bus", many: "DTC buses" },
    { metres: 20.12, one: "cricket pitch", many: "cricket pitches" },
];

/** Raw scroll distance → absurd but honest physical comparison (96 CSS px per inch). */
export const describeDistance = (px) => {
    const metres = px / 3779.5;
    if (metres <= 0) return "no distance at all";

    let chosen = UNITS[0];
    for (const unit of UNITS) {
        if (metres / unit.metres >= 1.2) chosen = unit;
    }

    const count = metres / chosen.metres;
    const shown = count < 10 ? Math.round(count * 10) / 10 : Math.round(count);
    return `about ${shown} ${shown === 1 ? chosen.one : chosen.many}`;
};
