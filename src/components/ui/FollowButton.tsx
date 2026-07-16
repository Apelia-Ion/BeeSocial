"use client";

import { toggleFollow } from "@/actions/user.action";
import { Button } from "./button";
import { useState } from "react";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await toggleFollow(userId);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size="sm" onClick={handleFollow} disabled={isLoading}>
      {isLoading ? "..." : "Follow"}
    </Button>
  );
}

export default FollowButton;
