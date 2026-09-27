import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { contact, person } from "../../data/portfolio";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import RevealText from "../../components/motion/RevealText";
import Magnetic from "../../components/motion/Magnetic";

/** Fields arrive one after another rather than as a single block. */
const fieldGroup = {
    hidden: {},
    show: { transition: { staggerChildren: STAGGER.loose, delayChildren: 0.15 } },
};

const fieldItem = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.out } },
};

const SHORT_OK = new Set(["hi", "hey", "hello", "yo", "thanks"]);

const validate = {
    name: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "I need a name. Preferably yours.";
        if (trimmed.length < 2) return "That's suspiciously short for a name.";
        if (!/\p{L}/u.test(trimmed)) return "Let's keep the identity crisis out of the name field.";
        return null;
    },
    email: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "An email, so I can actually reply.";
        if (/\s/.test(trimmed)) return "There's a space in there. Emails don't do spaces.";
        if (!trimmed.includes("@")) return "That email is missing an @.";
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z0-9-]{2,}$/.test(trimmed)) return "That email looks unfinished.";
        return null;
    },
    message: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "You came all the way down here and brought no message?";
        if (!SHORT_OK.has(trimmed.toLowerCase()) && trimmed.length < 5) return "Give me a little more to work with.";
        return null;
    },
};

const EMPTY = { name: "", email: "", message: "" };

/**
 * No backend yet: a valid submit opens the visitor's mail client with the
 * message pre-filled. Swap `send` for a fetch() once an endpoint exists.
 */
const send = ({ name, email, message }) => {
    const subject = encodeURIComponent(`Hello from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
};

const Field = ({ id, label, value, onChange, onBlur, error, type = "text", textarea }) => {
    const Input = textarea ? "textarea" : "input";
    return (
        <motion.div variants={fieldItem} className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className={`group relative flex flex-col gap-2 border-b pb-3 transition-colors ${
                    error ? "border-danger" : "border-line focus-within:border-accent"
                }`}
            >
                {/* The rule draws in from the left as the field takes focus. */}
                {!error && (
                    <span
                        aria-hidden="true"
                        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-focus-within:scale-x-100"
                    />
                )}
                <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        error ? "text-danger" : "text-mute-dim group-focus-within:text-accent"
                    }`}
                >
                    {label}
                </span>
                <Input
                    id={id}
                    type={textarea ? undefined : type}
                    rows={textarea ? 2 : undefined}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={onBlur}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="resize-none bg-transparent font-display text-xl text-paper outline-none placeholder:text-mute-dim md:text-2xl"
                />
            </label>
            <AnimatePresence>
                {error && (
                    <motion.p
                        id={`${id}-error`}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-xs text-danger"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Contact = () => {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({ name: null, email: null, message: null });
    const [lineIdx, setLineIdx] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce) return undefined;
        const id = setInterval(() => setLineIdx((prev) => (prev + 1) % contact.rotating.length), 3500);
        return () => clearInterval(id);
    }, [reduce]);

    // Errors clear as soon as the field becomes valid, and appear on blur once there's input.
    const fieldProps = (key) => ({
        id: `contact-${key}`,
        value: form[key],
        error: errors[key],
        onChange: (value) => {
            setForm((prev) => ({ ...prev, [key]: value }));
            if (errors[key] && !validate[key](value)) setErrors((prev) => ({ ...prev, [key]: null }));
        },
        onBlur: () => {
            if (form[key]) setErrors((prev) => ({ ...prev, [key]: validate[key](form[key]) }));
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const next = {
            name: validate.name(form.name),
            email: validate.email(form.email),
            message: validate.message(form.message),
        };
        setErrors(next);
        if (next.name || next.email || next.message) return;

        send(form);
        setSent(true);
        setForm(EMPTY);
    };

    return (
        <section id="contact" className="relative bg-black px-6 py-28 sm:px-10 md:px-16 md:py-40">
            <div className="mx-auto max-w-3xl">
                <h2 className="font-display text-[15vw] italic leading-[0.88] text-paper sm:text-[9vw] md:text-[6vw]">
                    <RevealText by="word" amount={0.5} pad={0.2} duration={DUR.slow}>
                        Alright.
                    </RevealText>
                    <br />
                    <RevealText by="word" delay={0.14} amount={0.5} pad={0.2} duration={DUR.slow}>
                        Your turn.
                    </RevealText>
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: DUR.base, delay: 0.25, ease: EASE.out }}
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-12"
                >
                    <p className="max-w-md text-sm leading-relaxed text-mute md:text-base">{contact.lead}</p>
                    <p className="max-w-[13rem] font-mono text-[11px] italic leading-relaxed text-mute-dim sm:text-right">
                        {contact.aside}
                    </p>
                </motion.div>

                <div className="mt-14 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {!sent ? (
                            <motion.form
                                key="form"
                                noValidate
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fieldGroup}
                                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-8"
                            >
                                <Field label="Name" {...fieldProps("name")} />
                                <Field label="Email" type="email" {...fieldProps("email")} />
                                <Field label="Message" textarea {...fieldProps("message")} />

                                <motion.div variants={fieldItem} className="mt-4 flex flex-wrap items-center gap-6">
                                    <Magnetic strength={0.3}>
                                        <button
                                            type="submit"
                                            data-cursor="SAY HI"
                                            className="group relative flex items-center gap-3 overflow-hidden border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent"
                                        >
                                            {/* Fill wipes in from the left on hover. Transform-only. */}
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 origin-left scale-x-0 bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-x-100"
                                            />
                                            <span className="relative">Send it</span>
                                            <span
                                                aria-hidden="true"
                                                className="relative transition-transform group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </button>
                                    </Magnetic>
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="font-mono text-[11px] text-mute-dim underline-offset-4 hover:text-paper hover:underline"
                                    >
                                        or write to {person.email}
                                    </a>
                                </motion.div>

                                <motion.div variants={fieldItem} className="flex min-h-[1.5rem] items-center">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={lineIdx}
                                            initial={reduce ? false : { opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={reduce ? undefined : { opacity: 0 }}
                                            transition={{ duration: reduce ? 0 : 0.5 }}
                                            className="font-mono text-[11px] italic text-mute-dim"
                                        >
                                            {contact.rotating[lineIdx]}
                                        </motion.p>
                                    </AnimatePresence>
                                </motion.div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="sent"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: EASE.out }}
                            >
                                <RevealText
                                    by="char"
                                    stagger={0.03}
                                    duration={0.9}
                                    amount={0.3}
                                    pad={0.12}
                                    className="block font-display text-[11vw] italic leading-tight text-accent sm:text-[6.5vw] md:text-[4vw]"
                                >
                                    Almost gone.
                                </RevealText>
                                <motion.p
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: DUR.base, delay: 0.55, ease: EASE.out }}
                                    className="mt-4 max-w-md text-sm leading-relaxed text-mute md:text-base"
                                >
                                    Your mail app should have opened with everything filled in. Hit send there and
                                    it&rsquo;s on its way to my inbox.
                                </motion.p>
                                <button
                                    type="button"
                                    onClick={() => setSent(false)}
                                    className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute-dim underline-offset-4 hover:text-paper hover:underline"
                                >
                                    Nothing opened? Try again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Contact;
