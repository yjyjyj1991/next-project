import { useEffect, useState } from "react";
import { getComments } from "../lib/firebase";

export default function Comments({ id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getAndSetComments() {
      const data = await getComments(id);
      console.log(data);
      setComments(data);
    }
    getAndSetComments();
  }, [id]);
  return (
    <>
      {comments?.map((comment, i) => (
        <p key={i}>{comment.content}</p>
      ))}
    </>
  );
}
