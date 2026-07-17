"use client";

import {
  updateProfile,
  type getProfileByUsername,
  type getUserLikedPosts,
  type getUserPosts,
} from "@/actions/profile.action";
import FollowButton from "@/components/FollowButton";
import PostCard from "@/components/PostCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/i18n/LanguageProvider";
import { LinkIcon, MapPinIcon, PencilIcon } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type ProfileUser = NonNullable<Awaited<ReturnType<typeof getProfileByUsername>>>;
type UserPosts = Awaited<ReturnType<typeof getUserPosts>>;
type LikedPosts = Awaited<ReturnType<typeof getUserLikedPosts>>;

type ProfilePageClientProps = {
  user: ProfileUser;
  posts: UserPosts;
  likedPosts: LikedPosts;
  isFollowing: boolean;
  dbUserId: string | null;
};

function ProfilePageClient({
  user,
  posts,
  likedPosts,
  isFollowing,
  dbUserId,
}: ProfilePageClientProps) {
  const { t } = useTranslation();
  const isOwnProfile = dbUserId === user.id;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpdateProfile = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result?.success) {
        toast.success(t("profile.updated"));
        setIsEditOpen(false);
      } else {
        toast.error(t("profile.updateError"));
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={user.image ?? "/avatar.png"} />
            </Avatar>

            <div className="mt-4 space-y-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            {user.bio ? (
              <p className="mt-3 text-sm text-muted-foreground max-w-md">{user.bio}</p>
            ) : null}

            <div className="mt-4 flex gap-2">
              {isOwnProfile ? (
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger render={<Button variant="outline" size="sm" />}>
                    <PencilIcon className="size-4 mr-2" />
                    {t("profile.editProfile")}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("profile.editTitle")}</DialogTitle>
                    </DialogHeader>
                    <form action={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          {t("profile.name")}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={user.name ?? ""}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium">
                          {t("profile.bio")}
                        </label>
                        <Textarea
                          id="bio"
                          name="bio"
                          defaultValue={user.bio ?? ""}
                          className="min-h-comment-box"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="location" className="text-sm font-medium">
                          {t("profile.location")}
                        </label>
                        <Input
                          id="location"
                          name="location"
                          defaultValue={user.location ?? ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="website" className="text-sm font-medium">
                          {t("profile.website")}
                        </label>
                        <Input
                          id="website"
                          name="website"
                          defaultValue={user.website ?? ""}
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" type="button" />}>
                          {t("profile.cancel")}
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                          {isPending ? t("profile.saving") : t("profile.save")}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : dbUserId ? (
                <FollowButton userId={user.id} isFollowing={isFollowing} />
              ) : null}
            </div>

            <div className="w-full max-w-sm mt-6">
              <Separator className="my-4" />
              <div className="flex justify-around">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("profile.following")}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("profile.followers")}
                  </p>
                </div>
                <div>
                  <p className="font-medium">{user._count.posts}</p>
                  <p className="text-xs text-muted-foreground">
                    {t("profile.posts")}
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full max-w-sm space-y-2 text-sm text-left">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.location || t("sidebar.noLocation")}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    className="hover:underline truncate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  t("sidebar.noWebsite")
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">{t("profile.posts")}</TabsTrigger>
          <TabsTrigger value="likes">{t("profile.likes")}</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-6 mt-6">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {t("profile.noPosts")}
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))
          )}
        </TabsContent>
        <TabsContent value="likes" className="space-y-6 mt-6">
          {likedPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {t("profile.noLikedPosts")}
            </p>
          ) : (
            likedPosts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePageClient;
