import StacksIcon from '@/app/assets/stacks';
import MoreIcon from '@/app/assets/more'
import styles from "./Nav.module.scss";
import HelloIcon from "@/app/assets/hello";
import ClientsIcon from "@/app/assets/clients";
import ContactIcon from "@/app/assets/contact";

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
                  {card.link === 'about' && <HelloIcon className={`${styles.icon} about`} />}
                  {card.link === 'skills' && <StacksIcon className={`${styles.icon} skills`} />}
                  {card.link === 'clients' && <ClientsIcon className={`${styles.icon} clients`} />}
                  {card.link === 'else' && <MoreIcon className={`${styles.icon} else`} />}
                  {card.link === 'contact' && <ContactIcon className={`${styles.icon} contact`} />}
                  <span>{card.heading}</span>
                </button>
              </li>
            ))}
        </ul>
      ) : null}
    </nav>
  );2
}

