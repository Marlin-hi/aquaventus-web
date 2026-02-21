import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token, name, email, password, organization } = await req.json();

  if (!token || !name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password too short" }, { status: 400 });
  }

  // Find valid invitation
  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invitation || invitation.usedAt || invitation.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired invitation" }, { status: 400 });
  }

  // Check if email matches invitation
  if (invitation.email !== email.trim().toLowerCase()) {
    return NextResponse.json({ error: "Email does not match invitation" }, { status: 400 });
  }

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);

  // Create user and mark invitation as used in a transaction
  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        passwordHash,
        role: invitation.role,
        organization: organization?.trim() || null,
      },
    }),
    prisma.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
