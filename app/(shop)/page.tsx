import { siteConfig } from "@/config/site.config/site.config";

export default function HomePage() {
  return (
    <div className="container-app py-16 sm:py-24">
      <h1 className="type-h1">{siteConfig.name}</h1>
      <p className="mt-3 max-w-xl type-body-lg text-muted-foreground">
        متخصصان ساختمان را پیدا کنید یا به جمع متخصصان بپیوندید.
      </p>
    </div>
  );
}
