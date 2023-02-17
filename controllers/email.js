import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

export const notifyAdminAboutNewAppointmentRequest = (adminEmail, bookAppointmentData, lang) => {
    // define the email options
    const mailOptions = {
        from: process.env.EMAIL,
        to: adminEmail,
        subject: lang === 'hun' ? "Új foglalás érkezett!" : "New appointment request!",
        html: `<p>Új foglalás érkezett a következő adatokkal:</p>\n<p>Név: ${bookAppointmentData.clientName}</p>\n<p>Email: ${bookAppointmentData.clientEmail}</p>\n<p>Szolgáltatás: ${bookAppointmentData.serviceName}</p>\n<p>Időpont: ${bookAppointmentData.time}</p>`
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