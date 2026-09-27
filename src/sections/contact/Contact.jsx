import { useState } from "react";
import Button from "../../components/common/Button";
import DisplayHeading from "../../components/common/DisplayHeading";
import Reveal from "../../components/common/Reveal";
import SectionFrame from "../../components/common/SectionFrame";
import { contactContent } from "./contact.config";

const Contact = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!subject.trim() || !message.trim()) {
            setError("Add a subject and a message before sending.");
            return;
        }

        setError("");

        const mailtoUrl = `mailto:${contactContent.email}?subject=${encodeURIComponent(
            subject.trim()
        )}&body=${encodeURIComponent(message.trim())}`;

        window.location.href = mailtoUrl;
    };

    return (
        <SectionFrame
            id="contact"
            spacing="generous"
            eyebrow={contactContent.eyebrow}
        >
            <Reveal>
                <DisplayHeading
                    primary={contactContent.title.primary}
                    secondary={contactContent.title.secondary}
                />

                <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                    {contactContent.description}
                </p>
            </Reveal>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-12 max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
                <div className="border-b border-[var(--color-border)] px-5 py-4">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        New message
                    </p>
                </div>

                <div className="border-b border-[var(--color-border)] px-5 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs text-[var(--color-text-muted)]">To</span>
                        <a
                            href={`mailto:${contactContent.email}`}
                            className="break-all text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                        >
                            {contactContent.email}
                        </a>
                    </div>
                </div>

                <div className="border-b border-[var(--color-border)] px-5 py-4">
                    <label htmlFor="subject" className="sr-only">
                        Subject
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder="Subject"
                        autoComplete="off"
                        aria-invalid={Boolean(error) && !subject.trim()}
                        className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    />
                </div>

                <div className="px-5 py-5">
                    <label htmlFor="message" className="sr-only">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Write your message..."
                        rows={7}
                        aria-invalid={Boolean(error) && !message.trim()}
                        className="w-full resize-none bg-transparent text-sm leading-7 text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                    />
                </div>

                <div className="flex flex-col gap-3 border-t border-[var(--color-border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p
                        className={`text-xs ${
                            error
                                ? "text-[var(--color-warning)]"
                                : "text-[var(--color-text-muted)]"
                        }`}
                        role={error ? "alert" : undefined}
                    >
                        {error || "Opens your email client"}
                    </p>

                    <Button type="submit" variant="pill" className="px-5 py-2.5 text-sm">
                        Send message
                        <span aria-hidden="true">↗</span>
                    </Button>
                </div>
            </form>

            <div className="mt-10 flex flex-wrap items-center gap-3">
                <p className="mr-2 text-sm text-[var(--color-text-secondary)]">
                    Or reach me here.
                </p>

                <Button href={contactContent.linkedin} variant="pill" external>
                    LinkedIn
                    <span aria-hidden="true">↗</span>
                </Button>

                <Button href={contactContent.github} variant="pill" external>
                    GitHub
                    <span aria-hidden="true">↗</span>
                </Button>
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                {contactContent.location}
            </p>
        </SectionFrame>
    );
};

export default Contact;
