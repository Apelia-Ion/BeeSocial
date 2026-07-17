import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notification.action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "@/i18n/server";
import { currentUser } from "@clerk/nextjs/server";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Translate = ReturnType<typeof getTranslations>["t"];

function formatTimeAgo(date: Date, t: Translate) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { singular: "notifications.dayAgo", plural: "notifications.daysAgo", seconds: 86400 },
    { singular: "notifications.hourAgo", plural: "notifications.hoursAgo", seconds: 3600 },
    { singular: "notifications.minuteAgo", plural: "notifications.minutesAgo", seconds: 60 },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return t(count > 1 ? interval.plural : interval.singular, { count });
    }
  }

  return t("notifications.justNow");
}

function getNotificationMessage(
  type: string,
  creatorName: string | null | undefined,
  t: Translate
) {
  const name = creatorName || t("notifications.someone");

  switch (type) {
    case "LIKE":
      return t("notifications.liked", { name });
    case "COMMENT":
      return t("notifications.commented", { name });
    case "FOLLOW":
      return t("notifications.followed", { name });
    default:
      return t("notifications.generic", { name });
  }
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-red-500" />;
    case "COMMENT":
      return <MessageCircleIcon className="size-4 text-honey-600 dark:text-honey-400" />;
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

  const { t } = getTranslations();

  const notifications = await getNotifications();
  const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
  if (unreadIds.length > 0) {
    await markNotificationsAsRead(unreadIds);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("notifications.title")}</h1>

      {notifications.length === 0 ? (
        <Card className="border-primary/30">
          <CardContent className="py-8 text-center text-muted-foreground">
            {t("notifications.empty")}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle>{t("notifications.recent")}</CardTitle>
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
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors ${
                  notification.read ? "opacity-70" : ""
                }`}
              >
                <Avatar className="border-2 border-primary">
                  <AvatarImage src={notification.creator.image ?? "/avatar.png"} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {getNotificationMessage(
                      notification.type,
                      notification.creator.name,
                      t
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(new Date(notification.createdAt), t)}
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
