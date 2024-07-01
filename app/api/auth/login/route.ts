import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/mongodb/DBConnection';
import UserModel, { IUser } from '@/app/mongodb/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        connectDb();
        const user: IUser | null = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: `Sorry, This Account Doesn't Exist!` });
        }

        if (user && password) {
            const validation = await bcrypt.compare(password, user.password);
            if (validation) {
                const newAccessToken = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '365d' }
                );

                // Set cookie using the cookie library
                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set to true in production
                    maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
                    path: '/', // The root path of the cookie
                };

                // Serialize the cookie and set it in the response headers
                // res.setHeader('Set-Cookie', serialize('jwt', newAccessToken, cookieOptions));

                // Update user with new access token
                await UserModel.findByIdAndUpdate(
                    user._id,
                    { accessToken: newAccessToken },
                    { new: true }
                );

                console.log('From Login route', user.email, user.role);

                // Send response based on user role
                if (user.role === 'admin') {
                    const absoluteUrl = new URL('/', req.url).toString();
                    return NextResponse.redirect(absoluteUrl);
                }
            } else if (user.role === 'Manager') {
                return NextResponse.json({ success: true, url: '/mahatower/mahatowerAccess' });
            } else if (user.role === 'supervisor') {
                return NextResponse.json({ success: true, url: '/assignJobAR/jobAssignToTech' });
            } else {
                console.log('techview');
                return NextResponse.json({ success: true, url: '/assignJobAR/techview' });
            }
        } else {
            return NextResponse.json({ success: false, message: 'Invalid Email or Password..' });
        }
    }
    } catch (error) {
    console.error('Error parsing form data:', error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
}
}
