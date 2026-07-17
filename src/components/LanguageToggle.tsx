"use client";

import { GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageProvider";

export default function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 font-semibold uppercase"
      onClick={() => setLocale(locale === "en" ? "ro" : "en")}
    >
      <GlobeIcon className="size-4" />
      {locale}
      <span className="sr-only">{t("nav.switchLanguage")}</span>
    </Button>
  );
}
