// import { Resend } from 'resend';
// import dotenv from 'dotenv'
// dotenv.config()

// // if(!process.env.config){
// //     console.log("Provide config in side the .env file")
// // }

// const resend = config(process.env.config);

// const sendEmail = async({sendTo, subject, html })=>{
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'Binkeyit <noreply@amitprajapati.co.in>',
//             to: sendTo,
//             subject: subject,
//             html: html,
//         });

//         if (error) {
//             return console.error({ error });
//         }

//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default sendEmail

