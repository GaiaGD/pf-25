import { motion } from 'framer-motion';
import styles from "./Card.module.scss";
import SwipeUpIcon from '@/app/assets/swipeup';

export default function Card({ heading, subheading, motionProps, index, id }: CardProps) {

  return (
    <motion.div style={{ rotate: `${index*2}deg` }} className={styles.card} {...motionProps}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.container}>
        {(subheading && subheading.length > 0) &&
          subheading.map((line, index) => (
            <p key={index} className={styles.subheading}>{line}</p>
          )
        )}
      </div>
      { id === 1 &&
        <div className={styles.swipeUp}>
          <SwipeUpIcon className={styles.rotatingIcon} />
        </div>
      }
    </motion.div>
  );
}