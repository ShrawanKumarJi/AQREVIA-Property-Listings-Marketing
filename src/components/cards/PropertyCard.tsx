import React from 'react';
import { Property } from '../../types';
import { SafeImage } from '../ui/SafeImage';
import { useRouter } from '../../services/router';
import { useStore } from '../../services/useStore';
import { Heart, Scale, MapPin, Bed, Bath, Maximize2, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const router = useRouter();
  const store = useStore();
  const isSaved = store.isPropertySaved(property.id);
  const isCompared = store.getComparePropertyIds().includes(property.id);

  const handleCardClick = () => {
    router.navigate(`/property/${property.slug}`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleSaveProperty(property.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleCompareProperty(property.id);
  };

  const coverImage =
    property.media.find((m) => m.isCover)?.url ||
    property.media[0]?.url ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80';

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border border-[#E8E8E2] rounded-lg overflow-hidden hover:border-neutral-400 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <SafeImage
          src={coverImage}
          alt={property.title}
          fallbackText={property.title}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Action Overlay: Save & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareClick}
            aria-label="Add to comparison"
            className={`p-2 rounded-full transition-colors backdrop-blur-md ${
              isCompared
                ? 'bg-[#1E3A8A] text-white'
                : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-sm'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleSaveClick}
            aria-label="Save property"
            className={`p-2 rounded-full transition-colors backdrop-blur-md ${
              isSaved
                ? 'bg-rose-600 text-white'
                : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-rose-600 shadow-sm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Demo Indicator if applicable */}
        {property.isDemo && (
          <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase">
            Demo Listing
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata Header (Zero-Pill Rule) */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5 tracking-tight">
            <span>{property.listingType === 'BUY' ? 'For Sale' : 'For Rent'}</span>
            <span aria-hidden="true">·</span>
            <span>{property.propertyType.replace('_', ' ')}</span>
            {property.verified && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </>
            )}
          </div>

          {/* Property Title */}
          <h3 className="text-base font-semibold text-[#121316] line-clamp-1 group-hover:text-[#1E3A8A] transition-colors leading-snug">
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <span>{property.locality}, {property.city}</span>
          </p>
        </div>

        {/* Key Specs: Unboxed inline metrics with separators */}
        <div className="pt-2 border-t border-neutral-100 flex items-center gap-4 text-xs text-neutral-600">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-medium text-neutral-800 tabular-nums">{property.bedrooms}</span> BHK
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-medium text-neutral-800 tabular-nums">{property.bathrooms}</span> Bath
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-medium text-neutral-800 tabular-nums">{property.area.toLocaleString()}</span> sq.ft
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-[#121316] font-display tabular-nums tracking-tight">
              {property.priceDisplay}
            </div>
            {property.maintenance && (
              <div className="text-[11px] text-neutral-400">
                + ₹{property.maintenance.toLocaleString()} / mo maintenance
              </div>
            )}
          </div>

          <span className="text-xs font-semibold text-[#1E3A8A] group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
