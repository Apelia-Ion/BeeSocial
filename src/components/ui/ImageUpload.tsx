"use client";

type ImageUploadProps = {
  endpoint: string;
  value: string;
  onChange: (url: string) => void;
};

function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <input
        type="url"
        placeholder="Paste image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Upload preview" className="max-h-48 rounded-lg object-cover" />
      ) : null}
    </div>
  );
}

export default ImageUpload;
