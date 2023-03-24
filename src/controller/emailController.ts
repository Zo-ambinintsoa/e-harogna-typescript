import { Request, Response } from "express";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const sendmymail = async (req: Request, res: Response) => {
    try {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nambinintsoa577@gmail.com", // generated ethereal user
      pass: "zFEI0wdCOjGJ3V1U", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" nambinintsoa577@gmail.com', // sender address
    to: "ambinintsoa.m.herizo@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
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

