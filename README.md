# Lamborghini Gallardo 3D Showroom

نمایش سه‌بعدی و تعاملی خودرو برای پروپوزال نمایشگاه‌های منطقه آزاد.
Next.js 16 (App Router)، React 19، React Three Fiber، Tailwind CSS 4، MUI 9.

## اجرا

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## مدل سه‌بعدی خودرو

مدل فعلی: `public/models/lamborghini-gallardo.glb` (منبع: Sketchfab، ۱۶٫۳ مگابایت ← ۳٫۸ مگابایت، با gzip حدود ۳٫۲ مگابایت).
برای مدل دیگر، فایل را در `public/models/` بگذارید و آدرسش را در `features/showroom/config/model.ts` یا `NEXT_PUBLIC_CAR_MODEL_URL` تعریف کنید.
تا وقتی فایل وجود ندارد، یک خودروی ساده‌ی پروسیجرال نمایش داده می‌شود تا صفحه هیچ‌وقت خالی نماند.

بهینه‌سازی مدل قبل از انتشار:

```bash
npx @gltf-transform/cli optimize input.glb public/models/output.glb \
  --compress meshopt --meshopt-level medium --simplify false \
  --texture-compress webp --texture-size 1024
```

- `--simplify false`: ساده‌سازی هندسه سطوح منحنی بدنه را موج‌دار می‌کند و روی رنگ متالیک کاملاً دیده می‌شود.
- `--meshopt-level medium`: سطح `high` نرمال‌ها را بیش از حد کوانتایز می‌کند و انعکاس‌ها کج می‌شوند.
- Meshopt به‌جای Draco: دیکودر Meshopt داخل three.js است و به CDN خارجی (gstatic) نیازی ندارد؛ کیفیت هم در مقایسه بهتر بود.

بعد از اضافه کردن مدل، این‌ها را در `features/showroom/config/` تنظیم کنید:

| فایل | چه چیزی |
| --- | --- |
| `model.ts` | `targetLength` طول واقعی خودرو؛ `rotationY` اگر دماغه‌ی مدل به سمت +Z نیست؛ `paintMaterialPattern` برای نام متریال بدنه |
| `viewpoints.ts` | موقعیت چشم راننده و سرنشین (`cockpit`, `passenger`) بر اساس کابین مدل |
| `hotspots.ts` | جای نقاط توضیحی روی بدنه |

مدل به‌طور خودکار به طول واقعی خودرو (`targetLength`) مقیاس می‌شود و روی زمین قرار می‌گیرد، پس مختصات بالا به متر و نسبت به مرکز خودرو هستند.
مجوز مدل (مثلاً در Sketchfab) باید استفاده‌ی تجاری را مجاز کند.

## ساختار

```
app/                  فقط روت‌ها: layout و page
features/
  shared/             تم MUI، پرووایدرها (RTL + CSS layers)، استایل سراسری، کامپوننت‌های پایه
  showroom/           نمایشگر سه‌بعدی
    components/scene  Canvas، دوربین، خودرو، نورپردازی، هات‌اسپات‌ها
    components/ui     کنترل‌های روی صحنه (MUI)
    config/           نقاط دید، رنگ‌ها، محدودیت دوربین، پروفایل کیفیت
    store/            وضعیت سراسری (zustand)
  landing/            هدر و بخش نمایشگر صفحه
```

## بهینه‌سازی‌های عملکرد

- رندر فقط هنگام تغییر (`frameloop="demand"`): صحنه‌ی ساکن تقریباً صفر درصد GPU مصرف می‌کند.
- پروفایل کیفیت بر اساس هسته‌ی CPU، حافظه، نوع دستگاه و Save-Data: DPR، آنتی‌الیاسینگ، رزولوشن نور و نوع متریال.
- کاهش موقت رزولوشن هنگام حرکت دوربین (`AdaptiveDpr`) و برگشت به کیفیت کامل در حالت سکون.
- نورپردازی استودیو و سایه‌ی زیر خودرو فقط یک بار رندر می‌شوند، بدون دانلود HDR.
- three.js با `next/dynamic` جدا بارگذاری می‌شود و در باندل اولیه نیست.
- متریال‌های transmission (شیشه‌ی چراغ‌ها) هنگام بارگذاری به شفافیت معمولی تبدیل می‌شوند تا three.js صحنه را در هر فریم دو بار رندر نکند.
- پنهان‌سازی هات‌اسپات‌ها با یک ضرب داخلی O(1) به‌جای raycast.
- اسکرول ماوس تا وقتی کاربر روی صحنه کلیک نکرده زوم نمی‌کند، تا اسکرول صفحه گیر نکند.
