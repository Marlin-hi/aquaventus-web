"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Trash2, User } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
      avatar: string | null;
      organization: string | null;
    };
  };
  onDelete?: (id: string) => void;
}

function timeAgo(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 1) return locale === "de" ? "gerade eben" : "just now";
  if (diffMin < 60) return locale === "de" ? `vor ${diffMin} Min.` : `${diffMin}m ago`;
  if (diffH < 24) return locale === "de" ? `vor ${diffH} Std.` : `${diffH}h ago`;
  if (diffD < 30) return locale === "de" ? `vor ${diffD} Tag${diffD > 1 ? "en" : ""}` : `${diffD}d ago`;
  return date.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const t = useTranslations("member");
  const { data: session } = useSession();
  const isOwn = session?.user?.id === post.author.id;
  const isAdmin = session?.user && (session.user as { role?: string }).role === "ADMIN";

  return (
    <div className="rounded-lg border border-border/50 bg-card backdrop-blur-xl backdrop-saturate-150 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {post.author.organization && `${post.author.organization} · `}
              {timeAgo(post.createdAt, "de")}
            </p>
          </div>
        </div>
        {(isOwn || isAdmin) && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
            title={t("deletePost")}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-3 text-sm whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}
