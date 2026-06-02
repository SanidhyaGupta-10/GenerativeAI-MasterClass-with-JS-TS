import { Resend } from "resend";
import 'dotenv/config';

const FROM_EMAIL = process.env.FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!FROM_EMAIL || !RESEND_API_KEY) {
    throw new Error("Please provide FROM_EMAIL and RESEND_API_KEY in the environment variables");
}

const EmailTemplate = (to: string, subject: string, body: string) => `
    <html>
        <body>
            <h1>${subject}</h1>
            <p>${body}</p>
        </body>
    </html>
`

const resend = new Resend(RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, body: string) {
    const res = await resend.emails.send({
        from: FROM_EMAIL as string,
        to: to,
        subject: subject,
        html: EmailTemplate(to, subject, body),
    })
}