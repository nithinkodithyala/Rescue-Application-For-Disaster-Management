

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const db = require("./config/db");
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// Require application Route modules
const userRoutes = require("./routes/users");
const reliefRoutes = require("./routes/reliefCenterRoute")
const collectionRoutes = require("./routes/ColllectionCenetrRoute")
app.use('/api', userRoute);
app.use("/relief", reliefRoutes)
app.use("/collection", collectionRoutes)
app.use("/user", userRoutes);

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'corescue6@gmail.com',
    pass: 'auiv ffqa cwwp haqu',
  },
});

app.post('/api/send-emails', async (req, res) => {
  try {
    const emailData = req.body.emailData;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    // Assuming emailData is an array of email objects
    const emailPromises = emailData.map(async (email) => {
      const mailOptions = {
        from: 'corescue6@gmail.com',
        to: email.email, // Use the email field from your data
        subject: 'Alrert',
        html: `Emergency at ${latitude} ${longitude}`,
      };

      // Use nodemailer to send emails
      return transporter.sendMail(mailOptions);
    });

    const emailResponses = await Promise.all(emailPromises);
    console.log('Emails sent successfully:', emailResponses);

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, error: 'Failed to send emails' });
  }
});

app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
