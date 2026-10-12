import { Container } from "@/features/shared/components/Container";
import { siteConfig } from "@/features/shared/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-graphite py-8 text-xs text-cyc-deep/70">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>طراحی و توسعه: {siteConfig.studioName}</p>
        <p>
          نام و مدل خودرو صرفاً برای نمایش قابلیت فنی استفاده شده است.
        </p>
      </Container>
    </footer>
  );
}
