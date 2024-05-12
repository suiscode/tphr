import { getUserFromCookie } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PasswordResetToken, User } from "../../model";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await getUserFromCookie({ withCV: false });
  if (!user || !(await bcrypt.compare(body.currentPassword, user.password))) {
    return NextResponse.json(
      { error: "Current password is wrong" },
      { status: 400 }
    );
  }

  if (!user || (await bcrypt.compare(body.password, user.password))) {
    return NextResponse.json(
      { error: "New password cant be same as current password" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const update = { password: hashedPassword };
    await User.findByIdAndUpdate(user._id, update, {
      new: true,
    });

    return NextResponse.json({ success: "Password changed" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get("email");

  const isValidEmail = await User.findOne({ email });
  if (!isValidEmail) {
    return NextResponse.json(
      { error: "Email does not exist" },
      { status: 400 }
    );
  }
  const passwordResetToken = await generatePasswordResetToken(email as string);
  console.log("token generated dasdasdasdasd");

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return NextResponse.json({ success: "Success" }, { status: 200 });
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();

  const { values, token } = body;
  if (!token) {
    return NextResponse.json({ error: "Missing Token" }, { status: 400 });
  }

  const { password } = body.values;
  const existingToken = await PasswordResetToken.findOne({ token });
  if (!existingToken) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return NextResponse.json({ error: "Token has expired" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email: existingToken.email });
  console.log(existingUser);

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(
    existingUser._id,
    { password: hashedPassword },
    {
      new: true,
    }
  );
  await PasswordResetToken.findOneAndDelete({ id: existingToken.id });
  return NextResponse.json({ success: "Password updated" }, { status: 200 });
};
