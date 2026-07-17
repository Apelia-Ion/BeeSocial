import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notification.action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
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

function getNotificationMessage(type: string, creatorName: string | null | undefined) {
  const name = creatorName || "Someone";

  switch (type) {
    case "LIKE":
      return `${name} liked your post`;
    case "COMMENT":
      return `${name} commented on your post`;
    case "FOLLOW":
      return `${name} started following you`;
    default:
      return `${name} sent you a notification`;
  }
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-red-500" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-4 text-blue-500" />;
    case "FOLLOW":
      return <UserPlusIcon className="size-4 text-green-500" />;
    default:
      return null;
  }
}

export default async function NotificationsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const notifications = await getNotifications();
  const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
  if (unreadIds.length > 0) {
    await markNotificationsAsRead(unreadIds);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No notifications yet.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href={
                  notification.type === "FOLLOW"
                    ? `/profile/${notification.creator.username}`
                    : "/"
                }
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                  notification.read ? "opacity-70" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={notification.creator.image ?? "/avatar.png"} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {getNotificationMessage(notification.type, notification.creator.name)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(new Date(notification.createdAt))}
                  </p>
                </div>
                <NotificationIcon type={notification.type} />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
