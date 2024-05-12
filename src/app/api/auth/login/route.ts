import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { connectToDb, generateToken } from "../../utilts";
import { User } from "../../model";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  connectToDb();

  try {
    const user = await User.findOne({ email: body.email });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return NextResponse.json({ error: "Credentials wrong" }, { status: 400 });
    }
    cookies().set("cookie", generateToken(user));
    return NextResponse.json("Signed in", { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    cookies().delete("cookie");
    return NextResponse.json("Signed out", { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
};
