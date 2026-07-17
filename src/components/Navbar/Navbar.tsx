import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser();
  return (
    <nav className="sticky top-0 w-full border-b-2 border-primary/40 bg-background/90 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-wide"
            >
              <span aria-hidden="true">🐝</span>
              <span>
                <span className="text-foreground">Bee</span>
                <span className="text-honey-600 dark:text-honey-400">
                  Social
                </span>
              </span>
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
