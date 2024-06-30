import connectDb from "../../mongodb/DBConnection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from '../../mongodb/models/User'


export async function GET(request: NextRequest) {
    await connectDb();
    const user = await UserModel.find()
    console.log(user);
    return NextResponse.json(user)
}
