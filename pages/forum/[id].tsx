import { getAllArticleIds, getArticleData } from "../../lib/firebase";
import Comments from "../../components/Comments";

export default function Detail({ data, id }) {
  return (
    <>
      <h1>{data.title}</h1>
      <h3>{data.content}</h3>
      <Comments id={id} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllArticleIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await getArticleData(params.id);
  return {
    props: {
      data,
      id: params.id,
    },
  };
}
