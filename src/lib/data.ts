import hero from "@/assets/hero.jpg";
import shaft from "@/assets/cat-shaft.jpg";
import steering from "@/assets/cat-steering.jpg";
import automation from "@/assets/cat-automation.jpg";
import deck from "@/assets/cat-deck.jpg";

export type Status = "current" | "historical" | "component" | "subsystem";

export const statusLabel: Record<Status, string> = {
  current: "Текущее направление",
  historical: "Historical product line",
  component: "Marine components",
  subsystem: "Subsystem / Automation",
};

export type Manufacturer = {
  slug: string;
  name: string;
  status: Status;
  description: string;
  categories: string[]; // category slugs
  directions?: string[];
};

export type Category = {
  slug: string;
  no: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  subcategories: string[];
  manufacturers: string[]; // manufacturer slugs (current/component/subsystem)
  historical?: string[];
};

export const categories: Category[] = [
  {
    slug: "propulsion",
    no: "01",
    title: "Пропульсивные системы",
    short: "Винторулевые колонки, подруливающие устройства, гребные винты, редукторы.",
    intro:
      "Запасные части и техническое сопровождение для пропульсивных установок судов различных производителей — от винторулевых колонок до гибридных и электрических систем.",
    image: hero,
    subcategories: [
      "Винторулевые колонки",
      "Подруливающие устройства",
      "Выдвижные подруливающие устройства",
      "Водомётные движители",
      "Гребные винты",
      "Регулируемые гребные винты",
      "Морские редукторы и передачи",
      "Гибридные и электрические пропульсивные системы",
    ],
    manufacturers: ["kongsberg", "schottel", "steerprop", "berg", "brunvoll", "kawasaki", "nakashima", "zf", "frydenbo", "ngc"],
    historical: ["aquamaster", "kamewa", "wartsila-lips", "hrp"],
  },
  {
    slug: "shafting",
    no: "02",
    title: "Валопроводные и дейдвудные системы",
    short: "Дейдвудные устройства, валопроводы, подшипники и уплотнения.",
    intro:
      "Компоненты валопроводов, дейдвудные подшипники и уплотнения гребного вала. Подбор по производителю, чертежу или OEM-номеру.",
    image: shaft,
    subcategories: [
      "Дейдвудные системы",
      "Валопроводы",
      "Подшипники",
      "Уплотнения дейдвудной трубы",
      "Уплотнения валопровода",
      "Уплотнения гребного вала",
      "Компоненты валопроводов",
    ],
    manufacturers: ["kemel", "lagersmit", "wartsila", "james-walker", "carco", "freudenberg", "zf", "ngc"],
    historical: ["simplex"],
  },
  {
    slug: "steering",
    no: "03",
    title: "Рулевое управление и маневрирование",
    short: "Рулевые машины, приводы, гидравлика, рули и системы маневрирования.",
    intro:
      "Запасные части для рулевых машин, гидравлических систем рулевого управления, рулей и систем управления маневрированием.",
    image: steering,
    subcategories: [
      "Рулевые системы",
      "Рулевые машины",
      "Рулевые приводы",
      "Гидравлические системы рулевого управления",
      "Рули",
      "Системы управления маневрированием",
    ],
    manufacturers: ["jastram", "macgregor", "van-der-velden", "ngc", "schottel", "kongsberg"],
  },
  {
    slug: "automation",
    no: "04",
    title: "Судовые системы управления и автоматизации",
    short: "PMS, EMS, IAS, управление пропульсией и подруливающими устройствами.",
    intro:
      "Автоматизация — отдельный инженерный уровень. Мы рассматриваем запросы по компонентам систем управления энергетикой, пропульсией и интегрированной автоматизации судна.",
    image: automation,
    subcategories: [
      "PMS",
      "EMS",
      "IAS",
      "Управление пропульсивной установкой",
      "Управление подруливающими устройствами",
      "Системы автоматизации",
    ],
    manufacturers: ["kongsberg", "schottel", "berg", "brunvoll", "ulstein", "zf", "frydenbo"],
  },
  {
    slug: "deck",
    no: "05",
    title: "Палубное и грузовое оборудование",
    short: "Палубные механизмы, краны, люковые закрытия, RoRo, offshore load handling.",
    intro:
      "Запасные части для палубных механизмов, грузовых кранов, люковых закрытий, RoRo-оборудования и offshore-систем грузообработки.",
    image: deck,
    subcategories: [
      "Палубные механизмы",
      "Грузовые краны",
      "Люковые закрытия",
      "RoRo-оборудование",
      "Offshore load handling equipment",
    ],
    manufacturers: ["macgregor"],
  },
];

