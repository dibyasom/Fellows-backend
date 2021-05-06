const express = require("express");
const app = express();
const server = require("http").Server(app);
const url = require("url");
const querystring = require("querystring");
const path = require("path");
const nodemailer = require("nodemailer");

app.use(express.json()); // Enables to accept JSON requests.
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public"))); // Exposed to public.
app.set("view engine", "ejs");

const PORT = process.env.PORT || 8080;
const HOST_URL = `http://localhost:${PORT}`;
server.listen(PORT);
console.log(`running on ${HOST_URL}/about`);
console.log(`running on ${HOST_URL}/question`);

const mail = async (applicantEmail, applicantName) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    pool: "true",
    name: "dotquestionmark.in",
    host: "mail.dotquestionmark.in",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "sarthak@dotquestionmark.in",
      pass: "12345",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages ~ " + success);
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sarthak@dotquestionmark.in", // sender address
    to: applicantEmail, // list of receivers
    subject: "IncubateIND Fellowship Application received!", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Demystifying Email Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <style type="text/css">
          a[x-apple-data-detectors] {
            color: inherit !important;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0">
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
        >
          <tr>
            <td style="padding: 20px 0 30px 0">
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="600"
                style="border-collapse: collapse; border: 1px solid #cccccc"
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#70bbd9"
                  >
                  <img src="https://i.ibb.co/F7wKMKL/mail.png"
                      alt="Creating Email Magic."
                      width="100%"
                      height="auto"
                      style="display: block"
                    />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="border-collapse: collapse"
                    >
                      <tr>
                        <td style="color: #153643; font-family: Arial, sans-serif">
                          <h1 style="font-size: 24px; margin: 0">
                            Hello ${applicantName}! We have received your fellowship application!
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            color: #153643;
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            padding: 20px 0 30px 0;
                          "
                        >
                          <p style="margin: 0;">
                          We will send you an email two weeks after applications to the program have closed with an update on your application status and next steps. In the meantime, follow IncubateIND on social-media for news about the program.

                          Looking forward to reading from you!
                        </p>
                        <p style="margin: 0;">
                        <hr> 
                        Regards
                        Team IncubateIND </p>

                        </td>
                      </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ee4c50" style="padding: 30px 30px">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="border-collapse: collapse"
                    >
                      <tr>
                        <td
                          style="
                            color: #ffffff;
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                          "
                        >
                          <p style="margin: 0">
                            &reg; IncubateIND, Felloship! <br />
                            <a href="/fellowship" style="color: #ffffff">Fellowship</a> Know the perks, and previous fellow's testimonials ;)
                          </p>
                        </td>
                        <td align="right">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="border-collapse: collapse"
                          >
                            <tr>
                              <td>
                                <a href="http://www.twitter.com/">
                                  <img
                                    src="https://assets.codepen.io/210284/tw.gif"
                                    alt="Twitter."
                                    width="38"
                                    height="38"
                                    style="display: block"
                                    border="0"
                                  />
                                </a>
                              </td>
                              <td style="font-size: 0; line-height: 0" width="20">
                                &nbsp;
                              </td>
                              <td>
                                <a href="http://www.twitter.com/">
                                  <img
                                    src="https://assets.codepen.io/210284/fb.gif"
                                    alt="Facebook."
                                    width="38"
                                    height="38"
                                    style="display: block"
                                    border="0"
                                  />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
`,
  });

  console.log("Message sent: %s", info.messageId);
};
// Database integration
const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "incubate-fellows",
  keyFilename: "./creds.json",
});
const docRef = db.collection("applicants");

const pushFireStore = async (label, applicantResponse) => {
  await docRef.doc(label).set(applicantResponse);
};

const pushMergeFireStore = async (label, applicantResponse) => {
  console.log(label, applicantResponse);
  await docRef.doc(label).set(applicantResponse, { merge: true });
};
// EOS

const init = () => {
  app.get("/fellowship", (req, res) => {
    res.render("landing");
  });

  app.get("/register", (req, res) => {
    res.render("form");
  });

  //   Extract about form *************************************************************
  app.post("/register", async (req, res) => {
    const applicantLabel = `${req.body.tel}`;

    if (req.body !== undefined) {
      try {
        const details = {
          personal: {
            fullName: req.body.fname,
            phoneNumber: req.body.tel,
            emailAddress: req.body.email,
            city: req.body.city,
          },
          handles: {
            linkedinProfile: req.body.linkedin,
            githubProfile: req.body.github,
            personalPortfolio: req.body.portfolio,
          },
          college: {
            collegeName: req.body.college,
            course: req.body.Course,
            branch: req.body.Branch,
            graduationYear: req.body.graduation,
          },

          responses: req.body.Answer,
        };

        await pushFireStore(applicantLabel, details);
      } catch (err) {
        console.error(err);
      }

      try {
        await mail(req.body.email, req.body.fname);
      } catch (err) {
        console.log(err);
      }

      // Redirect to thankyou
      res.status(200).redirect("/responded");
    }
    // res.status(200).redirect(
    //   `/questionres?${querystring.stringify({
    //     label: applicantLabel,
    //     email: req.body.email,
    //   })}`
    // );
  });

  app.get("/responded", (req, res) => {
    res.render("thankyou");
  });
};

init();
