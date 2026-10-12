import { Container } from "@/features/shared/components/Container";
import { SectionHeading } from "@/features/shared/components/SectionHeading";
import { CAPABILITIES } from "@/features/landing/data/capabilities";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16 bg-cyc py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="capabilities-title"
            title="نمایشگاه شما، روی هر صفحه‌ای"
            lead="همین تجربه را می‌توان برای همه‌ی خودروهای نمایشگاه منطقه آزاد ساخت و در سایت، تبلیغات و تبلت‌های سالن فروش استفاده کرد."
          />
        </div>

        <ul className="divide-y divide-graphite/10 border-y border-graphite/10">
          {CAPABILITIES.map(({ id, title, description, Icon }) => (
            <li key={id} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-7">
              <span className="row-span-2 grid size-11 place-items-center rounded-full bg-paper text-graphite ring-1 ring-graphite/10">
                <Icon fontSize="small" />
              </span>
              <h3 className="self-center text-lg font-bold text-graphite">{title}</h3>
              <p className="max-w-xl text-sm leading-7 text-steel">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
