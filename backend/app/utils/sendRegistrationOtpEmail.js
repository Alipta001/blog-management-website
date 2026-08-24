// const transporter =
//   require("../config/emailConfig");


// const sendRegistrationOtpEmail =
//   async ({
//     email,
//     name,
//     otp,
//   }) => {

//     await transporter.sendMail({

//       from:
//         `"Blog Management" <${process.env.EMAIL_FROM}>`,

//       to:
//         email,

//       subject:
//         "Verify Your Email Address",


//       text: `Hello ${name},

// Thank you for registering with Blog Management.

// Your email verification OTP is:

// ${otp}

// This OTP will expire in 10 minutes.

// Do not share this OTP with anyone.

// If you did not request this registration, please ignore this email.

// Regards,
// Blog Management Team`,


//       html: `
//         <div
//           style="
//             margin:0;
//             padding:40px 0;
//             background:#f4f7fb;
//             font-family:
//               Arial,
//               Helvetica,
//               sans-serif;
//           "
//         >

//           <table
//             width="100%"
//             cellpadding="0"
//             cellspacing="0"
//             style="
//               max-width:600px;
//               margin:auto;
//               background:#ffffff;
//               border-radius:14px;
//               overflow:hidden;
//               border:1px solid #e5e7eb;
//             "
//           >


//             <!-- HEADER -->

//             <tr>

//               <td
//                 style="
//                   background:
//                     linear-gradient(
//                       90deg,
//                       #4f46e5,
//                       #7c3aed
//                     );
//                   padding:28px;
//                   text-align:center;
//                 "
//               >

//                 <h1
//                   style="
//                     margin:0;
//                     color:#ffffff;
//                     font-size:28px;
//                     font-weight:700;
//                   "
//                 >
//                   Blog Management
//                 </h1>


//                 <p
//                   style="
//                     margin:8px 0 0;
//                     color:#e9e9ff;
//                     font-size:15px;
//                   "
//                 >
//                   Email Verification
//                 </p>

//               </td>

//             </tr>


//             <!-- BODY -->

//             <tr>

//               <td
//                 style="
//                   padding:35px;
//                 "
//               >

//                 <h2
//                   style="
//                     margin-top:0;
//                     color:#111827;
//                     font-size:22px;
//                   "
//                 >
//                   Hello ${name},
//                 </h2>


//                 <p
//                   style="
//                     color:#4b5563;
//                     font-size:15px;
//                     line-height:26px;
//                   "
//                 >
//                   Thank you for registering with
//                   <strong>
//                     Blog Management
//                   </strong>.
//                 </p>


//                 <p
//                   style="
//                     color:#4b5563;
//                     font-size:15px;
//                     line-height:26px;
//                   "
//                 >
//                   Please use the verification code below
//                   to complete your registration.
//                 </p>


//                 <!-- OTP -->

//                 <div
//                   style="
//                     margin:30px 0;
//                     padding:22px;
//                     text-align:center;
//                     background:#f5f3ff;
//                     border:1px solid #ddd6fe;
//                     border-radius:12px;
//                   "
//                 >

//                   <p
//                     style="
//                       margin:0 0 10px;
//                       color:#6b7280;
//                       font-size:13px;
//                     "
//                   >
//                     Your Verification Code
//                   </p>


//                   <div
//                     style="
//                       color:#4f46e5;
//                       font-size:32px;
//                       font-weight:bold;
//                       letter-spacing:8px;
//                     "
//                   >
//                     ${otp}
//                   </div>

//                 </div>


//                 <!-- EXPIRATION -->

//                 <div
//                   style="
//                     margin-top:25px;
//                     padding:18px;
//                     background:#fff7ed;
//                     border-left:
//                       4px solid #f97316;
//                     border-radius:8px;
//                   "
//                 >

//                   <p
//                     style="
//                       margin:0;
//                       color:#374151;
//                       font-size:14px;
//                       line-height:24px;
//                     "
//                   >

//                     <strong>
//                       Important:
//                     </strong>

//                     This OTP will expire in
//                     <strong>
//                       10 minutes
//                     </strong>.

//                     Do not share this code with anyone.

//                   </p>

//                 </div>


//                 <p
//                   style="
//                     margin-top:30px;
//                     color:#6b7280;
//                     font-size:14px;
//                     line-height:24px;
//                   "
//                 >
//                   If you did not request this registration,
//                   you can safely ignore this email.

//                 </p>

//               </td>

//             </tr>


//             <!-- FOOTER -->

//             <tr>

