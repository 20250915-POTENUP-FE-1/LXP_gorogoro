import { getMe } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const me = await getMe();
    return NextResponse.json(me, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    const status = typeof error?.status === "number" ? error.status : 500;

    if (status === 401) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message }, { status });
  }
}
