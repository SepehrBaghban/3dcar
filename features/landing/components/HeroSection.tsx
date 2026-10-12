import { ShowroomViewer } from "@/features/showroom";

function HeroHeadline() {
  return (
    <div className="max-w-md">
      <p className="text-sm font-medium text-steel">
        <span dir="ltr">LP 700-4</span> کوپه
      </p>
      <h1 className="mt-1 text-4xl leading-[1.1] font-black tracking-tight text-graphite sm:text-5xl lg:text-6xl">
        لامبورگینی اونتادور
      </h1>
      <p className="mt-3 hidden max-w-sm text-sm leading-7 text-steel sm:block">
        دور خودرو بچرخید، روی نقطه‌ها بزنید یا آن‌قدر نزدیک شوید تا پشت فرمان بنشینید.
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="showroom" aria-label="نمای سه‌بعدی خودرو" className="scroll-mt-16">
      <ShowroomViewer
        headline={<HeroHeadline />}
        backdropText="AVENTADOR"
        className="h-[82svh] min-h-[560px] lg:h-[calc(100svh-4rem)] lg:min-h-[640px]"
      />
    </section>
  );
}
