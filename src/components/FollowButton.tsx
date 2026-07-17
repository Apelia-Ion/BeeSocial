"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";
import { useTranslation } from "@/i18n/LanguageProvider";

type FollowButtonProps = {
  userId: string;
  isFollowing?: boolean;
};

function FollowButton({ userId, isFollowing = false }: FollowButtonProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      const result = await toggleFollow(userId);
      if (result?.success) {
        setFollowing((prev) => !prev);
        toast.success(following ? t("follow.unfollowed") : t("follow.followed"));
      } else {
        toast.error(t("follow.error"));
      }
    } catch {
      toast.error(t("follow.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={following ? "outline" : "default"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-24"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : following ? (
        t("follow.unfollow")
      ) : (
        t("follow.follow")
      )}
    </Button>
  );
}

export default FollowButton;
