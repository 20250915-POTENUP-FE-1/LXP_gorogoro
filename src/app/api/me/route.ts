import { getMe } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const me = await getMe();
    return NextResponse.json(me, { status: 200 });
  } catch {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}
