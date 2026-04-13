import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transport = nodemailer.createTransport({
    service: env.MAILING_SERVICE,
    port: env.MAILING_PORT,
    auth: {
        user: env.MAILING_ACCOUNT,
        pass: env.MAILING_PASS
    }
});

export async function welcome(mail) {
    await transport.sendMail({
        from: env.MAILING_ACCOUNT,
        to: mail,
        subject: "Bienvenido a nuestra plataforma",
        html: `
        <h1>Bienvenido a nuestra plataforma</h1>
        <p>Gracias por registrarte en nuestra plataforma</p>
        `
    });
}