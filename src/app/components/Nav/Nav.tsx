import styles from "./Nav.module.scss";

export default function Nav({ items, bringBackCard }: NavProps) {


  return (
    <nav className={styles.nav}>
      {items.length > 0 ? (
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.label} className={styles.navItem}>
              <div aria-label={item.label} onClick={() => bringBackCard(item.link)} className={styles.navLink}>
                {item.label}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}