export interface MassageService {
  id: string;
  index: string;
  name: string;
  price: number;
  duration: string;
  focus: string;
  description: string;
}

export interface AddonService {
  id: string;
  index: string;
  name: string;
  price: number;
  duration: string;
  note: string;
}

export interface ScheduleWindow {
  days: string;
  hours: string;
  detail: string;
}

export const STUDIO_INFO = {
  brand: 'AIZ.LUN',
  instagramHandle: 'aiz.lun',
  instagramUrl: 'https://instagram.com/aiz.lun',
  phoneDisplay: '+7 708 802 7708',
  phoneRaw: '77088027708',
  telHref: 'tel:+77088027708',
  address: 'ул. Акберен, 4 · ЖК Riviera Park',
  districtNote: 'Современный оборудованный кабинет в центре города',
  experience: 'Опыт работы более 3 лет',
  credentials: 'Диплом и профильные сертификаты · Опыт работы в клинике',
  sessionLength: 'Длительность основного сеанса 1,5–2 часа',
};

export const MASSAGE_SERVICES: MassageService[] = [
  {
    id: 'classic',
    index: '01',
    name: 'Классический',
    price: 12000,
    duration: '1,5–2 часа',
    focus: 'Снятие мышечного зажима и общее восстановление',
    description:
      'Последовательная проработка всех групп мышц для снятия усталости, улучшения кровообращения и возвращения лёгкости в теле.',
  },
  {
    id: 'chinese-acupressure',
    index: '02',
    name: 'Китайский точечный',
    price: 13000,
    duration: '1,5–2 часа',
    focus: 'Воздействие на биологически активные точки',
    description:
      'Глубокая акупрессурная техника по меридианам тела для снятия спазмов, нормализации тонуса и восстановления баланса.',
  },
  {
    id: 'anti-cellulite',
    index: '03',
    name: 'Антицеллюлитный',
    price: 13000,
    duration: '1,5–2 часа',
    focus: 'Коррекция контуров и повышение упругости кожи',
    description:
      'Интенсивная проработка проблемных зон для активации микроциркуляции, выравнивания рельефа и уменьшения застойных явлений.',
  },
  {
    id: 'lymphatic-drainage',
    index: '04',
    name: 'Лимфодренажный',
    price: 13000,
    duration: '1,5–2 часа',
    focus: 'Уменьшение отёчности и детоксикация тканей',
    description:
      'Мягкие ритмичные движения по линиям лимфотока для снятия отёков, ощущения тяжести и ускорения обменных процессов.',
  },
  {
    id: 'sport-manual',
    index: '05',
    name: 'Спортивный + мануальный',
    price: 15000,
    duration: '1,5–2 часа',
    focus: 'Глубокие фасции, триггерные зоны и подвижность',
    description:
      'Интенсивная восстановительная работа после нагрузок: прицельное снятие триггерных точек, мобилизация и растяжение.',
  },
  {
    id: 'wellness',
    index: '06',
    name: 'Оздоровительный',
    price: 20000,
    duration: '1,5–2 часа',
    focus: 'Комплексная клиническая программа под состояние',
    description:
      'Расширенный индивидуальный протокол с опорой на клинический опыт для глубокого оздоровления опорно-двигательного аппарата.',
  },
];

export const ADDON_SERVICES: AddonService[] = [
  {
    id: 'face-head',
    index: '01',
    name: 'Массаж лица + головы',
    price: 3000,
    duration: 'дополнение к сеансу',
    note: 'Снятие напряжения жевательных и лобных мышц, ясность головы',
  },
  {
    id: 'bamboo-cup',
    index: '02',
    name: 'Бамбуковый банка',
    price: 3000,
    duration: 'дополнение к сеансу',
    note: 'Вакуумно-дренажная проработка глубоких тканей и фасций',
  },
  {
    id: 'stone-therapy',
    index: '03',
    name: 'Стоун терапия',
    price: 3000,
    duration: 'дополнение к сеансу',
    note: 'Глубокое прогревание гладкими камнями для мягкого расслабления мышц',
  },
  {
    id: 'honey-massage',
    index: '04',
    name: 'Медовый массаж',
    price: 5000,
    duration: 'дополнение к сеансу',
    note: 'Улучшение трофики кожи, лимфооттока и согревающий эффект',
  },
  {
    id: 'fire-therapy',
    index: '05',
    name: 'Огненная терапия на 2 зоны',
    price: 5000,
    duration: 'дополнение к сеансу',
    note: 'Контролируемое глубокое тепло для снятия стойких спазмов',
  },
  {
    id: 'foot-massage',
    index: '06',
    name: 'Массаж ног (30 мин)',
    price: 6000,
    duration: '30 минут',
    note: 'Рефлекторная проработка стоп и голеней после рабочего дня',
  },
  {
    id: 'neck-back',
    index: '07',
    name: 'Шейноворотник + спина (50 мин)',
    price: 8000,
    duration: '50 минут',
    note: 'Прицельное снятие напряжения с шеи, плеч и грудного отдела',
  },
];

export const SCHEDULE_WINDOWS: ScheduleWindow[] = [
  {
    days: 'Понедельник – Пятница',
    hours: '19:20 — 00:00',
    detail: 'Вечерние сеансы после рабочего дня',
  },
  {
    days: 'Суббота',
    hours: '16:20 — 00:00',
    detail: 'Дневное и вечернее время до полуночи',
  },
  {
    days: 'Воскресенье',
    hours: 'Любое время до 00:00',
    detail: 'Утренние, дневные и поздние записи с 10:00',
  },
];

export function formatTenge(amount: number): string {
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`;
}

export function getAvailableSlotsForDate(date: Date): {
  slots: string[];
  windowLabel: string;
} {
  const day = date.getDay(); // 0 = Sun, 1..5 = Mon..Fri, 6 = Sat
  if (day === 0) {
    return {
      windowLabel: 'Воскресенье · любое время до 00:00',
      slots: [
        '10:00',
        '11:30',
        '13:00',
        '14:30',
        '16:00',
        '17:30',
        '19:00',
        '20:30',
        '22:00',
      ],
    };
  }
  if (day === 6) {
    return {
      windowLabel: 'Суббота · с 16:20 до 00:00',
      slots: ['16:20', '17:30', '19:00', '20:30', '22:00'],
    };
  }
  return {
    windowLabel: 'Будни (Пн–Пт) · с 19:20 до 00:00',
    slots: ['19:20', '20:30', '21:30', '22:20'],
  };
}
