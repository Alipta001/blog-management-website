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
      `"Blog Management" <${process.env.EMAIL_FROM}>`,

    to,

    subject,

    text,

    html,

  });

};


module.exports =
  sendEmail;