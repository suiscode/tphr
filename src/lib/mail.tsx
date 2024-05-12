import nodemailer from "nodemailer";

const email = process.env.GMAIL;
const pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://https://tphr.vercel.app/auth/new-password?token=${token}`;
  // const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const info = await transporter.sendMail({
    from: "tuuduu00@gmail.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here<a> to reset password </p>`,
  });
};
