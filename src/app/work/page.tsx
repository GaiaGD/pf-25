import Link from 'next/link';
import { works } from '../../../works.json';
import WorkSlider from '@/app/components/WorkSlider/WorkSlider';
import styles from './page.module.scss';

export default function Work() {
  return (
    <div className={styles.page}>
      {/* <Link href="/" className={styles.back}>← Back</Link> */}
      <WorkSlider works={works} />
    </div>
  );
}
