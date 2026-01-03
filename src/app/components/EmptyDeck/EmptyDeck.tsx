import Cards from "@/app/assets/cards";
import styles from "./EmptyDeck.module.scss";

export default function EmptyDeck( { emptyDeck, bringBackAllCards }: EmptyDeckProps ) {

	return (
		<div onClick={bringBackAllCards} className={`${styles.emptyDeck} ${emptyDeck ? styles.active : ''}`}>
			<Cards className={`${styles.icon} more-cards`} />
			<p>Can I see the cards again?</p>
		</div>
	);
}