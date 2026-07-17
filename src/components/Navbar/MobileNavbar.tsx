"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { cn } from "@/lib/utils";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <ModeToggle />

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" />
          }
        >
          <MenuIcon className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center gap-3 justify-start"
              )}
              onClick={() => setShowMobileMenu(false)}
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>

            {isSignedIn ? (
              <>
                <Link
                  href="/notifications"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex items-center gap-3 justify-start"
                  )}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <BellIcon className="w-4 h-4" />
                  Notifications
                </Link>
                <Link
                  href="/profile"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex items-center gap-3 justify-start"
                  )}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <UserIcon className="w-4 h-4" />
                  Profile
                </Link>
                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
