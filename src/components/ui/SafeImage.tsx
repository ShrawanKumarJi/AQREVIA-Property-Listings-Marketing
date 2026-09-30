import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Real estate property',
  className = '',
  containerClassName = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 flex flex-col items-center justify-center text-neutral-400 p-4 relative overflow-hidden ${containerClassName || className}`}
      >
        <Building2 className="w-10 h-10 stroke-[1.25] text-neutral-400 mb-2" />
        <span className="text-xs font-medium text-neutral-500 text-center tracking-tight line-clamp-1">
          {fallbackText || alt}
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <Building2 className="w-8 h-8 text-neutral-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
};
