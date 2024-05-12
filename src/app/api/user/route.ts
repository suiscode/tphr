import { NextRequest, NextResponse } from "next/server";
import { CV } from "../model";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { values, _id } = body;
  console.log(body, "from BODY");

  try {
    const user = await CV.findByIdAndUpdate(
      { _id },
      { ...values },
      { new: true }
    );
    return NextResponse.json({ success: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 200 });
  }
};
