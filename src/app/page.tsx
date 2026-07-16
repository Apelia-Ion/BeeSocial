import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-4">
      <h1>home page comp</h1>
    </div>
  );
}
