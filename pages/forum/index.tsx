import Layout from "../../components/layout";
import Link from "next/link";

function forum() {
  return (
    <Layout>
      <Link href="/forum/write">
        <a>post</a>
      </Link>
    </Layout>
  );
}

export default forum;
