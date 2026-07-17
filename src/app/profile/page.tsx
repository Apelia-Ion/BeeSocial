import { getDbUserId, getUserByClerkId } from "@/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await getUserByClerkId(userId);

  if (!user) {
    redirect("/");
  }

  redirect(`/profile/${user.username}`);
}
