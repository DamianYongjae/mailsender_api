import { sendScheduledMail } from "./config";

export const sendmail = async (req, res) => {
  console.log("sendmail called!");
  let data = {
    address: req.body.email,
    subject: req.body.subject,
    content: req.body.intention,
  };
  try {
    await sendScheduledMail(data.address, data.subject, data.content);

    res.end();
  } catch (error) {
    console.log(error);
  }
};
