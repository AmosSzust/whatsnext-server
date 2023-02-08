import { NextFunction, Response } from "express";
import nodeMailer from "nodemailer";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { AppError } from "./AppError";

export const mailing = async (emailTo: string, theContent: string) => {
    const transport = nodeMailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: parseInt(process.env.EMAIL_PORT!),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
    });

    const options = {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: "Confirmation code for WhatsNext",
        text: theContent,
    };
    await transport.sendMail(options);
};

export const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const signUser = (email: string) => {
    return jwt.sign({ email: email }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

export const verifyToken = (token: string, res: Response, next: NextFunction) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err: VerifyErrors | null, email: any) => {
        if (err) return next(new AppError(false, "Something went wrong", 401));
        res.locals.email = email.email;
        next();
    });
}