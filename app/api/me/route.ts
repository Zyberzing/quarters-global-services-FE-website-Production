import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserById } from "@/services/usersService";

export async function GET() {
  const session = await getSession();

  if (!session?.id) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await getUserById(session.id);

  return NextResponse.json({ user });
}
