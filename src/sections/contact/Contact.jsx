import { useState } from "react";
import Container from "../../components/common/Container";
import Section from "../../components/common/Section";
import { contactContent } from "./contact.config";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const mailtoUrl = `mailto:${contactContent.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <Section id="contact" className="py-20 md:py-24">
      <Container>
        <div className="border-t border-[var(--color-border)] pt-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {contactContent.eyebrow}
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                {contactContent.title.primary}
                <br />

                <span className="font-display font-normal text-[var(--color-text-secondary)]">
                  {contactContent.title.secondary}
                </span>
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] md:text-lg md:leading-8">
                {contactContent.description}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-12 max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-border)]"
              >
                <div className="border-b border-[var(--color-border)] px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    New message
                  </p>
                </div>

                <div className="border-b border-[var(--color-border)] px-5 py-4">
    `            <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-[var(--color-text-muted)]">
                    To
                    </span>

                    <span className="text-sm text-[var(--color-text-secondary)]">
                    ayushpathak13022006@gmail.com
                    </span>
                </div>
                </div>`

                <div className="border-b border-[var(--color-border)] px-5 py-4">
                  <label
                    htmlFor="subject"
                    className="sr-only"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Subject"
                    className="w-full bg-transparent text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                  />
                </div>

                <div className="px-5 py-5">
                  <label
                    htmlFor="message"
                    className="sr-only"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write your message..."
                    rows={7}
                    className="w-full resize-none bg-transparent text-sm leading-7 text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-4">
                  <span className="hidden text-xs text-[var(--color-text-muted)] sm:block">
                    Opens your email client
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    Send message
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </form>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <p className="text-sm text-[var(--color-text-secondary)]">
                    You can also connect with me on LinkedIn.
                </p>

                <a
                    href={contactContent.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                >
                    LinkedIn
                    <span aria-hidden="true">↗</span>
                </a>
                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                {contactContent.location}
                </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;