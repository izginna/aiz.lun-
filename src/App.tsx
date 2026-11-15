import { useState } from 'react';
import { BookingCalendarSection } from './components/BookingCalendarSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { StudioTourSection } from './components/StudioTourSection';

export default function App() {
  const [selectedMassageId, setSelectedMassageId] = useState<string | null>('classic');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const handleToggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#181A18]">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesSection
          selectedMassageId={selectedMassageId}
          selectedAddonIds={selectedAddonIds}
          onSelectMassage={(id) => setSelectedMassageId(id)}
          onToggleAddon={handleToggleAddon}
        />
        <StudioTourSection />
        <BookingCalendarSection
          selectedMassageId={selectedMassageId}
          selectedAddonIds={selectedAddonIds}
          onSelectMassage={setSelectedMassageId}
          onToggleAddon={handleToggleAddon}
        />
      </main>
      <Footer />
    </div>
  );
}
