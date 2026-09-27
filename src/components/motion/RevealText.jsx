import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, STAGGER } from "../../lib/motion";
import { cn } from "../../lib/utils";

/**
 * Reveals text from behind a clipping mask, one word / line / character at a time.
 *
 * Each unit sits in an overflow-hidden box and slides up from below it, so the
 * type is uncovered rather than faded in. Fraunces italic has long descenders,
 * so the clip box is padded downward by `pad` em and pulled back with a
 * negative margin — without that, every g/y/p gets sliced.
 */
const RevealText = ({
    children,
    as: Tag = "span",
    by = "word",
    className,
    delay = 0,
    stagger,
    once = true,
    amount = 0.45,
    duration = DUR.slow,
    pad = 0.16,
}) => {
    const reduce = useReducedMotion();
    const lines = Array.isArray(children) ? children : [children];
    const multiline = lines.length > 1 || by === "line";
    const step = stagger ?? (by === "char" ? STAGGER.tight : STAGGER.base);
    const fullText = lines.join(" ");

    if (reduce) {
        return (
            <Tag className={className}>
                {lines.map((line, i) => (
                    <span key={i} className={multiline ? "block" : undefined}>
                        {line}
                    </span>
                ))}
            </Tag>
        );
    }

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
    };

    const item = {
        hidden: { y: "110%", opacity: 0 },
        show: { y: "0%", opacity: 1, transition: { duration, ease: EASE.out } },
    };

    const clipStyle = { paddingBottom: `${pad}em`, marginBottom: `-${pad}em` };

    const unit = (text, key, nowrap = false) => (
        <span
            key={key}
            style={clipStyle}
            className={cn("inline-block overflow-hidden align-bottom", nowrap && "whitespace-nowrap")}
        >
            <motion.span variants={item} className="inline-block">
                {text}
            </motion.span>
        </span>
    );

    const renderLine = (line, li) => {
        if (by === "line") return unit(line, `l${li}`);

        if (by === "char") {
            // Split to words first so long headings never break mid-word.
            return line.split(/(\s+)/).map((chunk, ci) => {
                if (/^\s+$/.test(chunk)) return <span key={`s${li}-${ci}`}> </span>;
                return (
                    <span key={`w${li}-${ci}`} className="inline-block whitespace-nowrap">
                        {Array.from(chunk).map((ch, chi) => unit(ch, `c${li}-${ci}-${chi}`, true))}
                    </span>
                );
            });
        }

        // Real space nodes between inline-block words, or the spacing collapses.
        return line
            .split(/(\s+)/)
            .map((chunk, ci) =>
                /^\s+$/.test(chunk) ? <span key={`s${li}-${ci}`}> </span> : unit(chunk, `w${li}-${ci}`)
            );
    };

    return (
        <Tag className={className}>
            {/* Character splitting shreds screen-reader output, so give AT the clean string. */}
            {by === "char" && <span className="sr-only">{fullText}</span>}
            <motion.span
                aria-hidden={by === "char" ? true : undefined}
                initial="hidden"
                whileInView="show"
                viewport={{ once, amount }}
                variants={container}
                className={multiline ? "block" : "inline"}
            >
                {lines.map((line, li) => (
                    <span key={li} className={multiline ? "block" : "inline"}>
                        {renderLine(line, li)}
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
};

export default RevealText;
