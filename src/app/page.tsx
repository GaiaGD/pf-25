import styles from "./page.module.scss";
import Grainient from "./components/Grainient/Grainient";
import Footer from "./components/Footer/Footer";
import VerticalScroller from "./components/VerticalScroller/VerticalScroller";
import WorkSlide from "./components/WorkSlide/WorkSlide";
import worksData from "../../works.json";

type NdaProject = { client: string; role: string; year: string; logo: string; summary: string; tech: string[]; highlights: string[] }

const imageWorks = worksData.works.filter((w) => w.image)
const ndaProjects = worksData.works
  .filter((w) => 'projects' in w)
  .flatMap((w) => ('projects' in w ? (w.projects as NdaProject[]) : []))


export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <Grainient />
      </div>

      <section className={styles.hero} id="hello">
        <div className={styles.firstContent}>
          <h1>Oh, hey there!</h1>
          <p>My name is Gaia Di Gregorio and I am a front-end developer.</p>
          <p>I love creating bold and user-friendly products: solid, scalable and that will stick with you.</p>
          <p>Keep going and see what this is all about!</p>

          <h2>What can I do</h2>
          <p>I&apos;m good with languages. Personally and professionally.</p>
          <p>And with libraries and frameworks too.</p>
          <p>I specialize in React and TypeScript, with hands-on experience in Angular, and I&apos;m expanding my focus toward full-stack ownership and system design.</p>
        </div>

        <div className={styles.lastContent}>
          <h2>What else can I say?</h2>
          <p>Been exposed to diversity all my life, I give my best outside comfort zones.</p>
          <p>When I&apos;m not online, I&apos;m practicing jiu jitsu, visiting new places, or ironically-ish singing karaoke.</p>

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
        </div>
      </section>

      <VerticalScroller>

        {/* <div /> transparent spacer — hero shows through at slide 0 */}
        <div />
        
        {imageWorks.map((work) => (
          <WorkSlide
            key={work.id}
            title={work.title}
            role={work.role}
            year={work.year}
            summary={work.summary}
            highlights={work.highlights}
            tech={work.tech}
            image={work.image!}
            url={work.url}
            urlLabel={'urlLabel' in work ? String(work.urlLabel) : undefined}
          />
        ))}

        {ndaProjects.map((proj) => (
          <WorkSlide
            key={proj.client}
            title={proj.client}
            role={proj.role}
            year={proj.year}
            summary={proj.summary}
            highlights={proj.highlights}
            tech={proj.tech}
            logo={proj.logo}
          />
        ))}

        {/* <div /> transparent spacer — contacts shows through at last slide */}
        <div />

      </VerticalScroller>

      <Footer />
    </div>
  );
}
