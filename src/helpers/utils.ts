import { NextFunction, Response } from "express";
import nodeMailer from "nodemailer";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { AppError } from "./AppError";

export const mailing = async (emailTo: string, confirmationCode: string, next: NextFunction) => {
    const transport = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const options = {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: "Confirmation code for WhatsNext",
        text: `Thank you for registering, here's your code: ${confirmationCode}`,
    };

    const resp = await transport.sendMail(options);
    if (resp.rejected.length > 0) return next(new AppError(false, `Failed to send an email to ${emailTo}`, 500));
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