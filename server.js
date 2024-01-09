const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  try {
    const { firstName, lastName, phoneNr, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: 'etnikz2002@gmail.com',
        pass: 'vysmnurlcmrzcwad',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    
    const mailOptions = {
      from: 'etnikz2002@gmail.com',
      to: "etnikz2002@gmail.com",
      subject: 'Contact Form Submission',
      html: `
        <h3> Message from lansgr website </h3>
        <ul>
          <li><strong>First Name:</strong> ${firstName}</li>
          <li><strong>Last Name:</strong> ${lastName}</li>
          <li><strong>Phone Number:</strong> ${phoneNr}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        
      `,
    };
    
    
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
