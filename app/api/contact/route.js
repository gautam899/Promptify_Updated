import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Handle the post request
export const POST = async (request) => {
  const username = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Now we need a transporter which is a nodemailer object which will send the email for us.

  // In nodemailer smtp is main transport in nodemailer for deleivering messages.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: username,
      pass: password,
    },
  });
  // Now lets make a structure of the email by inputting the from to and the
  // structure that we will see in out email.
  try {
    //create mail structure
    const mail = await transporter.sendMail({
      from: username,
      to: myEmail,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
      <p>Hi, my name is: ${name}</p>
      <p>Email: ${email}</p>
      <p>Subject: ${subject}</p>
      <p>Message: ${message}</p>      
      `,
    });
    return NextResponse.json({ message: "Success:Email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Could not send the message. Server error!!",
      },
      { status: 500 }
    );
  }
};
