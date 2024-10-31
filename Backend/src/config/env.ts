import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

interface EnvConfig {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    PAYMENT_GATEWAY: string
    STRIPE_SECRET_KEY: string;
    Atlas_Url:string
    // STRIPE_PUBLIC_KEY: string
}

// Create the config object by pulling values from environment variables
const envConfig: EnvConfig = {
    EMAIL_HOST: process.env.EMAIL_HOST as string,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT as string, 10), // Convert to number
    EMAIL_USER: process.env.EMAIL_USER as string,
    EMAIL_PASS: process.env.EMAIL_PASS as string,
    PAYMENT_GATEWAY: process.env.PAYMENT_GATEWAY as string,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
    Atlas_Url:process.env.Atlas_Url as string
    // STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY as string
};

// Log loaded environment variables for debugging
console.log("Environment Variables Loaded:", envConfig);

// Ensure that all necessary environment variables are set
if ( !envConfig.EMAIL_USER || !envConfig.EMAIL_PASS ) {
    throw new Error("Missing required environment variables");
}

export default envConfig;