export const manufacturers: Manufacturer[] = [
  { slug: "kongsberg", name: "Kongsberg", status: "current", description: "Пропульсивные системы, маневрирование и судовая автоматизация.", categories: ["propulsion", "steering", "automation"] },
  {
    slug: "schottel", name: "Schottel", status: "current",
    description: "Судовые пропульсивные системы и оборудование для маневрирования.",
    categories: ["propulsion", "steering", "automation"],
    directions: ["Винторулевые колонки", "Регулируемые гребные винты", "Подруливающие устройства", "Pump Jets", "Marine Automation"],
  },
  { slug: "steerprop", name: "Steerprop", status: "current", description: "Винторулевые колонки и пропульсивные системы.", categories: ["propulsion"] },
  { slug: "berg", name: "Berg", status: "current", description: "Пропульсивные системы и системы управления.", categories: ["propulsion", "automation"] },
  { slug: "brunvoll", name: "Brunvoll", status: "current", description: "Подруливающие устройства, пропульсия и системы управления.", categories: ["propulsion", "automation"] },
  { slug: "kawasaki", name: "Kawasaki", status: "current", description: "Судовые пропульсивные системы.", categories: ["propulsion"] },
  { slug: "nakashima", name: "Nakashima", status: "current", description: "Гребные винты и пропульсивное оборудование.", categories: ["propulsion"] },
  { slug: "zf", name: "ZF", status: "current", description: "Морские редукторы, передачи и связанные системы управления.", categories: ["propulsion", "shafting", "automation"] },
  { slug: "frydenbo", name: "FRYDENBØ", status: "current", description: "Пропульсивные и интегрированные гибридные / электрические системы.", categories: ["propulsion", "automation"] },
  { slug: "ngc", name: "NGC", status: "current", description: "Морские редукторы, валопроводы и рулевое оборудование.", categories: ["propulsion", "shafting", "steering"] },
  { slug: "kemel", name: "Kemel", status: "component", description: "Уплотнения и компоненты дейдвудных систем.", categories: ["shafting"] },
  { slug: "lagersmit", name: "Lagersmit", status: "component", description: "Уплотнения гребного вала и дейдвудной трубы.", categories: ["shafting"] },
  { slug: "wartsila", name: "Wärtsilä", status: "component", description: "Уплотнения и компоненты валопроводов.", categories: ["shafting"] },
  { slug: "james-walker", name: "James Walker", status: "component", description: "Уплотнительные решения для судовых систем.", categories: ["shafting"] },
  { slug: "carco", name: "CARCO", status: "component", description: "Уплотнения валопроводов.", categories: ["shafting"] },
  { slug: "freudenberg", name: "Freudenberg", status: "component", description: "Уплотнения и компоненты для судовой техники.", categories: ["shafting"] },
  { slug: "jastram", name: "Jastram", status: "current", description: "Рулевые машины и системы рулевого управления.", categories: ["steering"] },
  { slug: "macgregor", name: "MAC GREGOR", status: "current", description: "Палубное, грузовое и рулевое оборудование.", categories: ["steering", "deck"] },
  { slug: "van-der-velden", name: "Van der Velden", status: "current", description: "Рули и рулевые системы.", categories: ["steering"] },
  { slug: "ulstein", name: "ULSTEIN", status: "subsystem", description: "Судовые системы управления и автоматизации.", categories: ["automation"] },
  { slug: "aquamaster", name: "Aquamaster", status: "historical", description: "Историческая линейка пропульсивного оборудования.", categories: ["propulsion"] },
  { slug: "kamewa", name: "KAMEWA", status: "historical", description: "Историческая линейка пропульсивного оборудования.", categories: ["propulsion"] },
  { slug: "wartsila-lips", name: "Wärtsilä (Lips)", status: "historical", description: "Историческая линейка гребных винтов и пропульсии.", categories: ["propulsion"] },
  { slug: "hrp", name: "HRP", status: "historical", description: "Историческая линейка подруливающих устройств.", categories: ["propulsion"] },
  { slug: "simplex", name: "Simplex", status: "historical", description: "Историческая линейка уплотнений дейдвудной трубы.", categories: ["shafting"] },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getManufacturer = (slug: string) => manufacturers.find((m) => m.slug === slug);
export const categoryTitle = (slug: string) => getCategory(slug)?.title ?? slug;
