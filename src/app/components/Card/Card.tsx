import { motion } from 'framer-motion';
import styles from "./Card.module.scss";

export default function Card({ heading, subheading, motionProps }: CardProps) {
  return (
    <motion.div className={styles.card} {...motionProps}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.subheading}>{subheading}</p>
    </motion.div>
  );
}