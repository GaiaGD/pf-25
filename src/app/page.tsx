import styles from "./page.module.scss";
import Grainient from "./components/Grainient/Grainient";
import Footer from "./components/Footer/Footer";
import VerticalScroller from "./components/VerticalScroller/VerticalScroller";
import WorkSlide from "./components/WorkSlide/WorkSlide";
import DecryptedText from "./components/DecryptedText/DecryptedText";
import ShinyText from "./components/ShinyText/ShinyText";
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

      <section className={styles.notWork}>
        <div className={styles.firstContent}>
          <div>
            <h1 id="built-like-a-developer">
              <DecryptedText text="Built like a developer," animateOn="view" sequential speed={40} revealDirection="start" delay={1000} />
            </h1>
            <h1 id="felt-like-a-designer">
              <ShinyText text="Felt like a designer." color="#000000" shineColor="#8d6ce3" speed={3} spread={90} />
            </h1>
          </div>
          <p>
            Front-end engineer specializing in design systems, component architecture,
            and the details that make UI feel intentional.
          </p>
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