//               <td
//                 style="
//                   background:#f9fafb;
//                   padding:25px;
//                   text-align:center;
//                   border-top:
//                     1px solid #e5e7eb;
//                 "
//               >

//                 <p
//                   style="
//                     margin:0;
//                     color:#6b7280;
//                     font-size:13px;
//                   "
//                 >
//                   © ${new Date().getFullYear()}
//                   Blog Management.
//                   All Rights Reserved.
//                 </p>


//                 <p
//                   style="
//                     margin-top:8px;
//                     color:#9ca3af;
//                     font-size:12px;
//                   "
//                 >
//                   This is an automated email.
//                   Please do not reply.
//                 </p>

//               </td>

//             </tr>


//           </table>

//         </div>
//       `,

//     });

//   };


// module.exports =
//   sendRegistrationOtpEmail;



const { BrevoClient } = require("@getbrevo/brevo");

// Initialize Brevo Client with your API Key
const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendRegistrationOtpEmail = async ({ email, name, otp }) => {
  // Send transactional email via Brevo
  return await brevo.transactionalEmails.sendTransacEmail({
    subject: "Verify Your Email Address",
    sender: {
      name: "Blog Management",
      email: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    },
    to: [{ email: email, name: name }],

    // Plain Text Version
    textContent: `Hello ${name},

Thank you for registering with Blog Management.

Your email verification OTP is:

${otp}

This OTP will expire in 10 minutes.

Do not share this OTP with anyone.

If you did not request this registration, please ignore this email.

Regards,
Blog Management Team`,

    // HTML Template Version
    htmlContent: `
      <div
        style="
          margin:0;
          padding:40px 0;
          background:#f4f7fb;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width:600px;
            margin:auto;
            background:#ffffff;
            border-radius:14px;
            overflow:hidden;
            border:1px solid #e5e7eb;
          "
        >
          <!-- HEADER -->
          <tr>
            <td
              style="
                background: linear-gradient(90deg, #4f46e5, #7c3aed);
                padding:28px;
                text-align:center;
              "
            >
              <h1
                style="
                  margin:0;
                  color:#ffffff;
                  font-size:28px;
                  font-weight:700;
                "
              >
                Blog Management
              </h1>
              <p
                style="
                  margin:8px 0 0;
                  color:#e9e9ff;
                  font-size:15px;
                "
              >
                Email Verification
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:35px;">
              <h2
                style="
                  margin-top:0;
                  color:#111827;
                  font-size:22px;
                "
              >
                Hello ${name},
              </h2>

              <p
                style="
                  color:#4b5563;
                  font-size:15px;
                  line-height:26px;
                "
              >
                Thank you for registering with
                <strong>Blog Management</strong>.
              </p>

              <p
                style="
                  color:#4b5563;
                  font-size:15px;
                  line-height:26px;
                "
              >
                Please use the verification code below to complete your registration.
              </p>

              <!-- OTP -->
              <div
                style="
                  margin:30px 0;
                  padding:22px;
                  text-align:center;
                  background:#f5f3ff;
                  border:1px solid #ddd6fe;
                  border-radius:12px;
                "
              >
                <p
                  style="
                    margin:0 0 10px;
                    color:#6b7280;
                    font-size:13px;
                  "
                >
                  Your Verification Code
                </p>

                <div
                  style="
                    color:#4f46e5;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                  "
                >
                  ${otp}
                </div>
              </div>

              <!-- EXPIRATION -->
              <div
                style="
                  margin-top:25px;
                  padding:18px;
                  background:#fff7ed;
                  border-left: 4px solid #f97316;
                  border-radius:8px;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#374151;
                    font-size:14px;
                    line-height:24px;
                  "
                >
                  <strong>Important:</strong>
                  This OTP will expire in
                  <strong>10 minutes</strong>.
                  Do not share this code with anyone.
                </p>
              </div>

              <p
                style="
                  margin-top:30px;
                  color:#6b7280;
                  font-size:14px;
                  line-height:24px;
                "
              >
                If you did not request this registration, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td
              style="
                background:#f9fafb;
                padding:25px;
                text-align:center;
                border-top: 1px solid #e5e7eb;
              "
            >
              <p
                style="
                  margin:0;
                  color:#6b7280;
                  font-size:13px;
                "
              >
                © ${new Date().getFullYear()} Blog Management. All Rights Reserved.
              </p>

              <p
                style="
                  margin-top:8px;
                  color:#9ca3af;
                  font-size:12px;
                "
              >
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
};

module.exports = sendRegistrationOtpEmail;