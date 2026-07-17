"use client";

import { XIcon } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useTranslation } from "@/i18n/LanguageProvider";

type ImageUploadProps = {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url: string) => void;
};

function ImageUpload({ endpoint, value, onChange }: ImageUploadProps) {
  const { t } = useTranslation();

  if (value) {
    return (
      <div className="relative size-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt={t("imageUpload.preview")}
          className="size-40 rounded-md object-cover"
        />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-0 right-0 rounded-full bg-destructive p-1 shadow-sm"
          aria-label={t("imageUpload.remove")}
        >
          <XIcon className="size-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.ufsUrl ?? "");
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
}

export default ImageUpload;
