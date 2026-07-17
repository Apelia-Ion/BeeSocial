import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProfileNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold">User not found</h2>
      <p className="text-muted-foreground">
        The profile you are looking for does not exist.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
        Go Home
      </Link>
    </div>
  );
}
