export const architectureNodes = [
    {
        id: "frontend",
        type: "node",
        label: "Frontend",
        description: "React · JavaScript · Tailwind",
        position: [-1.8, 1.2, 0.4],
        animation: {
            amplitude: 0.12,
            speed: 0.8,
            phase: 0,
        },
    },
    {
        id: "backend",
        type: "core",
        label: "API Core",
        description: "Node.js · APIs · Authentication",
        position: [0, 0, -0.4],
        animation: {
            amplitude: 0.05,
            speed: 0.5,
            phase: 1.5,
        },
    },
    {
        id: "database",
        type: "node",
        label: "Database",
        description: "MongoDB · MySQL · PostgreSQL",
        position: [1.8, 1.2, 0.4],
        animation: {
            amplitude: 0.1,
            speed: 0.7,
            phase: 3,
        },
    },
    {
        id: "infrastructure",
        type: "node",
        label: "Infrastructure",
        description: "Docker · CI/CD · Cloud",
        position: [1.8, -1.2, -0.2],
        animation: {
            amplitude: 0.14,
            speed: 0.9,
            phase: 4.5,
        },
    },
    {
        id: "ai",
        type: "node",
        label: "AI / ML",
        description: "Python · AI · LLMs",
        position: [-1.8, -1.2, 0.2],
        animation: {
            amplitude: 0.11,
            speed: 0.75,
            phase: 6,
        },
    },
];

export const architectureConnections = [
    { source: "frontend", target: "backend" },
    { source: "backend", target: "database" },
    { source: "backend", target: "infrastructure" },
    { source: "backend", target: "ai" },
];
