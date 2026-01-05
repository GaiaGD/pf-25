import styles from './Footer.module.scss';

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Gaia DG.</p>
      </div>
    </footer>
  );
};
