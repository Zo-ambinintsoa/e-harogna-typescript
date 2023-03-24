import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Transport  from "nodemailer-sendinblue-transport";
import sgMail  from '@sendgrid/mail'

// async..await is not allowed in global scope, must use a wrapper
export const sendmymail = async (req: Request, res: Response) => {
    try {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "test-api", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" nambinintsoa577@gmail.com', // sender address
    to: "ambinintsoa.m.herizo@gmail.com", // list of receivers
    subject: "Hello best ooo ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world? how are you</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  req.flash('danger' , 'email envoyer avec success')
  return res.redirect('/');
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
    console.log(error);
        }
}
export const sendmymailSendGrid = async (req: Request, res: Response) => {
      sgMail.setApiKey('');
      const msg = {
        to: 'ambinintsoa.m.herizo@gmail.com', // Change to your recipient
        from: '"Zo Abminintsoa 👻" nambinintsoa577@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
          req.flash('success' , 'vous avez postuler avec succes')
          return res.redirect('/myjobs')
        })
        .catch((error) => {
          console.error(error)
        })
}

