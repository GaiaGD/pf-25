import styles from "./Card.module.scss";

interface CardProps {
  heading: string;
  subheading: string;
}

export default function Card({ heading, subheading }: CardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.subheading}>{subheading}</p>
    </div>
  );
}