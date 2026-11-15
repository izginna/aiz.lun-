import { useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  ADDON_SERVICES,
  MASSAGE_SERVICES,
  SCHEDULE_WINDOWS,
  STUDIO_INFO,
  formatTenge,
  getAvailableSlotsForDate,
} from '../data/studioData';

interface BookingCalendarSectionProps {
  selectedMassageId: string | null;
  selectedAddonIds: string[];
  onSelectMassage: (id: string | null) => void;
  onToggleAddon: (id: string) => void;
}

const WEEKDAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const MONTHS_GENITIVE_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function BookingCalendarSection({
  selectedMassageId,
  selectedAddonIds,
  onSelectMassage,
  onToggleAddon,
}: BookingCalendarSectionProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    return getAvailableSlotsForDate(today).slots[0] ?? '19:20';
  });
  const [clientName, setClientName] = useState('');
  const [clientNote, setClientNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedPreview, setSubmittedPreview] = useState(false);

  const selectedMassage = useMemo(
    () => MASSAGE_SERVICES.find((m) => m.id === selectedMassageId) ?? null,
    [selectedMassageId]
  );

  const selectedAddons = useMemo(
    () => ADDON_SERVICES.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  );

  const totalPrice = useMemo(() => {
    const mainPrice = selectedMassage ? selectedMassage.price : 0;
    const addonsPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);
    return mainPrice + addonsPrice;
  }, [selectedMassage, selectedAddons]);

  const hasAnySelection = Boolean(selectedMassage) || selectedAddons.length > 0;

  const { slots, windowLabel } = useMemo(
    () => getAvailableSlotsForDate(selectedDate),
    [selectedDate]
  );

  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Monday-first offset (0 = Mon ... 6 = Sun)
    const startOffset = (firstDay.getDay() + 6) % 7;

    const cells: Array<Date | null> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      cells.push(new Date(year, month, d));
    }
    return cells;
  }, [viewMonth]);

  const canGoPrevMonth =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    const nextSlots = getAvailableSlotsForDate(date).slots;
    if (!nextSlots.includes(selectedTime)) {
      setSelectedTime(nextSlots[0] ?? '19:20');
    }
    setSubmittedPreview(false);
  };

  const formattedDate = `${selectedDate.getDate()} ${MONTHS_GENITIVE_RU[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  const bookingMessage = useMemo(() => {
    const lines: string[] = [
      'Здравствуйте! Хочу заранее забронировать сеанс массажа:',
      `Дата: ${formattedDate}`,
      `Время: ${selectedTime}`,
    ];
    if (selectedMassage) {
      lines.push(
        `Основной сеанс: ${selectedMassage.name} (${selectedMassage.duration}) — ${formatTenge(selectedMassage.price)}`
      );
    }
    if (selectedAddons.length > 0) {
      lines.push(
        `Доп. услуги: ${selectedAddons
          .map((a) => `${a.name} (${formatTenge(a.price)})`)
          .join(', ')}`
      );
    }
    lines.push(`Итого: ${formatTenge(totalPrice)}`);
    if (clientName.trim()) {
      lines.push(`Имя: ${clientName.trim()}`);
    }
    if (clientNote.trim()) {
      lines.push(`Пожелание: ${clientNote.trim()}`);
    }
    lines.push(`Адрес: ${STUDIO_INFO.address}`);
    return lines.join('\n');
  }, [
    formattedDate,
    selectedTime,
    selectedMassage,
    selectedAddons,
    totalPrice,
    clientName,
    clientNote,
  ]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${STUDIO_INFO.phoneRaw}?text=${encodeURIComponent(
      bookingMessage
    )}`;
  }, [bookingMessage]);

  const handleCopyBooking = async () => {
    try {
      await navigator.clipboard.writeText(bookingMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setSubmittedPreview(true);
    }
  };

  return (
    <section id="booking" className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="schedule"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mb-12 border-b border-[#E2E2DA] items-start"
        >
          <div className="lg:col-span-5">
            <p className="text-sm text-[#565B54] mb-2">
              Предварительная запись
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#181A18] tracking-tight text-balance">
              График работы и календарь бронирования
            </h2>
            <div className="mt-5 flex items-start gap-2.5 text-sm text-[#565B54]">
              <MapPin className="w-4 h-4 text-[#2B463C] mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {STUDIO_INFO.address} · {STUDIO_INFO.districtNote}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SCHEDULE_WINDOWS.map((win) => (
              <div
                key={win.days}
                className="p-5 rounded-xl bg-white border border-[#E2E2DA]"
              >
                <div className="text-xs font-medium text-[#565B54]">{win.days}</div>
                <div className="mt-2 font-serif text-xl font-semibold text-[#181A18] tabular-nums">
                  {win.hours}
                </div>
                <p className="mt-1.5 text-xs text-[#565B54] leading-relaxed">
                  {win.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Calendar + Time Slots */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E2DA] p-5 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E2E2DA]">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-[#2B463C]" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-medium text-[#181A18]">
                  {MONTHS_RU[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={!canGoPrevMonth}
                  aria-label="Предыдущий месяц"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E2DA] text-[#181A18] hover:bg-[#EFEFE9] disabled:opacity-35 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Следующий месяц"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E2DA] text-[#181A18] hover:bg-[#EFEFE9] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
              {WEEKDAYS_RU.map((day) => (
                <div
                  key={day}
                  className="py-2 text-xs font-medium text-[#565B54]"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((cell, idx) => {
                if (!cell) {
                  return <div key={`empty-${idx}`} className="h-11" />;
                }
                const isPast = cell < today;
                const isSelected = isSameDay(cell, selectedDate);
                const isToday = isSameDay(cell, today);

                return (
                  <button
                    key={cell.toISOString()}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDate(cell)}
                    aria-pressed={isSelected}
                    aria-label={`${cell.getDate()} ${MONTHS_GENITIVE_RU[cell.getMonth()]}`}
                    className={`h-11 rounded-lg text-sm font-medium tabular-nums transition-colors duration-150 flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#2B463C] text-white'
                        : isPast
                        ? 'text-[#565B54]/35 cursor-not-allowed'
                        : isToday
                        ? 'bg-[#EFEFE9] text-[#181A18] border border-[#2B463C]/40 hover:bg-[#E2E2DA]'
                        : 'text-[#181A18] hover:bg-[#EFEFE9]'
                    }`}
                  >
                    <span>{cell.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2E2DA]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#181A18]">
                  <Clock className="w-4 h-4 text-[#2B463C]" aria-hidden="true" />
                  <span>Время начала на {formattedDate}</span>
                </div>
                <span className="text-xs text-[#565B54]">{windowLabel}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {slots.map((slot) => {
                  const active = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      aria-pressed={active}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium tabular-nums transition-colors duration-150 ${
                        active
                          ? 'bg-[#2B463C] text-white'
                          : 'bg-[#F8F8F6] text-[#181A18] border border-[#E2E2DA] hover:bg-[#EFEFE9]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-[#565B54]">
                Кабинет работает до 00:00 · точное окно подтверждается заранее по номеру{' '}
                <span className="tabular-nums font-medium text-[#181A18]">
                  {STUDIO_INFO.phoneDisplay}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Service configuration & direct booking action */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E2DA] p-5 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#181A18]">
                Параметры записи
              </h3>
              <p className="mt-1 text-sm text-[#565B54]">
                Заявка сразу передаётся на {STUDIO_INFO.phoneDisplay}
              </p>
            </div>

            <div>
              <label
                htmlFor="massage-select"
                className="block text-sm font-medium text-[#181A18] mb-2"
              >
                Основной вид массажа (1,5–2 часа)
              </label>
              <select
                id="massage-select"
                value={selectedMassageId ?? 'none'}
                onChange={(e) =>
                  onSelectMassage(e.target.value === 'none' ? null : e.target.value)
                }
                className="w-full h-11 px-3.5 rounded-lg border border-[#E2E2DA] bg-[#F8F8F6] text-sm text-[#181A18] focus:outline-none focus:border-[#2B463C]"
              >
                {MASSAGE_SERVICES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {formatTenge(m.price)}
                  </option>
                ))}
                <option value="none">Без основного (только доп. услуга)</option>
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-[#181A18] mb-2">
                Дополнительные услуги
              </span>
              <div className="flex flex-wrap gap-2">
                {ADDON_SERVICES.map((addon) => {
                  const active = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => onToggleAddon(addon.id)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        active
                          ? 'bg-[#2B463C] text-white'
                          : 'bg-[#F8F8F6] text-[#181A18] border border-[#E2E2DA] hover:bg-[#EFEFE9]'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                      <span>{addon.name}</span>
                      <span className="tabular-nums opacity-80">
                        · {formatTenge(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <div>
                <label
                  htmlFor="client-name"
                  className="block text-sm font-medium text-[#181A18] mb-1.5"
                >
                  Ваше имя
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Например, Алина"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E2E2DA] bg-[#F8F8F6] text-sm text-[#181A18] placeholder:text-[#565B54]/60 focus:outline-none focus:border-[#2B463C]"
                />
              </div>
              <div>
                <label
                  htmlFor="client-note"
                  className="block text-sm font-medium text-[#181A18] mb-1.5"
                >
                  Пожелание или зона акцента (необязательно)
                </label>
                <input
                  id="client-note"
                  type="text"
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder="Например, акцент на поясницу и шею"
                  className="w-full h-11 px-3.5 rounded-lg border border-[#E2E2DA] bg-[#F8F8F6] text-sm text-[#181A18] placeholder:text-[#565B54]/60 focus:outline-none focus:border-[#2B463C]"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#E2E2DA] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#565B54]">
                <span>Выбранная дата и время</span>
                <span className="font-medium text-[#181A18] tabular-nums">
                  {formattedDate}, {selectedTime}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-[#E2E2DA]">
                <span className="text-sm font-medium text-[#181A18]">
                  Предварительная сумма
                </span>
                <span className="font-serif text-2xl font-semibold text-[#181A18] tabular-nums">
                  {formatTenge(totalPrice)}
                </span>
              </div>
            </div>

            {!hasAnySelection && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                Выберите основной массаж или хотя бы одну дополнительную услугу.
              </p>
            )}

            <div className="space-y-2.5">
              <a
                href={hasAnySelection ? whatsappUrl : '#booking'}
                target={hasAnySelection ? '_blank' : undefined}
                rel={hasAnySelection ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!hasAnySelection) {
                    e.preventDefault();
                    return;
                  }
                  setSubmittedPreview(true);
                }}
                className={`w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  hasAnySelection
                    ? 'bg-[#2B463C] text-white hover:bg-[#1F352D]'
                    : 'bg-[#E2E2DA] text-[#565B54] cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Забронировать на {STUDIO_INFO.phoneDisplay}</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={STUDIO_INFO.telHref}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#E2E2DA] bg-white text-xs font-medium text-[#181A18] hover:bg-[#EFEFE9] transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2B463C]" aria-hidden="true" />
                  <span>Позвонить</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyBooking}
                  disabled={!hasAnySelection}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#E2E2DA] bg-white text-xs font-medium text-[#181A18] hover:bg-[#EFEFE9] disabled:opacity-40 transition-colors whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2B463C]" aria-hidden="true" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#565B54]" aria-hidden="true" />
                      <span>Скопировать заявку</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {submittedPreview && hasAnySelection && (
              <div className="p-4 rounded-xl bg-[#EFEFE9] border border-[#2B463C]/25 text-xs text-[#181A18] space-y-1.5">
                <p className="font-semibold">Заявка сформирована для {STUDIO_INFO.phoneDisplay}</p>
                <p className="text-[#565B54]">
                  Если мессенджер не открылся автоматически, нажмите «Позвонить» или
                  скопируйте текст заявки выше.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
