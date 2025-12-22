import { getMe } from "@/services/user.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refrshToken = cookieStore.get("refreshToken")?.value;
  console.log(`[/api/me] has access Token: ${accessToken}`);
  console.log(`[/api/me] has refrsh Token: ${refrshToken}`);
  try {
    const me = await getMe();
    return NextResponse.json(me, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}
