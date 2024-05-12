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
    console.log(e);
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

// import { NextRequest, NextResponse } from "next/server";
// import { LoginSchema } from "@/lib/schema";
// import bcrypt from "bcryptjs";

// export const POST = async (req: NextRequest) => {
//   const body = await req.json();
//   const validatedFields = LoginSchema.safeParse(body);
//   if (!validatedFields.success) {
//     return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
//   }

//   const { email, password } = validatedFields.data;

//   const existingUser = await getUserByEmail(email);
//   if (!existingUser || !existingUser.email || !existingUser.password) {
//     return NextResponse.json(
//       { error: "Email does not exists!" },
//       { status: 400 }
//     );
//   }

//   const passwordMatch = await bcrypt.compare(password, existingUser.password);
//   if (!passwordMatch)
//     return NextResponse.json({ error: "Credentials wrong" }, { status: 400 });

//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(
//       existingUser.email
//     );

//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token
//     );

//     return NextResponse.json(
//       { success: "Email is not verified, verification email sent" },
//       { status: 200 }
//     );
//   }

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT,
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return NextResponse.json(
//             { error: "Invalid credentials" },
//             { status: 400 }
//           );

//         default:
//           return NextResponse.json(
//             { error: "Something went wrong" },
//             { status: 500 }
//           );
//       }
//     }
//     throw error;
//   }
// };
