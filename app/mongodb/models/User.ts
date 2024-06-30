import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IUser interface extending Document
interface IUser extends Document {
    name: string;
    email: string;
    signature?: string;
    password: string;
    role: 'basic' | 'supervisor' | 'admin' | 'Manager';
    accessToken?: string;
    createdAt: Date;
    loggedIn: string;
}

// Create the UserSchema
const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        // validate: [isEmail, "Please enter a valid email"],
    },
    signature: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: "basic",
        enum: ["basic", "supervisor", "admin", "Manager"],
    },
    accessToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    loggedIn: {
        type: String,
        default: "loggedIn",
    },
});

// Check if the model already exists before defining it
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
