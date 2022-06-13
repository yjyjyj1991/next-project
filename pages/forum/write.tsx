import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

function write() {
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      title: event.target.title.value,
      content: event.target.content.value,
      uid: user.uid,
      author: user.displayName,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/form";

    // Form the request for sending data to the server.
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
    if (response.status === 200) router.push("/forum");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />

        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default write;
