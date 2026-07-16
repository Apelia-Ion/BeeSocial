"use client";

import {
  createComment,
  deletePost,
  toggleLike,
} from "@/actions/post.action";
import { Avatar, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Textarea } from "./textarea";
import {
  HeartIcon,
  Loader2Icon,
  MessageCircleIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type PostCardProps = {
  post: {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      image: string | null;
      username: string;
    };
    comments: {
      id: string;
      content: string;
      createdAt: Date;
      author: {
        id: string;
        username: string;
        image: string | null;
        name: string | null;
      };
    }[];
    likes: { userId: string }[];
    _count: {
      likes: number;
      comments: number;
    };
  };
  dbUserId: string | null;
};

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

function PostCard({ post, dbUserId }: PostCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [hasLiked, setHasLiked] = useState(
    dbUserId ? post.likes.some((like) => like.userId === dbUserId) : false
  );
  const [likesCount, setLikesCount] = useState(post._count.likes);

  const isAuthor = dbUserId === post.author.id;

  const handleLike = async () => {
    if (!dbUserId) return;

    setIsLiking(true);
    try {
      const result = await toggleLike(post.id);
      if (result?.success) {
        setHasLiked((prev) => !prev);
        setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      toast.error("Failed to toggle like");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePost(post.id);
      if (result?.success) {
        toast.success("Post deleted");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComment = async () => {
    if (!commentContent.trim()) return;

    setIsCommenting(true);
    try {
      const result = await createComment(post.id, commentContent);
      if (result?.success) {
        setCommentContent("");
        toast.success("Comment added");
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
      toast.error("Failed to create comment");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/profile/${post.author.username}`}>
                <Avatar>
                  <AvatarImage src={post.author.image ?? "/avatar.png"} />
                </Avatar>
              </Link>
              <div>
                <Link
                  href={`/profile/${post.author.username}`}
                  className="font-medium hover:underline"
                >
                  {post.author.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  @{post.author.username} · {formatTimeAgo(new Date(post.createdAt))}
                </p>
              </div>
            </div>

            {isAuthor ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <Trash2Icon className="size-4 text-destructive" />
                )}
              </Button>
            ) : null}
          </div>

          {post.content ? <p className="text-sm">{post.content}</p> : null}

          {post.image ? (
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="flex items-center gap-4 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!dbUserId || isLiking}
              className={hasLiked ? "text-red-500" : ""}
            >
              <HeartIcon
                className={`size-4 mr-2 ${hasLiked ? "fill-current" : ""}`}
              />
              {likesCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon className="size-4 mr-2" />
              {post._count.comments}
            </Button>
          </div>

          {showComments ? (
            <div className="space-y-4 border-t pt-4">
              {dbUserId ? (
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="min-h-[60px]"
                    disabled={isCommenting}
                  />
                  <Button
                    onClick={handleComment}
                    disabled={!commentContent.trim() || isCommenting}
                  >
                    {isCommenting ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      "Post"
                    )}
                  </Button>
                </div>
              ) : null}

              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={comment.author.image ?? "/avatar.png"} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {comment.author.name}{" "}
                        <span className="text-muted-foreground font-normal">
                          @{comment.author.username}
                        </span>
                      </p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
