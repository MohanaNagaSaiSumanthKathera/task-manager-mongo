const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail =(email,name)=>{
    const msg = {
        to: `${email}`,
        from: 'mohanasai.sumanth@gmail.com',
        subject: 'Thanks for Joining in',
        text: `Welcome to the app ${name},Let me know how you get along with the app`,
      };
      sgMail.send(msg);
}

const sendCancellationEmail = (email,name)=>{
    const msg = {
        to: `${email}`,
        from: 'mohanasai.sumanth@gmail.com',
        subject: 'Cancellation confirmation mail',
        text: `GoodBye ${name},Hope to see you again`,
      };
      sgMail.send(msg);
}
module.exports= {
    sendWelcomeEmail,
    sendCancellationEmail
}