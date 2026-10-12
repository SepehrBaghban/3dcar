import Button from "@mui/material/Button";
import { Container } from "@/features/shared/components/Container";
import { SectionHeading } from "@/features/shared/components/SectionHeading";
import { siteConfig } from "@/features/shared/config/site";

const MAIL_SUBJECT = encodeURIComponent("درخواست جلسه‌ی معرفی نمایش سه‌بعدی خودرو");

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-graphite py-20 sm:py-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="contact-title"
          tone="dark"
          title="خودروهای خودتان را این‌طور نمایش دهید"
          lead="در یک جلسه‌ی کوتاه، نسخه‌ی آزمایشی را با یکی از خودروهای نمایشگاه شما می‌سازیم."
        />
        <div className="flex flex-wrap gap-3">
          <Button
            href={`mailto:${siteConfig.contactEmail}?subject=${MAIL_SUBJECT}`}
            variant="contained"
            size="large"
            className="rounded-full bg-giallo px-7 py-3 font-bold text-graphite hover:bg-giallo/90"
          >
            درخواست جلسه‌ی معرفی
          </Button>
          <Button
            href="#showroom"
            variant="outlined"
            size="large"
            className="rounded-full border-paper/30 px-7 py-3 text-paper hover:border-paper/60 hover:bg-paper/5"
          >
            دوباره دیدن خودرو
          </Button>
        </div>
      </Container>
    </section>
  );
}
