import styles from "./page.module.scss";
import Grainient from "./components/Grainient/Grainient";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <Grainient />
      </div>

      <main className={styles.main}>
        <section className={styles.section} id="hello">
          <h1>Oh, hey there!</h1>
          <p>My name is Gaia Di Gregorio and I am a front-end developer.</p>
          <p>I love creating bold and user-friendly products: solid, scalable and that will stick with you.</p>
          <p>Keep going and see what this is all about!</p>

          <h2>What can I do</h2>
          <p>I&apos;m good with languages. Personally and professionally.</p>
          <p>And with libraries and frameworks too.</p>
          <p>I specialize in React and TypeScript, with hands-on experience in Angular, and I&apos;m expanding my focus toward full-stack ownership and system design.</p>
        </section>

        <section className={styles.section} id="else">
          <h2>What else can I say?</h2>
          <p>Been exposed to diversity all my life, I give my best outside comfort zones.</p>
          <p>When I&apos;m not online, I&apos;m practicing jiu jitsu, visiting new places, or ironically-ish singing karaoke.</p>
        </section>

        <section className={styles.section} id="contact">
          <h2>Get in touch</h2>
          <p>Easy:</p>
          <p>
            You can find me on{' '}
            <a className="linkedin" href="https://www.linkedin.com/in/gaiadg/" target="_blank" rel="noopener noreferrer">LinkedIn</a>,{' '}
            <a className="github" href="https://github.com/GaiaGD" target="_blank" rel="noopener noreferrer">GitHub</a>,
          </p>
          <p>
            or send me an email at{' '}
            <a className="email" href="mailto:hi.gaiadg@gmail.com">hi.gaiadg@gmail.com</a>
          </p>
        </section>

      </main>
      <Footer />
    </div>
  );
}
