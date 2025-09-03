import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or any SMTP provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: body
  });

  return `Email sent: ${info.messageId}`;
}
