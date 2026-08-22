const transporter = require("../config/emailConfig");

const sendEmail = async ( user, temporaryPassword) => {
  await transporter.sendMail({
    from: `"TaskHub Team" <${process.env.EMAIL_FROM}>`,
    to:  user.email,
    subject: "Your TaskHub Account Has Been Created",

    text: `Hello ${ user.name},

Your TaskHub account has been created successfully.

Login Credentials:

Email: ${ user.email}
Temporary Password: ${temporaryPassword}

Department: ${ user.department}
Role: ${ user.role}

For security reasons, you will be required to change your password immediately after your first login.

Login and access your dashboard using the credentials above.

If you were not expecting this account, please contact your administrator.

Regards,
TaskHub Team`,

    html: `
      <div style="margin:0;padding:40px 0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;"
        >

          <!-- Header -->
          <tr>
            <td
              style="background:linear-gradient(90deg,#4f46e5,#7c3aed);padding:28px;text-align:center;"
            >
              <h1
                style="margin:0;color:#ffffff;font-size:28px;font-weight:700;"
              >
                TaskHub
              </h1>

              <p
                style="margin:8px 0 0;color:#e9e9ff;font-size:15px;"
              >
                Account Created Successfully
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px;">

              <h2
                style="margin-top:0;color:#111827;font-size:22px;"
              >
                Hello ${ user.name},
              </h2>

              <p
                style="color:#4b5563;font-size:15px;line-height:26px;"
              >
                Your <strong>TaskHub</strong> account has been created successfully.
                Below are your login credentials.
              </p>

              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="
                  margin:30px 0;
                  border:1px solid #e5e7eb;
                  border-radius:8px;
                  border-collapse:collapse;
                "
              >
                <tr>
                  <td style="font-weight:bold;width:35%;background:#f9fafb;">
                    Email
                  </td>
                  <td>${ user.email}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;background:#f9fafb;">
                    Temporary Password
                  </td>
                  <td>
                    <strong
                      style="
                        color:#4f46e5;
                        font-size:18px;
                        letter-spacing:1px;
                      "
                    >
                      ${temporaryPassword}
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td style="font-weight:bold;background:#f9fafb;">
                    Department
                  </td>
                  <td>${ user.department}</td>
                </tr>

                <tr>
                  <td style="font-weight:bold;background:#f9fafb;">
                    Role
                  </td>
                  <td style="text-transform:capitalize;">
                    ${ user.role}
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top:30px;
                  padding:18px;
                  background:#eef4ff;
                  border-left:4px solid #4f46e5;
                  border-radius:8px;
                "
              >
                <p
                  style="margin:0;color:#374151;font-size:14px;line-height:24px;"
                >
                  <strong>Important:</strong>
                  For security reasons, you must change your temporary password
                  immediately after your first successful login.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                background:#f9fafb;
                padding:25px;
                text-align:center;
                border-top:1px solid #e5e7eb;
              "
            >
              <p
                style="margin:0;color:#6b7280;font-size:13px;"
              >
                © ${new Date().getFullYear()} TaskHub. All Rights Reserved.
              </p>

              <p
                style="margin-top:8px;color:#9ca3af;font-size:12px;"
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

module.exports = sendEmail;