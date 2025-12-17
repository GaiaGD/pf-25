import styles from "./Nav.module.scss";

export default function Nav({ allCards, thrownCards, bringBackCard }: NavProps) {


  const isCardThrown = (card: CardLink) => thrownCards.map(thrownCard => thrownCard.link).includes(card.link)

  return (
    <nav className={styles.nav}>
      {allCards.length > 0 ? (
        <ul className={styles.navList}>
          {allCards.map((card) => (
              <li 
                key={card.heading} 
                className={`${styles.navItem}
                ${isCardThrown(card) ? styles.thrown : ''}
                `}
              >
                <button aria-label={card.heading} onClick={() => bringBackCard(card.link)} className={styles.navLink}>
                  {card.heading}
                </button>
              </li>
            ))}
        </ul>
      ) : null}
    </nav>
  );2
}

