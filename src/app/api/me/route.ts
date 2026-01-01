import { getMe } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const me = await getMe();
    return NextResponse.json(me, { status: 200 });
  } catch (error) {
    console.error("[/api/me] error:", error);

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    const status =
      typeof (error as any)?.status === "number" ? (error as any).status : 500;

    return NextResponse.json({ message }, { status });
  }
}
