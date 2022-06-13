import Link from "next/link";
import { getArticles } from "../../lib/firebase";
import Article from "../../components/Article";
import styles from "../../components/article.module.css";

export default function forum({ articles }) {
  const articleList = JSON.parse(articles);

  return (
    <section>
      <Link href="/forum/write">
        <a>New post</a>
      </Link>
      <div className={styles.box}>
        <div className={styles.title}>Title</div>
        <div className={styles.author}>author</div>
        <div className={styles.updated}>updated</div>
      </div>
      {articleList?.map((a, i) => (
        <Article article={a} key={i} />
      ))}
    </section>
  );
}

export async function getStaticProps() {
  const articles = await getArticles();
  return {
    props: {
      articles,
    },
    revalidate: 10,
  };
}
