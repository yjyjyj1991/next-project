import Link from "next/link";
import styles from "./article.module.css";

export default function Article({ article }) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <Link href={`/forum/${article.id}`}>
          <a>{article.title}</a>
        </Link>
      </div>
      <div className={styles.author}>{article.author}</div>
      <div className={styles.updated}>{article.updatedAt}</div>
    </div>
  );
}
