import { SiTechcrunch } from "react-icons/si";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SiTechcrunch className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
        TechPro
      </span>
    </motion.div>
  );
}
