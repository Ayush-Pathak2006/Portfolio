export const buildContent = {
    eyebrow: "03 / How I Build",
    title: {
        primary: "I don't just",
        secondary: "write code.",
    },
    intro:
        "I treat a feature as a path through a system: who needs it, what data it touches, which API owns it, and how it fails in the real world. The interface is one layer of that path — not the whole job.",
    principles: [
        {
            number: "01",
            title: "Understand the problem",
            description:
                "I write down the user action first. Book a room. Find a video. Report a need. Then I list the constraints: auth, availability, empty states, what happens when the network is slow.",
        },
        {
            number: "02",
            title: "Design the system",
            description:
                "Before files multiply, I decide where state lives, which calls are reads vs writes, and what the database is allowed to forget. Trade-offs stay explicit — especially around auth, caching, and third-party services.",
        },
        {
            number: "03",
            title: "Build the experience",
            description:
                "The UI should make the system obvious. Forms that don't lie, layouts that hold on a phone, and feedback when something is loading, booked, or unavailable.",
        },
        {
            number: "04",
            title: "Ship & improve",
            description:
                "I deploy early — Vercel, Netlify, whatever gets it in front of people. Then I fix the awkward path I only notice after using it myself.",
        },
    ],
};
