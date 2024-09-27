
import nodemailer from 'nodemailer';
import envConfig from '../../config/env';



export interface IEmailServices {
    OtpEmail(email: string, otp: string): Promise<void>;
}
console.log('emails')
class EmailService implements IEmailServices {
    private transporter: nodemailer.Transporter;
   

    constructor() {
        const{EMAIL_USER,EMAIL_PASS,EMAIL_HOST,EMAIL_PORT}=envConfig
        // Initialize transporter with explicit host and port settings
        this.transporter = nodemailer.createTransport({
            host: EMAIL_HOST, // Explicit host for Gmail
            port: EMAIL_PORT, // Use 465 for SSL
            secure: false, // false for 587, true for 465
            auth: {
                user: EMAIL_USER,
                pass:EMAIL_PASS,
            },
            // logger: true, // Enable logging
            // debug: true // Show debug output
        });

        // Check if credentials are present
        if (!envConfig.EMAIL_USER|| !envConfig.EMAIL_PASS) {
            throw new Error("Email credentials are not set in environment variables.");
        }
    }

    public async OtpEmail(email: string, otp: string): Promise<void> {
        try {

            const mailOptions = {
                from: `"Awafi Mill" <${process.env.EMAIL_USER}>`, // Professional from line
                to: email,
                subject: 'Your OTP Code - Awafi Mill',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #1a73e8;">Awafi Mill</h2>
                        <p>Dear Customer,</p>
                        <p>Your OTP code is:</p>
                        <h3 style="background-color: #f1f1f1; padding: 10px; display: inline-block;">${otp}</h3>
                        <p>Please use this code to complete your verification. If you did not request this, please contact our support team immediately.</p>
                        <br>
                        <p>Best regards,</p>
                        <p>Awafi Mill Support Team</p>
                        <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
                    </div>
                `
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error: any) {
            console.error(`Error sending email: ${error.message}`); // Log the error
            throw new Error(`Nodemailer Error: ${error.message}`);
        }
    }
}

export default EmailService;
