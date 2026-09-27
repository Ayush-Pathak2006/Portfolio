import { motion } from "framer-motion";
import { fadeInUp } from "../../lib/animations";

const Reveal = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
            variants={fadeInUp}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
