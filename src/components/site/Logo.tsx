import logoAsset from "@/assets/tudobom-logo.png.asset.json";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Tudobom Comercial"
      className={className}
      loading="eager"
    />
  );
}
