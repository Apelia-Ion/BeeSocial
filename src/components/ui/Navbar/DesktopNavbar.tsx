import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost" }), "flex items-center gap-2")}
      >
        <HomeIcon className="w-4 h-4" />
        <span className="hidden lg:inline">Home</span>
      </Link>

      {user ? (
        <>
          <Link
            href="/notifications"
            className={cn(buttonVariants({ variant: "ghost" }), "flex items-center gap-2")}
          >
            <BellIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Notifications</span>
          </Link>
          <Link
            href={`/profile/${
              user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
            }`}
            className={cn(buttonVariants({ variant: "ghost" }), "flex items-center gap-2")}
          >
            <UserIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <button className={cn(buttonVariants({ variant: "default" }))}>
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
