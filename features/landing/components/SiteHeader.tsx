import Button from "@mui/material/Button";
import { Container } from "@/features/shared/components/Container";
import { siteConfig } from "@/features/shared/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-graphite/10 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-graphite">
          <span aria-hidden className="size-2.5 rounded-full bg-giallo" />
          {siteConfig.name}
        </a>

        <nav aria-label="بخش‌های صفحه" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-steel">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-graphite">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href="#contact"
          variant="contained"
          className="rounded-full bg-graphite px-5 py-2 text-sm text-paper hover:bg-graphite/90"
        >
          درخواست دمو
        </Button>
      </Container>
    </header>
  );
}
