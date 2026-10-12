import type { SvgIconComponent } from "@mui/icons-material";
import ThreeSixtyOutlined from "@mui/icons-material/ThreeSixtyOutlined";
import AirlineSeatReclineNormalOutlined from "@mui/icons-material/AirlineSeatReclineNormalOutlined";
import PaletteOutlined from "@mui/icons-material/PaletteOutlined";
import AdsClickOutlined from "@mui/icons-material/AdsClickOutlined";
import SpeedOutlined from "@mui/icons-material/SpeedOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";

export type Capability = {
  id: string;
  title: string;
  description: string;
  Icon: SvgIconComponent;
};

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "orbit",
    title: "دور زدن کامل خودرو",
    description: "خریدار هر زاویه‌ای از بدنه را با نور یکنواخت استودیو می‌بیند؛ بدون عکاسی دوباره برای هر خودرو.",
    Icon: ThreeSixtyOutlined,
  },
  {
    id: "cabin",
    title: "نشستن پشت فرمان",
    description: "با یک کلیک یا نزدیک‌شدن، دوربین روی صندلی راننده می‌نشیند و داشبورد و کنسول را نشان می‌دهد.",
    Icon: AirlineSeatReclineNormalOutlined,
  },
  {
    id: "paint",
    title: "تغییر رنگ بدنه",
    description: "رنگ‌های موجود در انبار نمایشگاه را روی همان مدل نمایش دهید تا خریدار سریع‌تر تصمیم بگیرد.",
    Icon: PaletteOutlined,
  },
  {
    id: "hotspots",
    title: "توضیح روی قطعه",
    description: "نقاط قابل‌کلیک روی چراغ‌ها، رینگ و موتور، دوربین را به همان بخش می‌برند و توضیح کوتاهی نشان می‌دهند.",
    Icon: AdsClickOutlined,
  },
  {
    id: "performance",
    title: "روان روی گوشی‌های معمولی",
    description: "صحنه فقط هنگام حرکت رندر می‌شود و کیفیت بر اساس توان دستگاه تنظیم می‌شود؛ باتری و پردازنده آزاد می‌مانند.",
    Icon: SpeedOutlined,
  },
  {
    id: "inventory",
    title: "اضافه‌شدن هر خودروی جدید",
    description: "هر خودروی انبار با یک فایل مدل و چند خط تنظیمات به همین صفحه اضافه می‌شود.",
    Icon: Inventory2Outlined,
  },
];
