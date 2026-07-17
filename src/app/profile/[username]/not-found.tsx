import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTranslations } from "@/i18n/server";

export default function ProfileNotFound() {
  const { t } = getTranslations();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold">{t("profile.notFoundTitle")}</h2>
      <p className="text-muted-foreground">{t("profile.notFoundDescription")}</p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
        {t("profile.goHome")}
      </Link>
    </div>
  );
}
