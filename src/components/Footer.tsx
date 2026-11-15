import { STUDIO_INFO } from '../data/studioData';

export function Footer() {
  return (
    <footer className="border-t border-[#E2E2DA] bg-[#EFEFE9]/50 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="font-serif text-2xl font-semibold text-[#181A18]">
            {STUDIO_INFO.brand}
          </div>
          <p className="mt-1.5 text-sm text-[#565B54]">
            {STUDIO_INFO.address} · {STUDIO_INFO.credentials}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#565B54]">
          <a
            href="#services"
            className="hover:text-[#181A18] transition-colors whitespace-nowrap"
          >
            Услуги
          </a>
          <a
            href="#studio"
            className="hover:text-[#181A18] transition-colors whitespace-nowrap"
          >
            Кабинет
          </a>
          <a
            href="#booking"
            className="hover:text-[#181A18] transition-colors whitespace-nowrap"
          >
            Запись
          </a>
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#181A18] font-medium hover:underline underline-offset-4 whitespace-nowrap"
          >
            Instagram @{STUDIO_INFO.instagramHandle}
          </a>
          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#181A18] font-medium hover:underline underline-offset-4 whitespace-nowrap tabular-nums"
          >
            WhatsApp {STUDIO_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
