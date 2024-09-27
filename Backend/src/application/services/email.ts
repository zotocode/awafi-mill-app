import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, otp: number): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

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

        await transporter.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(`Nodemailer Error: ${error.message}`);
    }
}
