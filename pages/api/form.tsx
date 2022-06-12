import { saveForm } from "../../lib/firebase";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }

  // Found the name.
  // Sends a HTTP success code
  await saveForm(req.body);
  res.status(200).json({ data: `${body.first} ${body.last}` });
}
