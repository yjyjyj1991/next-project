import { addForm } from "../../lib/firebase";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body as {
    title: string;
    content: string;
    uid: string;
    author: string;
  };

  if (!body.title || !body.content) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "title or content not found" });
  }

  if (body) {
    try {
      await addForm(body);
      res.status(200).json({ data: body.title });
    } catch (error) {
      return res.status(400).json({ data: "error occured" });
    }
  }
}
