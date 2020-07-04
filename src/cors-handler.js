export default async function (req, res) {
  // There's nothing to do here except to end the response since CORS headers
  // are automatically added for all routes using the `now.json` file.
  console.log("options handler being called");
  return res.status(204).send();
}
