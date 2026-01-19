import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from "./Card.module.scss";
import SwipeUpIcon from '@/app/assets/swipeup';
import StacksIcon from '@/app/assets/stacks';
import MoreIcon from '@/app/assets/more'
import ClientsIcon from "@/app/assets/clients";
import ContactIcon from "@/app/assets/contact";

const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ index, heading, subheading, motionProps, link, id }, ref) {

  return (
    <motion.div ref={ref} className={styles.card} {...motionProps}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          {link === 'skills' && <StacksIcon className={`${styles.icon} skills`} />}
          {link === 'clients' && <ClientsIcon className={`${styles.icon} clients`} />}
          {link === 'else' && <MoreIcon className={`${styles.icon} else`} />}
          {link === 'contact' && <ContactIcon className={`${styles.icon} contact`} />}
          <h2 className={styles.heading}>{heading}</h2>
        </div>
        {(subheading && subheading.length > 0) &&
          subheading.map((line, index) => (
            <p key={index} className={styles.subheading} dangerouslySetInnerHTML={{ __html: line }} />
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
});

export default Card;