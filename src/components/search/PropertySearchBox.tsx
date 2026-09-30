import React, { useState } from 'react';
import { useRouter } from '../../services/router';
import { Search, MapPin, Building, ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { ListingType, PropertyType } from '../../types';

interface PropertySearchBoxProps {
  initialListingType?: ListingType | 'PROJECTS';
  initialCity?: string;
  initialType?: PropertyType | 'ALL';
  onSearch?: (filters: {
    listingType: string;
    city: string;
    propertyType: string;
    bedrooms: string;
    budgetMax: number;
    verifiedOnly: boolean;
  }) => void;
  compact?: boolean;
}

export const PropertySearchBox: React.FC<PropertySearchBoxProps> = ({
  initialListingType = 'BUY',
  initialCity = '',
  initialType = 'ALL',
  onSearch,
  compact = false,
}) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'PROJECTS'>(
    initialListingType === 'RENT' ? 'RENT' : initialListingType === 'PROJECTS' ? 'PROJECTS' : 'BUY'
  );
  const [city, setCity] = useState(initialCity || '');
  const [propertyType, setPropertyType] = useState<string>(initialType || 'ALL');
  const [bedrooms, setBedrooms] = useState<string>('ALL');
  const [budgetRange, setBudgetRange] = useState<string>('ALL');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const popularCities = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (activeTab === 'PROJECTS') {
      router.navigate(city ? `/projects?city=${encodeURIComponent(city)}` : '/projects');
      return;
    }

    const params = new URLSearchParams();
    params.set('listing', activeTab);
    if (city) params.set('city', city);
    if (propertyType !== 'ALL') params.set('type', propertyType);
    if (bedrooms !== 'ALL') params.set('bhk', bedrooms);
    if (budgetRange !== 'ALL') params.set('budget', budgetRange);
    if (verifiedOnly) params.set('verified', 'true');

    if (onSearch) {
      onSearch({
        listingType: activeTab,
        city,
        propertyType,
        bedrooms,
        budgetMax: budgetRange === 'UNDER_1CR' ? 10000000 : budgetRange === 'UNDER_3CR' ? 30000000 : 0,
        verifiedOnly,
      });
    } else {
      router.navigate(`/properties?${params.toString()}`);
    }
  };

  return (
    <div className={`bg-white border border-[#E8E8E2] rounded-xl shadow-md overflow-hidden ${compact ? 'p-3' : 'p-4 sm:p-6'}`}>
      {/* Functional Filter Tabs (Allowed under Zero-Pill Constitution as interactive controls) */}
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
        {(['BUY', 'RENT', 'PROJECTS'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-[#121316] text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {tab === 'BUY' ? 'Buy Property' : tab === 'RENT' ? 'Rent Property' : 'New Projects'}
          </button>
        ))}
      </div>

      {/* Primary Search Inputs Grid */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Location Input */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Location / City
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Gachibowli, Hyderabad"
                className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] placeholder:text-neutral-400"
              />
            </div>
            {/* Quick popular city shortcuts */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] text-neutral-400">Popular:</span>
              {popularCities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCity(c)}
                  className={`text-[10px] hover:text-[#1E3A8A] transition-colors ${
                    city.toLowerCase() === c.toLowerCase() ? 'font-bold text-[#1E3A8A]' : 'text-neutral-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Property Type
            </label>
            <div className="relative flex items-center">
              <Building className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] appearance-none bg-white"
              >
                <option value="ALL">All Property Types</option>
                <option value="APARTMENT">Apartment / Flat</option>
                <option value="VILLA">Gated Villa</option>
                <option value="PLOT">Residential Plot / Land</option>
                <option value="OFFICE">Commercial Office</option>
                <option value="RETAIL">Retail Space</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Bedrooms (BHK)
            </label>
            <div className="relative flex items-center">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] appearance-none bg-white"
              >
                <option value="ALL">Any BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK Luxury</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Budget
            </label>
            <div className="relative flex items-center">
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] appearance-none bg-white"
              >
                <option value="ALL">Any Budget</option>
                <option value="UNDER_1CR">Under ₹ 1 Crore</option>
                <option value="UNDER_3CR">₹ 1 Cr – ₹ 3 Crore</option>
                <option value="UNDER_5CR">₹ 3 Cr – ₹ 5 Crore</option>
                <option value="ABOVE_5CR">₹ 5 Crore+ (Ultra Luxury)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Advanced Filters Drawer (Toggleable) */}
        {showAdvanced && (
          <div className="pt-3 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700 select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-[#1E3A8A] rounded border-neutral-300 focus:ring-[#1E3A8A]"
              />
              <span className="font-medium">Show Verified Listings Only</span>
            </label>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Additional Filters' : 'Advanced Filters'}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1e3470] rounded-lg transition-all flex items-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </button>
        </div>
      </form>
    </div>
  );
};
