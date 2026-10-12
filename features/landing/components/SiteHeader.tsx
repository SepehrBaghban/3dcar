import Image from "next/image";
import { Container } from "@/features/shared/components/Container";
import { siteConfig } from "@/features/shared/config/site";

export function SiteHeader() {
  const { developer } = siteConfig;

  return (
    <header className="sticky top-0 z-50 border-b border-graphite/10 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-center">
        <a
          href={developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 font-extrabold text-graphite transition-opacity hover:opacity-80"
        >
          {developer.label}
          <Image src={developer.logo} alt={developer.logoAlt} width={32} height={32} priority className="size-8" />
        </a>
      </Container>
    </header>
  );
}
