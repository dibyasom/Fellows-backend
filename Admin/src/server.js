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
const portals = ["login", "admin-portal"];
const HOST_URL = `http://localhost:${PORT}/`;
server.listen(PORT);

// Portal hotlink
portals.forEach((portal) => {
  console.log(`${HOST_URL}${portal}`);
});

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
      console.log("SMTP logged in? " + success);
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sarthak@dotquestionmark.in", // sender address
    to: applicantEmail, // list of receivers
    subject: "IncubateIND Fellowship Application received!", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Yo bitch!</h1>`,
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
  // Render admin login
  app.get("/login", (req, res) => {
    res.render("login");
  });
  // Dashboard home page.
  app.get("/admin-portal", (req, res) => {
    res.render("dashboard");
  });

  //   Extract about form *************************************************************
  
};

init();
