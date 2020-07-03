import { sendScheduledMail } from "./config";

export const sendmail = async (req, res) => {
  let data = {
    address: req.body.email,
    subject: req.body.subject,
    content: req.body.intention,
  };
  try {
    const response = await sendScheduledMail(
      data.address,
      data.subject,
      data.content
    );

    console.log(response);
    res.end();
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(`Success: ${data}`);
    //   res.send(JSON.stringify(data));
    // })
    // .catch((e) => console.log(`Error: ${e}`)); // res.send(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
