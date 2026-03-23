import nodemailer from "nodemailer";

/**
 * Utility to send emails via Nodemailer
 */
export const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `Bhava App <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
