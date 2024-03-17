const nodemailer = require("nodemailer");

const emailUtility = async (emailTo, emailText, emailSubject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kamrulhasanrakib99@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOption = {
    from: "Task Manager <kamrulhasanrakib99@gmail.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Email Subject</title>
        <style>
          /* Add your custom styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .span{
            color:red
          }

          .email{
            color:green
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            color: #333;
          }
          .content {
            color: #666;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="email">${emailTo}</h1>
          </div>
          <div class="content">
            <p>Hello there,</p>

            <h1> <span class="span">${emailText}</span> </h1>
            <p>Feel free to add more content, images, or any other elements to make your email stunning!</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>Your Name</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOption);
};

module.exports = emailUtility;
