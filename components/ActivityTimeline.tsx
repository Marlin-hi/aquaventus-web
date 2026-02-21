"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string | null;
    organization: string | null;
  };
}

export default function ActivityTimeline() {
  const t = useTranslations("member");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = useCallback(async (cursor?: string) => {
    const url = cursor ? `/api/posts?cursor=${cursor}` : "/api/posts";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return { posts: [], nextCursor: null };
  }, []);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data.posts);
      setNextCursor(data.nextCursor);
      setLoading(false);
    });
  }, [fetchPosts]);

  const handleNewPost = (post: Record<string, unknown>) => {
    setPosts((prev) => [post as unknown as Post, ...prev]);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const loadMore = async () => {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    const data = await fetchPosts(nextCursor);
    setPosts((prev) => [...prev, ...data.posts]);
    setNextCursor(data.nextCursor);
    setLoadingMore(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border/50 bg-card backdrop-blur-xl backdrop-saturate-150 p-4">
        <PostForm onPost={handleNewPost} />
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          {t("noPostsYet")}
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))}
          {nextCursor && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" size="sm" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t("loadMore")}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
