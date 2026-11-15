import { Check, Plus } from 'lucide-react';
import {
  ADDON_SERVICES,
  MASSAGE_SERVICES,
  formatTenge,
} from '../data/studioData';

interface ServicesSectionProps {
  selectedMassageId: string | null;
  selectedAddonIds: string[];
  onSelectMassage: (id: string) => void;
  onToggleAddon: (id: string) => void;
}

export function ServicesSection({
  selectedMassageId,
  selectedAddonIds,
  onSelectMassage,
  onToggleAddon,
}: ServicesSectionProps) {
  const handleSelectAndScroll = (id: string) => {
    onSelectMassage(id);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 border-b border-[#E2E2DA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <p className="text-sm text-[#565B54] mb-2">
              Основные сеансы · Длительность 1,5–2 часа
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#181A18] tracking-tight text-balance">
              Виды массажа
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#565B54] max-w-md leading-relaxed">
            Выберите программу под ваш запрос. При нажатии сеанс сразу подставляется
            в календарь предварительной записи.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASSAGE_SERVICES.map((service) => {
            const isSelected = selectedMassageId === service.id;
            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-colors duration-150 ${
                  isSelected
                    ? 'bg-white border-[#2B463C] shadow-sm'
                    : 'bg-white border-[#E2E2DA] hover:border-[#2B463C]/50'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-[#E2E2DA]">
                    <span className="text-xs font-medium text-[#565B54] tabular-nums">
                      {service.index} · {service.duration}
                    </span>
                    <span className="font-serif text-2xl font-semibold text-[#181A18] tabular-nums whitespace-nowrap">
                      {formatTenge(service.price)}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#181A18]">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-[#2B463C]">
                    {service.focus}
                  </p>
                  <p className="mt-3 text-sm text-[#565B54] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E2DA]/70">
                  <button
                    type="button"
                    onClick={() => handleSelectAndScroll(service.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#2B463C] text-white hover:bg-[#1F352D]'
                        : 'bg-[#EFEFE9] text-[#181A18] hover:bg-[#E2E2DA]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Выбрано в календаре</span>
                      </>
                    ) : (
                      <span>Выбрать и записаться</span>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div id="addons" className="mt-16 lg:mt-20 pt-12 border-t border-[#E2E2DA]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-[#565B54] mb-2">
                Усиление основного сеанса или экспресс-зоны
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#181A18] tracking-tight">
                Дополнительные услуги
              </h3>
            </div>
            <a
              href="#booking"
              className="text-sm font-medium text-[#2B463C] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Перейти к выбору даты ({selectedAddonIds.length} выбрано)
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E2DA] divide-y divide-[#E2E2DA]">
            {ADDON_SERVICES.map((addon) => {
              const isAdded = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F6]/60 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-xs font-medium text-[#565B54] tabular-nums">
                        {addon.index}
                      </span>
                      <h4 className="text-base sm:text-lg font-medium text-[#181A18]">
                        {addon.name}
                      </h4>
                      <span className="text-xs text-[#565B54]">
                        · {addon.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#565B54]">{addon.note}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                    <span className="font-serif text-xl sm:text-2xl font-semibold text-[#181A18] tabular-nums whitespace-nowrap">
                      {formatTenge(addon.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleAddon(addon.id)}
                      aria-pressed={isAdded}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#2B463C] text-white hover:bg-[#1F352D]'
                          : 'bg-[#EFEFE9] text-[#181A18] hover:bg-[#E2E2DA]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Добавлено</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" aria-hidden="true" />
                          <span>Добавить</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
