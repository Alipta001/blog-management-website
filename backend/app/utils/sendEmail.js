const transporter =
  require("../config/emailConfig");


const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {

  await transporter.sendMail({

    from:
      `"GolpoKotha" <${process.env.EMAIL_FROM}>`,

    to,

    subject,

    text,

    html,

  });

};


module.exports =
  sendEmail;