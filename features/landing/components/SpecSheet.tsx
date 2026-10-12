import { Container } from "@/features/shared/components/Container";
import { SectionHeading } from "@/features/shared/components/SectionHeading";
import { formatNumber } from "@/features/shared/lib/format";
import { SPEC_GROUPS, type SpecGroup } from "@/features/landing/data/specs";
import { ElevationDrawing } from "./ElevationDrawing";

function SpecGroupList({ group }: { group: SpecGroup }) {
  return (
    <div>
      <h3 className="border-b-2 border-graphite pb-2 text-sm font-bold text-graphite">{group.title}</h3>
      <dl className="divide-y divide-graphite/10">
        {group.items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-sm text-steel">{item.label}</dt>
            <dd className="text-end">
              <span className="text-xl font-bold text-graphite tabular-nums">{formatNumber(item.value)}</span>
              <span className="ms-1.5 text-xs text-steel">{item.unit}</span>
              {item.note ? <span className="block text-[11px] text-steel/80">{item.note}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SpecSheet() {
  return (
    <section id="specs" aria-labelledby="specs-title" className="scroll-mt-16 bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
          <SectionHeading
            id="specs-title"
            title="مشخصات فنی"
            lead="اعدادی که خریدار معمولاً اول می‌پرسد، کنار همان مدلی که چند ثانیه پیش دورش چرخید."
          />
          <ElevationDrawing />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {SPEC_GROUPS.map((group) => (
            <SpecGroupList key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}
