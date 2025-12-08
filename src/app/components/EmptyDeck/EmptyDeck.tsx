import styles from "./EmptyDeck.module.scss";

export default function EmptyDeck( { emptyDeck, bringBackAllCards }: EmptyDeckProps ) {

	console.log("EmptyDeck rendered with emptyDeck =", emptyDeck);
	return (
		<div onClick={bringBackAllCards} className={`${styles.emptyDeck} ${emptyDeck ? styles.active : ''}`}>
			<p>Shuffle cards!</p>
		</div>
	);
}