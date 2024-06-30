
import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Ugem_nextjs');
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};



export default connectDb;
