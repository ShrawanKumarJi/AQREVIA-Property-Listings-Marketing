import React from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { Scale, X, Check, Bed, Bath, Maximize2, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const comparedProperties = store.getComparedProperties();

  if (comparedProperties.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <Scale className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold font-display text-neutral-900">No Properties to Compare</h2>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Add up to 4 properties to your comparison matrix to evaluate prices, floor areas, amenities, and locations side-by-side.
        </p>
        <button
          onClick={() => router.navigate('/properties')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 transition-colors"
        >
          Browse Marketplace &rarr;
        </button>
      </div>
    );
  }

  // Master list of all unique amenities across compared properties
  const allAmenities = Array.from(new Set(comparedProperties.flatMap((p) => p.amenities)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E2] pb-6">
        <div>
          <div className="text-xs text-neutral-500 mb-1">
            <button onClick={() => router.navigate('/')} className="hover:text-neutral-900">Home</button> / <span className="text-neutral-900 font-medium">Compare</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316]">
            Side-by-Side Property Comparison ({comparedProperties.length} of 4)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Detailed matrix comparing pricing, specifications, floor dimensions, and amenities.
          </p>
        </div>

        <button
          onClick={() => store.clearCompare()}
          className="text-xs font-medium text-neutral-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
        >
          Clear Comparison
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="p-4 w-48 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-50">
                Property
              </th>
              {comparedProperties.map((p) => (
                <th key={p.id} className="p-4 w-64 align-top">
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100">
                      <SafeImage
                        src={p.media[0]?.url}
                        alt={p.title}
                        fallbackText={p.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => store.toggleCompareProperty(p.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-tight">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{p.locality}, {p.city}</p>
                      <div className="text-base font-bold font-display text-neutral-900 mt-1.5 tabular-nums">
                        {p.priceDisplay}
                      </div>
                    </div>

                    <button
                      onClick={() => router.navigate(`/property/${p.slug}`)}
                      className="w-full py-1.5 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 transition-colors text-center"
                    >
                      View Details
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 text-xs">
            {/* Price / sq.ft */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Price per sq.ft</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 font-mono font-medium text-neutral-900 tabular-nums">
                  ₹{Math.round(p.price / p.area).toLocaleString()} / sq.ft
                </td>
              ))}
            </tr>

            {/* Area */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Super Built-up Area</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800 tabular-nums">
                  {p.area.toLocaleString()} sq.ft
                </td>
              ))}
            </tr>

            {/* Bedrooms */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Bedrooms</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.bedrooms ? `${p.bedrooms} BHK` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Bathrooms */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Bathrooms</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.bathrooms ? `${p.bathrooms} Baths` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Property Type */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Property Category</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.propertyType.replace('_', ' ')}
                </td>
              ))}
            </tr>

            {/* Possession */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Possession</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.possession.replace(/_/g, ' ')}
                </td>
              ))}
            </tr>

            {/* Furnishing */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Furnishing</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.furnishing ? p.furnishing.replace('_', ' ') : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Facing */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Facing</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.facing || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Parking */}
            <tr>
              <td className="p-4 font-semibold text-neutral-700 bg-neutral-50">Parking Slots</td>
              {comparedProperties.map((p) => (
                <td key={p.id} className="p-4 text-neutral-800">
                  {p.parking ? `${p.parking} Covered` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Section Header: Amenities */}
            <tr>
              <td
                colSpan={comparedProperties.length + 1}
                className="p-3 bg-neutral-100 font-bold uppercase tracking-wider text-[11px] text-neutral-700"
              >
                Amenities Comparison
              </td>
            </tr>

            {allAmenities.map((amenity) => (
              <tr key={amenity}>
                <td className="p-4 text-neutral-600 bg-neutral-50">{amenity}</td>
                {comparedProperties.map((p) => {
                  const has = p.amenities.includes(amenity);
                  return (
                    <td key={p.id} className="p-4">
                      {has ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="text-neutral-300 font-mono">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
