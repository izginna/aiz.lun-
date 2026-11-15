import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function StudioImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Кабинет AIZ.LUN',
}: StudioImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFEFE9] text-[#565B54] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 mb-2 text-[#2B463C]" aria-hidden="true" />
        <span className="text-sm font-medium text-[#181A18]">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
