/**
 * Stack for the tech index. `glyph` is the short monogram shown in the icon
 * tile; `categories` decides which filter tabs an item appears under.
 */

export const techCategories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "data", label: "Data" },
    { id: "tools", label: "Tools" },
];

/** Which item anchors the featured card for each tab. */
export const categoryFeature = {
    all: "react",
    frontend: "react",
    backend: "node",
    data: "supabase",
    tools: "git",
};

export const techEcosystem = [
    {
        id: "react",
        name: "React",
        glyph: "Re",
        categoryLabel: "Frontend",
        role: "Component-driven interfaces",
        joke: "Everything is a component until proven otherwise.",
        note: "Both shipped projects",
        categories: ["all", "frontend"],
    },
    {
        id: "javascript",
        name: "JavaScript",
        glyph: "JS",
        categoryLabel: "Frontend",
        role: "The language under everything here",
        note: "Client and server",
        categories: ["all", "frontend", "backend"],
    },
    {
        id: "tailwind",
        name: "Tailwind CSS",
        glyph: "Tw",
        categoryLabel: "Frontend",
        role: "Utility-first styling",
        joke: "Somewhere underneath this is still CSS.",
        categories: ["all", "frontend"],
    },
    {
        id: "router",
        name: "React Router",
        glyph: "RR",
        categoryLabel: "Frontend",
        role: "Client-side routing",
        categories: ["all", "frontend"],
    },
    {
        id: "html",
        name: "HTML5",
        glyph: "<>",
        categoryLabel: "Frontend",
        role: "Semantic structure",
        categories: ["all", "frontend"],
    },
    {
        id: "css",
        name: "CSS3",
        glyph: "{}",
        categoryLabel: "Frontend",
        role: "Layout and motion",
        joke: "Centering things is a solved problem. Mostly.",
        categories: ["all", "frontend"],
    },
    {
        id: "node",
        name: "Node.js",
        glyph: "No",
        categoryLabel: "Backend",
        role: "Server runtime",
        joke: "JavaScript, but now it has access to the file system.",
        note: "APIs and scripts",
        categories: ["all", "backend"],
    },
    {
        id: "express",
        name: "Express",
        glyph: "Ex",
        categoryLabel: "Backend",
        role: "HTTP routing and middleware",
        categories: ["all", "backend"],
    },
    {
        id: "rest",
        name: "REST APIs",
        glyph: "/:",
        categoryLabel: "Backend",
        role: "Contracts between client and server",
        categories: ["all", "backend"],
    },
    {
        id: "supabase",
        name: "Supabase",
        glyph: "Sb",
        categoryLabel: "Data",
        role: "Postgres, auth and edge functions",
        joke: "A backend I didn't have to babysit. Usually.",
        note: "Ruby Manor, Video Treasure, My1Hour CRM",
        categories: ["all", "data", "backend"],
    },
    {
        id: "postgres",
        name: "PostgreSQL",
        glyph: "Pg",
        categoryLabel: "Data",
        role: "Relational data",
        categories: ["all", "data"],
    },
    {
        id: "mysql",
        name: "MySQL",
        glyph: "My",
        categoryLabel: "Data",
        role: "Relational data",
        categories: ["all", "data"],
    },
    {
        id: "mongodb",
        name: "MongoDB",
        glyph: "Mg",
        categoryLabel: "Data",
        role: "Document storage",
        categories: ["all", "data"],
    },
    {
        id: "git",
        name: "Git & GitHub",
        glyph: "Gt",
        categoryLabel: "Tools",
        role: "Version control and collaboration",
        joke: "The undo button I trust the most.",
        categories: ["all", "tools"],
    },
    {
        id: "vite",
        name: "Vite",
        glyph: "Vi",
        categoryLabel: "Tools",
        role: "Build tooling",
        categories: ["all", "tools"],
    },
    {
        id: "postman",
        name: "Postman",
        glyph: "Pm",
        categoryLabel: "Tools",
        role: "API testing",
        categories: ["all", "tools"],
    },
    {
        id: "vscode",
        name: "VS Code",
        glyph: "VS",
        categoryLabel: "Tools",
        role: "Where the time goes",
        categories: ["all", "tools"],
    },
];

export const educationSpotlight = {
    degree: "B.Tech, Artificial Intelligence & Machine Learning",
    institution: "Guru Gobind Singh Indraprastha University · 2023 — 2027",
    quote: "Learning the maths behind the models, one assignment at a time.",
    domains: ["Machine Learning", "Python", "LLMs", "RAG", "TypeScript (learning)"],
};

/** The pinned horizontal rail: one request, followed through the stack. */
export const stackFlow = [
    {
        step: "01",
        label: "Interface",
        desc: "React components, layouts that hold on a phone.",
        joke: "The part everyone sees, and the part I redo most.",
    },
    {
        step: "02",
        label: "State",
        desc: "Where data lives on the client and who's allowed to change it.",
        joke: "Most bugs start here and get blamed on the API.",
    },
    {
        step: "03",
        label: "API",
        desc: "Express routes and REST contracts between client and server.",
        joke: "A contract is only as good as its error responses.",
    },
    {
        step: "04",
        label: "Auth",
        desc: "Google sign-in, sessions, and row-level rules.",
        joke: "The feature nobody notices until it breaks.",
    },
    {
        step: "05",
        label: "Data",
        desc: "Postgres, Mongo, MySQL — schemas that stay honest.",
        joke: "The UI can lie. The database shouldn't.",
    },
    {
        step: "06",
        label: "Deploy",
        desc: "Vercel, Netlify, Hostinger. Live early, fixed often.",
        joke: "Production is the best test suite I own.",
    },
];

export const techAside = "A list like this always looks tidier than the process that produced it.";
