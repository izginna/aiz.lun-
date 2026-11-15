import { useRef, useState } from 'react';
import { Award, Building2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { StudioImage } from './StudioImage';

const CREDENTIALS = [
  {
    icon: Award,
    title: 'Более 3 лет практики',
    text: 'Подтверждённый диплом и сертификаты по классическим, точечным, лимфодренажным и мануальным техникам.',
  },
  {
    icon: Building2,
    title: 'Опыт работы в клинике',
    text: 'Понимание анатомии, триггерных зон и безопасная работа с мышечными зажимами без резкой боли.',
  },
];

export function StudioTourSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section id="studio" className="py-16 lg:py-24 bg-[#EFEFE9]/65 border-b border-[#E2E2DA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E2DA] bg-[#181A18] aspect-[9/16] max-h-[620px] mx-auto lg:mx-0">
              <video
                ref={videoRef}
                poster="/assets/aistudio/studio_table.jpg"
                playsInline
                muted={isMuted}
                loop
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              >
                <source src="/assets/aistudio/studio_tour.mp4" type="video/mp4" />
                <source src="/assets/aistudio/IMG_3091_2_a6261b39.MOV" type="video/quicktime" />
              </video>

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#181A18] text-sm font-medium hover:bg-[#EFEFE9] transition-colors whitespace-nowrap"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" aria-hidden="true" />
                      <span>Пауза</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                      <span>Смотреть обзор</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black/60 text-white border border-white/20 hover:bg-black/80 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#565B54]">
              Видео-обзор кабинета · актуальные видео также в{' '}
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#181A18] font-medium underline underline-offset-4"
              >
                @{STUDIO_INFO.instagramHandle}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-sm text-[#565B54] mb-2">
                Оснащение и квалификация
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#181A18] tracking-tight text-balance">
                Современный кабинет в центре — комфорт, чистота и клинический подход
              </h2>
              <p className="mt-4 text-base text-[#565B54] leading-relaxed">
                Кабинет находится по адресу {STUDIO_INFO.address}. Пространство полностью
                подготовлено для длительных сеансов 1,5–2 часа: профессиональная кушетка,
                инструменты для мадеротерапии и акупрессуры, бамбуковые банки, камни для
                стоун-терапии, свежие полотенца, одноразовые тапочки и мягкое вечернее освещение.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CREDENTIALS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl bg-white border border-[#E2E2DA]"
                  >
                    <Icon className="w-5 h-5 text-[#2B463C] mb-3" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-[#181A18]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#565B54] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl overflow-hidden border border-[#E2E2DA] aspect-[3/4] bg-white">
                <StudioImage
                  src="/assets/aistudio/studio_table.jpg"
                  alt="Массажная кушетка и зона ожидания в кабинете AIZ.LUN"
                  className="w-full h-full object-cover"
                  fallbackLabel="Зона массажа"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E2E2DA] aspect-[3/4] bg-white">
                <StudioImage
                  src="/assets/aistudio/studio_tools.jpg"
                  alt="Массажные масла, ролики для мадеротерапии и инструменты"
                  className="w-full h-full object-cover"
                  fallbackLabel="Инструменты и масла"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E2E2DA] aspect-[3/4] bg-white">
                <StudioImage
                  src="/assets/aistudio/studio_mirror.jpg"
                  alt="Освещение и интерьер кабинета в ЖК Riviera Park"
                  className="w-full h-full object-cover"
                  fallbackLabel="Интерьер кабинета"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
