import mongoose  from "mongoose";
import { Schema,Document } from "mongoose";
import { Model } from "mongoose";

export interface IuserDocument extends Document{
    email: string;
    userName: string;
    password: string;
}



const userSchema:Schema = new Schema<IuserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            default: null
        }
    },
    { timestamps: true })

export  const userModel:Model<IuserDocument> =mongoose.model<IuserDocument>("users1",userSchema)