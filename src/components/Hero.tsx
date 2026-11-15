import { ArrowDownRight, Play } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { StudioImage } from './StudioImage';

const HERO_PROOFS = [
  {
    value: 'Более 3 лет',
    label: 'Опыт работы в клинике, диплом и сертификаты',
  },
  {
    value: '1,5–2 часа',
    label: 'Полный сеанс глубокой проработки без спешки',
  },
  {
    value: 'Без выходных',
    label: 'Пн–Пт с 19:20 · Сб с 16:20 · Вс весь день до 00:00',
  },
  {
    value: 'Акберен, 4',
    label: 'ЖК Riviera Park · современный кабинет в центре',
  },
];

export function Hero() {
  return (
    <section className="pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2 lg:py-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#565B54] mb-5">
                <span>Частная практика</span>
                <span aria-hidden="true">·</span>
                <span>{STUDIO_INFO.address}</span>
                <span aria-hidden="true">·</span>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#181A18] font-medium hover:underline underline-offset-4"
                >
                  @{STUDIO_INFO.instagramHandle}
                </a>
              </div>

              <h1
                className="font-serif font-medium text-[#181A18] tracking-tight leading-[1.06] text-balance max-w-2xl"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              >
                Восстановительный и клинический массаж в центре города
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#565B54] leading-relaxed max-w-xl">
                Глубокая работа с мышцами, триггерными точками и лимфотоком на основе
                клинического опыта более 3 лет. Спокойный, современно оборудованный кабинет
                в ЖК Riviera Park — приём без выходных строго по предварительной записи.
              </p>
            </div>

            <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#booking"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#2B463C] rounded-lg hover:bg-[#1F352D] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B463C]"
              >
                <span>Выбрать дату и время</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col py-1 px-1 text-left group"
              >
                <span className="text-sm sm:text-base font-medium text-[#181A18] group-hover:text-[#2B463C] underline underline-offset-4 decoration-[#E2E2DA] group-hover:decoration-[#2B463C] transition-colors tabular-nums">
                  WhatsApp {STUDIO_INFO.phoneDisplay}
                </span>
                <span className="text-xs text-[#565B54]">
                  Звонки не принимаются
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-[#E2E2DA] bg-[#181A18]">
              <StudioImage
                src="/assets/aistudio/studio_warm_cropped.jpg"
                alt="Интерьер массажного кабинета AIZ.LUN в ЖК Riviera Park с тёплым вечерним светом"
                className="w-full h-full object-cover object-center"
                fallbackLabel="Кабинет в ЖК Riviera Park"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                <div className="text-white">
                  <p className="text-xs text-white/80">Предварительное бронирование</p>
                  <p className="text-base font-medium mt-0.5">{STUDIO_INFO.address}</p>
                </div>
                <a
                  href="#studio"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/95 text-[#181A18] text-xs font-semibold hover:bg-white transition-colors whitespace-nowrap shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Видео кабинета</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E2E2DA] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E2DA]">
          {HERO_PROOFS.map((item) => (
            <div key={item.value} className="py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <div className="font-serif text-2xl font-semibold text-[#181A18] tabular-nums">
                {item.value}
              </div>
              <p className="mt-1 text-sm text-[#565B54] leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
