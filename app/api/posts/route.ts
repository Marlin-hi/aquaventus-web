import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  const take = 20;

  const posts = await prisma.post.findMany({
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { id: true, name: true, avatar: true, organization: true },
      },
    },
  });

  const hasMore = posts.length > take;
  const items = hasMore ? posts.slice(0, take) : posts;

  return NextResponse.json({
    posts: items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content: content.trim(),
      authorId: session.user.id,
    },
    include: {
      author: {
        select: { id: true, name: true, avatar: true, organization: true },
      },
    },
  });

  return NextResponse.json(post, { status: 201 });
}
