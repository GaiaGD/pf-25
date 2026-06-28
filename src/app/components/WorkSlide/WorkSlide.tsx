import Image from 'next/image'
import styles from './WorkSlide.module.scss'

interface WorkSlideProps {
  title: string
  role?: string
  year?: string
  summary?: string
  highlights?: string[]
  tech?: string[]
  image?: string
  logo?: string
  url?: string
  urlLabel?: string
}

export default function WorkSlide({ title, role, year, summary, highlights, tech, image, logo, url, urlLabel }: WorkSlideProps) {
  return (
    <div className={`${styles.slide} ${!image ? styles.noImage : ''}`}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 62vw"
            className={styles.image}
          />
          <div className={styles.overlay} />
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.overlayLink}>
              <span className={styles.overlayCta}>Visit site ↗</span>
            </a>
          )}
        </div>
      )}
      <div className={styles.content}>
        {logo && (
          <div className={styles.logoWrapper}>
            <Image src={logo} alt={title} fill className={styles.logo} />
          </div>
        )}
        <div className={styles.copy}>
          {role && year && <span className={styles.meta}>{role} — {year}</span>}
          <h2 className={styles.title}>{title}</h2>
          {summary && <p className={styles.description}>{summary}</p>}
          {highlights && highlights.length > 0 && (
            <ul className={styles.highlights}>
              {highlights.map((h) => (
                <li key={h} className={styles.highlight}>{h}</li>
              ))}
            </ul>
          )}
          {tech && tech.length > 0 && (
            <ul className={styles.tech}>
              {tech.slice(0, 5).map((t) => (
                <li key={t} className={styles.techTag}>{t}</li>
              ))}
            </ul>
          )}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {urlLabel ?? 'View project →'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
