import nodemailer from "nodemailer";

// create a transporter object using a Gmail account
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PW
  }
});

export const notifyClientAboutAppointmentRequest = (clientEmail, lang) => {
    // define the email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: clientEmail,
        subject: lang === 'hun' ? "Kérvényezett foglalás adatai" : "Details of your appointment book request",
        text: 'This is a test email sent from Node.js'
    };

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

export const notifyAdminAboutNewAppointmentRequest = (adminEmail, lang) => {
    // define the email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: adminEmail,
        subject: lang === 'hun' ? "Új foglalás érkezett!" : "You got a new appointment request!",
        text: 'This is a test email sent from Node.js'
    };

    // send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}