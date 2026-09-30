import React, { useState, useMemo } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { PropertyCard } from '../components/cards/PropertyCard';
import { PropertyType, ListingType } from '../types';
import {
  SlidersHorizontal,
  Search,
  MapPin,
  X,
  ArrowUpDown,
  LayoutGrid,
  List,
  Map as MapIcon,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const allProperties = store.getPublishedProperties();

  // URL query params initialization
  const initialListing = (router.searchParams.get('listing') as ListingType) || 'BUY';
  const initialCity = router.params.city || router.searchParams.get('city') || 'ALL';
  const initialType = (router.searchParams.get('type') as PropertyType) || 'ALL';
  const initialBhk = router.searchParams.get('bhk') || 'ALL';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState<ListingType | 'ALL'>(initialListing);
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedBhk, setSelectedBhk] = useState<string>(initialBhk);
  const [priceSort, setPriceSort] = useState<'RELEVANCE' | 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC' | 'VIEWS'>('NEWEST');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(router.searchParams.get('verified') === 'true');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'MAP'>('GRID');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available cities & types from catalog
  const cities = ['ALL', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'];
  const propertyTypes = [
    { value: 'ALL', label: 'All Property Types' },
    { value: 'APARTMENT', label: 'Apartments / Flats' },
    { value: 'VILLA', label: 'Luxury Villas' },
    { value: 'PLOT', label: 'Plots / Land' },
    { value: 'OFFICE', label: 'Commercial Offices' },
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties
      .filter((prop) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchLocality = prop.locality.toLowerCase().includes(q);
          const matchCity = prop.city.toLowerCase().includes(q);
          if (!matchTitle && !matchLocality && !matchCity) return false;
        }

        // Listing type (Buy / Rent)
        if (listingType !== 'ALL' && prop.listingType !== listingType) {
          return false;
        }

        // City
        if (selectedCity !== 'ALL' && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Property Type
        if (selectedType !== 'ALL' && prop.propertyType !== selectedType) {
          return false;
        }

        // BHK
        if (selectedBhk !== 'ALL') {
          const bhkNum = parseInt(selectedBhk, 10);
          if (bhkNum === 4) {
            if (!prop.bedrooms || prop.bedrooms < 4) return false;
          } else {
            if (prop.bedrooms !== bhkNum) return false;
          }
        }

        // Verified
        if (verifiedOnly && !prop.verified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'PRICE_ASC') return a.price - b.price;
        if (priceSort === 'PRICE_DESC') return b.price - a.price;
        if (priceSort === 'VIEWS') return (b.viewCount || 0) - (a.viewCount || 0);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [allProperties, searchQuery, listingType, selectedCity, selectedType, selectedBhk, verifiedOnly, priceSort]);

  const activeFiltersCount =
    (listingType !== 'ALL' ? 1 : 0) +
    (selectedCity !== 'ALL' ? 1 : 0) +
    (selectedType !== 'ALL' ? 1 : 0) +
    (selectedBhk !== 'ALL' ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery('');
    setListingType('ALL');
    setSelectedCity('ALL');
    setSelectedType('ALL');
    setSelectedBhk('ALL');
    setVerifiedOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Heading */}
      <div className="border-b border-[#E8E8E2] pb-6">
        <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
          <button onClick={() => router.navigate('/')} className="hover:text-neutral-900">
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Properties</span>
          {selectedCity !== 'ALL' && (
            <>
              <span>/</span>
              <span className="text-neutral-900 font-medium">{selectedCity}</span>
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316]">
              {selectedCity !== 'ALL' ? `Properties for Sale & Rent in ${selectedCity}` : 'Discover Verified Properties'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Explore residential apartments, luxury villas, commercial offices, and approved plots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.navigate('/list-property')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors whitespace-nowrap shadow-sm"
            >
              Post a Property Free
            </button>
          </div>
        </div>
      </div>

      {/* Main Search & Filter Control Bar */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Text Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by locality, project name, or title (e.g. Gachibowli, Kokapet)..."
              className="w-full pl-9 pr-4 py-2 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Listing Segment (Buy / Rent / All) */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-lg shrink-0">
            {(['ALL', 'BUY', 'RENT'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setListingType(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  listingType === tab ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab === 'BUY' ? 'Buy' : 'Rent'}
              </button>
            ))}
          </div>

          {/* City Selector */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A] bg-white"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Cities' : c}
              </option>
            ))}
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg text-neutral-700 bg-neutral-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>

        {/* Secondary Filter Row (Desktop) */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Property Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 border border-neutral-200 rounded-md bg-white focus:outline-none focus:border-[#1E3A8A]"
            >
              {propertyTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* BHK Select */}
            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 border border-neutral-200 rounded-md bg-white focus:outline-none focus:border-[#1E3A8A]"
            >
              <option value="ALL">Any Bedrooms</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK Luxury</option>
            </select>

            {/* Verified Only Checkbox */}
            <label className="flex items-center gap-1.5 text-xs text-neutral-700 px-3 py-1.5 border border-neutral-200 rounded-md cursor-pointer hover:bg-neutral-50">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-[#1E3A8A] rounded border-neutral-300 focus:ring-[#1E3A8A]"
              />
              <span className="font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Only
              </span>
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-800 flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort & View Mode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="text-xs font-medium text-neutral-900 border-none bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="NEWEST">Newest Listings</option>
                <option value="PRICE_ASC">Price: Low to High</option>
                <option value="PRICE_DESC">Price: High to Low</option>
                <option value="VIEWS">Most Viewed</option>
              </select>
            </div>

            <div className="flex items-center border border-neutral-200 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('GRID')}
                className={`p-1.5 transition-colors ${viewMode === 'GRID' ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-100'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('MAP')}
                className={`p-1.5 transition-colors ${viewMode === 'MAP' ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-100'}`}
                title="Map Coordinate View"
              >
                <MapIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <div>
          Showing <strong className="text-neutral-900 tabular-nums">{filteredProperties.length}</strong> verified properties
        </div>
      </div>

      {/* Content Rendering: Grid vs Map */}
      {viewMode === 'MAP' ? (
        <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-[#C5A880]" />
              <span className="text-xs font-semibold">Geospatial Coordinates & Viewport Engine</span>
            </div>
            <span className="text-[11px] text-neutral-400">Integrated Coordinate Mapping</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* Coordinates Directory */}
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                Active Listings in Viewport
              </div>
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.navigate(`/property/${p.slug}`)}
                  className="p-3 border border-neutral-200 rounded-lg hover:border-[#1E3A8A] transition-colors cursor-pointer text-xs"
                >
                  <div className="font-semibold text-neutral-900 line-clamp-1">{p.title}</div>
                  <div className="text-neutral-500 mt-0.5">{p.locality}, {p.city}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <span className="font-bold text-neutral-900 font-display">{p.priceDisplay}</span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {p.latitude.toFixed(4)}°N, {p.longitude.toFixed(4)}°E
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stylized Architectural Map Canvas */}
            <div className="lg:col-span-2 relative min-h-[400px] bg-[#E8E8E2] flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-md bg-white/95 backdrop-blur-md p-6 rounded-xl border border-neutral-300 shadow-md">
                <MapPin className="w-8 h-8 text-[#1E3A8A] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-neutral-900">Map Viewport Architecture Ready</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Every AQREVIA property model contains precise latitude and longitude coordinates. Ready for seamless Google Maps / Mapbox tile rendering without recurring key leakage.
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-center gap-4 text-xs font-mono text-neutral-500">
                  <span>Bounds: 17.38°N – 19.07°N</span>
                  <span>·</span>
                  <span>{filteredProperties.length} Geocoded Pins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E8E8E2] rounded-xl p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">No properties matched your filters</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Try broadening your location, removing BHK restrictions, or clearing filters.
                </p>
              </div>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900">Filter Properties</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1.5">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c === 'ALL' ? 'All Cities' : c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1.5">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                >
                  {propertyTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1.5">Bedrooms</label>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                >
                  <option value="ALL">Any BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK Luxury</option>
                </select>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-[#1E3A8A] rounded"
                />
                <span className="font-medium text-neutral-900">Show Verified Listings Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center gap-3">
              <button
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 text-xs font-semibold text-neutral-700 border border-neutral-200 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
              >
                Apply ({filteredProperties.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
