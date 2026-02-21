"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostFormProps {
  onPost: (post: Record<string, unknown>) => void;
}

export default function PostForm({ onPost }: PostFormProps) {
  const t = useTranslations("member");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading) return;
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim() }),
    });

    if (res.ok) {
      const post = await res.json();
      onPost(post);
      setContent("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium">{t("whatsOnYourMind")}</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t("postPlaceholder")}
        rows={3}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={!content.trim() || loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {t("post")}
        </Button>
      </div>
    </form>
  );
}
