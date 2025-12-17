import StacksIcon from "@/app/assets/stacks";
import styles from "./Nav.module.scss";
import HelloIcon from '@/app/assets/hello';
import ClientsIcon from "@/app/assets/clients";

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
                  {card.link === 'about' && <HelloIcon className={styles.icon} />}
                  {card.link === 'skills' && <StacksIcon className={styles.icon} />}
                  {card.link === 'clients' && <ClientsIcon className={styles.icon} />}
                  <span>{card.heading}</span>
                </button>
              </li>
            ))}
        </ul>
      ) : null}
    </nav>
  );2
}

