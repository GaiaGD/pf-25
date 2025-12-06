import styles from "./EmptyDeck.module.scss";

export default function EmptyDeck( { emptyDeck }: EmptyDeckProps ) {

    console.log("EmptyDeck rendered with emptyDeck =", emptyDeck);
    return (
        <div className={`${styles.emptyDeck} ${emptyDeck ? styles.active : ''}`}>
            <p>Shuffle cards!</p>
        </div>
    );
}