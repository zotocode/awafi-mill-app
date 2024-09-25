import { Document } from "mongoose";
import { Model } from "mongoose";
export interface IuserDocument extends Document {
    email: string;
    userName: string;
    password: string;
}
export declare const userModel: Model<IuserDocument>;
