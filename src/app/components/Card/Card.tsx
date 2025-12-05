import { motion } from 'framer-motion';
import styles from "./Card.module.scss";

export default function Card({ heading, subheading, motionProps }: CardProps) {

  return (
    <motion.div className={styles.card} {...motionProps}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.container}>
        {(subheading && subheading.length > 0) &&
          subheading.map((line, index) => (
            <p key={index} className={styles.subheading}>{line}</p>
          )
        )}
      </div>
    </motion.div>
  );
}