const nodemailer=require("nodemailer");
const {google} = require('googleapis');
// const OAuth2Client =google.auth.OAuth2;



 const sendemail = async (from,to,subject,message,reply)=>{
    try{
        //creating OAuth2 Client
        
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
        console.log(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
        // setting the refresh_token
        oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
        
        //refresh token is used to get the acces token acces token expires quickly
        // const accessToken = await oAuth2Client.getAccessToken();
        
        
        // creating transport
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:process.env.USER,
                clientId:process.env.CLIENT_ID,
                clientSecret:process.env.CLIENT_SECRET,
                refreshToken:process.env.REFRESH_TOKEN,
                accessToken:process.env.ACCESS_TOKEN
            }
        });

        // options of the email
        const mailOptions = {
            from:"jainesh0001@gmail.com",
            to:"shanigupta120103@gmail.com",
            subject:subject,
            html:message,
            replyTo:reply
        };

        // sending the email
        console.log("Hello")
        // console.log(transport);
        const result = await transport.sendMail(mailOptions);
        console.log(result);
        return {
            success:true,
            message:result
        }
    }
    catch(err){
        // console.log(err);
        return {
            success:false,
            message:err
        }
    }
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "anonymousbeast65@gmail.com",
//       pass: "@Sunny120103",
//     },
//   });

//   try {
//     // Iterate over each email object in the request body
//     // for (const emailObj of req.body) {
//     //   const { to, subject, body } = emailObj;

//       const mailOptions = {
//         from: "",
//         to: "jainesh001@gmail.com",
//         subject: "Heelo",
//         text: "message",
//       };

//       // Send the email for each recipient
//       await transporter.sendMail(mailOptions);
//     // }

//     // res.send("E-mail send successfully");
//   } catch (error) {
//     console.error("Error sending emails:", error);
//     // res.status(500).send("Internal Server Error");
//   }
}
module.exports=sendemail;
