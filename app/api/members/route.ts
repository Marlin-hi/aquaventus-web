import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const members = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      organization: true,
      role: true,
      avatar: true,
      createdAt: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(members);
}
