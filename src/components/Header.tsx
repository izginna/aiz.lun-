import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'Доп. уход', href: '#addons' },
  { label: 'Кабинет', href: '#studio' },
  { label: 'График', href: '#schedule' },
  { label: 'Календарь', href: '#booking' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F6]/95 backdrop-blur-sm border-b border-[#E2E2DA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#"
          className="font-serif text-2xl font-semibold tracking-tight text-[#181A18] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B463C]"
        >
          {STUDIO_INFO.brand}
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#565B54]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#181A18] hover:underline underline-offset-4 decoration-[#2B463C]/40 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B463C]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#2B463C] rounded-lg hover:bg-[#1F352D] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B463C]"
          >
            Записаться
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E2E2DA] bg-white text-[#181A18] hover:bg-[#EFEFE9] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Мобильное меню"
          className="md:hidden border-t border-[#E2E2DA] bg-[#F8F8F6] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-base font-medium text-[#181A18] rounded-lg hover:bg-[#EFEFE9] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 px-4 text-sm font-medium text-white bg-[#2B463C] rounded-lg hover:bg-[#1F352D] transition-colors"
            >
              Записаться онлайн
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
