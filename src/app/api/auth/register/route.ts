import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../utilts";
import { CV, User } from "../../model";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    connectToDb();
    const user = await User.findOne({ email: body.email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = await User.create({
        email: body.email,
        password: hashedPassword,
      });
      const newCV = await CV.create({
        email: body.email,
      });

      await User.findByIdAndUpdate(newUser._id, { cv: newCV._id });
      return NextResponse.json("User created", { status: 200 });
    }
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json(e, { status: 500 });
  }
};
