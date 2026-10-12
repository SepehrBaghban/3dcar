import { cn } from "@/features/shared/lib/cn";

type SectionHeadingProps = {
  id: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ id, title, lead, tone = "light", className }: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <header className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className={cn(
          "text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl",
          isDark ? "text-paper" : "text-graphite",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-4 text-base leading-8 text-pretty sm:text-lg", isDark ? "text-cyc-deep" : "text-steel")}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
