"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

type FollowButtonProps = {
  userId: string;
  isFollowing?: boolean;
};

function FollowButton({ userId, isFollowing = false }: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      const result = await toggleFollow(userId);
      if (result?.success) {
        setFollowing((prev) => !prev);
        toast.success(following ? "Unfollowed user" : "Followed user");
      } else {
        toast.error("Error updating follow status");
      }
    } catch {
      toast.error("Error updating follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={following ? "outline" : "secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-24"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : following ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}

export default FollowButton;
