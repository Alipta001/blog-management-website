// const  transporter  = require("../config/emailConfig");

// const sendResetPasswordLink = async ( user, link) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to:  user.email,
//     subject: "Reset Your Password",
//     text: `Reset your password using the following link: ${link}`,
//     html: `
//       <div
//         style="
//           margin:0;
//           padding:40px 20px;
//           background-color:#f8fafc;
//           font-family:Arial, Helvetica, sans-serif;
//         "
//       >
//         <table
//           align="center"
//           width="600"
//           cellpadding="0"
//           cellspacing="0"
//           style="
//             background:#ffffff;
//             border-radius:16px;
//             overflow:hidden;
//             box-shadow:0 8px 30px rgba(0,0,0,0.08);
//           "
//         >
//           <tr>
//             <td
//               style="
//                 background:linear-gradient(
//                   135deg,
//                   #4f46e5,
//                   #7c3aed
//                 );
//                 padding:32px;
//                 text-align:center;
//                 color:white;
//               "
//             >
//               <h1 style="margin:0;font-size:28px;">
//                 Password Reset Request
//               </h1>

//               <p
//                 style="
//                   margin-top:12px;
//                   opacity:0.9;
//                   font-size:15px;
//                 "
//               >
//                 Secure access to your account
//               </p>
//             </td>
//           </tr>

//           <tr>
//             <td style="padding:40px;">
//               <p
//                 style="
//                   color:#1e293b;
//                   font-size:16px;
//                   margin-bottom:20px;
//                 "
//               >
//                 Hello <strong>${ user.name}</strong>,
//               </p>

//               <p
//                 style="
//                   color:#475569;
//                   line-height:1.8;
//                   font-size:15px;
//                 "
//               >
//                 We received a request to reset the password associated with your account.
//               </p>

//               <p
//                 style="
//                   color:#475569;
//                   line-height:1.8;
//                   font-size:15px;
//                 "
//               >
//                 Click the button below to create a new password.
//               </p>

//               <div
//                 style="
//                   text-align:center;
//                   margin:35px 0;
//                 "
//               >
//                 <a
//                   href="${link}"
//                   style="
//                     display:inline-block;
//                     padding:14px 28px;
//                     border-radius:10px;
//                     background:#4f46e5;
//                     color:#ffffff;
//                     text-decoration:none;
//                     font-weight:bold;
//                   "
//                 >
//                   Reset Password
//                 </a>
//               </div>

//               <p
//                 style="
//                   color:#64748b;
//                   font-size:14px;
//                   line-height:1.8;
//                 "
//               >
//                 This link will expire in
//                 <strong>15 minutes</strong>.
//               </p>

//               <p
//                 style="
//                   color:#64748b;
//                   font-size:14px;
//                   line-height:1.8;
//                 "
//               >
//                 If you didn't request a password reset, you can safely ignore this email.
//               </p>

//               <hr
//                 style="
//                   border:none;
//                   border-top:1px solid #e2e8f0;
//                   margin:30px 0;
//                 "
//               />

//               <p
//                 style="
//                   color:#94a3b8;
//                   font-size:12px;
//                   text-align:center;
//                 "
//               >
//                 If the button doesn't work, copy and paste the following link into your browser:
//               </p>

//               <p
//                 style="
//                   font-size:12px;
//                   color:#4f46e5;
//                   word-break:break-all;
//                   text-align:center;
//                 "
//               >
//                 ${link}
//               </p>
//             </td>
//           </tr>

//           <tr>
//             <td
//               style="
//                 background:#f8fafc;
//                 text-align:center;
//                 padding:20px;
//                 color:#94a3b8;
//                 font-size:12px;
//               "
//             >
//               © 2026 Your Company. All rights reserved.
//             </td>
//           </tr>
//         </table>
//       </div>
//     `,
//   });
// };

// module.exports = sendResetPasswordLink;




const transporter = require("../config/emailConfig");

const sendResetPasswordLink = async ( user, link) => {
  try {
    const info = await transporter.sendMail({
      from: `"Role Access" <${process.env.EMAIL_FROM}>`,
      to:  user.email,
      subject: "Reset Your Password",

      text: `
Hello ${ user.name},

We received a request to reset your password.

Reset your password using this link:
${link}

This link will expire in 10 minutes.

If you did not request a password reset, you can safely ignore this email.
      `,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <div style="padding:40px 15px;">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        max-width:600px;
        margin:auto;
        background:#ffffff;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 10px 40px rgba(15,23,42,0.10);
      "
    >

      <!-- Header -->
      <tr>
        <td
          style="
            background:linear-gradient(135deg,#4f46e5,#7c3aed);
            padding:35px;
            text-align:center;
            color:#ffffff;
          "
        >
          <h1
            style="
              margin:0;
              font-size:28px;
            "
          >
            Password Reset
          </h1>

          <p
            style="
              margin:10px 0 0;
              font-size:14px;
              opacity:0.9;
            "
          >
            Secure access to your account
          </p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:40px;">

          <p
            style="
              margin:0 0 20px;
              color:#1e293b;
              font-size:16px;
            "
          >
            Hello <strong>${ user.name}</strong>,
          </p>

          <p
            style="
              color:#475569;
              font-size:15px;
              line-height:1.8;
            "
          >
            We received a request to reset the password
            associated with your account.
          </p>

          <p
            style="
              color:#475569;
              font-size:15px;
              line-height:1.8;
            "
          >
            Click the button below to create a new password.
          </p>

          <!-- Button -->
          <div
            style="
              text-align:center;
              margin:35px 0;
            "
          >
            <a
              href="${link}"
              style="
                display:inline-block;
                padding:14px 30px;
                background:#4f46e5;
                color:#ffffff;
                text-decoration:none;
                border-radius:10px;
                font-size:15px;
                font-weight:bold;
              "
            >
              Reset Password
            </a>
          </div>

          <div
            style="
              background:#eef2ff;
              border:1px solid #c7d2fe;
              border-radius:12px;
              padding:15px;
              margin:25px 0;
            "
          >
            <p
              style="
                margin:0;
                color:#3730a3;
                font-size:14px;
                line-height:1.6;
              "
            >
              <strong>Security notice:</strong>
              This password reset link will expire in
              <strong>10 minutes</strong>.
            </p>
          </div>

          <p
            style="
              color:#64748b;
              font-size:14px;
              line-height:1.8;
            "
          >
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <hr
            style="
              border:none;
              border-top:1px solid #e2e8f0;
              margin:30px 0;
            "
          />

          <p
            style="
              margin:0 0 10px;
              color:#94a3b8;
              font-size:12px;
              text-align:center;
            "
          >
            If the button does not work, copy and paste
            this link into your browser:
          </p>

          <p
            style="
              margin:0;
              color:#4f46e5;
              font-size:12px;
              line-height:1.6;
              text-align:center;
              word-break:break-all;
            "
          >
            ${link}
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td
          style="
            background:#f8fafc;
            padding:20px;
            text-align:center;
          "
        >
          <p
            style="
              margin:0;
              color:#94a3b8;
              font-size:12px;
            "
          >
            © 2026 Role Access. All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </div>
</body>
</html>
      `,
    });

    console.log("Password reset email sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return info;
  } catch (error) {
    console.error(
      "Error sending password reset email:",
      error
    );

    throw error;
  }
};

module.exports = sendResetPasswordLink;

