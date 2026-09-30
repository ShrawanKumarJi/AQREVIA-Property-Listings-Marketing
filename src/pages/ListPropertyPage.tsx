import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { ListingType, PropertyType, FurnishingStatus, PossessionStatus } from '../types';
import {
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Eye,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';

export const ListPropertyPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const currentUser = store.getCurrentUser();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  // Form State
  const [listingType, setListingType] = useState<ListingType>('BUY');
  const [postedByRole, setPostedByRole] = useState<'OWNER' | 'BROKER' | 'BUILDER'>('OWNER');
  const [propertyType, setPropertyType] = useState<PropertyType>('APARTMENT');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Location
  const [city, setCity] = useState('Hyderabad');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(17.4182);
  const [longitude, setLongitude] = useState(78.3498);

  // Specifications
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [area, setArea] = useState(2150);
  const [carpetArea, setCarpetArea] = useState(1720);
  const [floor, setFloor] = useState(12);
  const [totalFloors, setTotalFloors] = useState(24);
  const [furnishing, setFurnishing] = useState<FurnishingStatus>('SEMI_FURNISHED');
  const [facing, setFacing] = useState<'EAST' | 'WEST' | 'NORTH' | 'SOUTH' | 'NORTH_EAST'>('EAST');
  const [possession, setPossession] = useState<PossessionStatus>('READY_TO_MOVE');
  const [parking, setParking] = useState(2);

  // Pricing
  const [price, setPrice] = useState(19500000); // 1.95 Cr
  const [maintenance, setMaintenance] = useState(5000);

  // Amenities
  const availableAmenities = [
    'Swimming Pool',
    'Gymnasium',
    'Clubhouse',
    '100% Power Backup',
    '24x7 Security & CCTV',
    'EV Car Charging',
    'High Speed Elevators',
    'Children Play Area',
    'Tennis & Badminton Courts',
    'Private Garden',
    'Gas Pipeline',
    'Solar Water Heating',
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Swimming Pool',
    'Gymnasium',
    '100% Power Backup',
    '24x7 Security & CCTV',
  ]);

  // Media
  const [mediaList, setMediaList] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Contact
  const [contactName, setContactName] = useState(currentUser.name || 'Property Owner');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '+91 98480 12345');
  const [contactEmail, setContactEmail] = useState(currentUser.email || 'owner@example.com');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdSlug, setCreatedSlug] = useState('');

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setMediaList((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  const formatPriceDisplay = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lac`;
    }
    return `₹ ${val.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = `${title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'property'}-${Date.now().toString().slice(-4)}`;

    const newProp = store.createProperty({
      title: title || `${bedrooms} BHK ${propertyType} in ${locality || city}`,
      slug,
      description: description || `Well-maintained ${propertyType} available in ${locality}, ${city}. Excellent connectivity to IT hubs and public transit.`,
      listingType,
      propertyType,
      status: 'PUBLISHED', // or SUBMITTED for review
      price: Number(price),
      priceDisplay: formatPriceDisplay(Number(price)),
      maintenance: Number(maintenance),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area: Number(area),
      carpetArea: Number(carpetArea),
      floor: Number(floor),
      totalFloors: Number(totalFloors),
      furnishing,
      facing,
      possession,
      parking: Number(parking),
      amenities: selectedAmenities,
      city,
      state: city === 'Hyderabad' ? 'Telangana' : city === 'Bengaluru' ? 'Karnataka' : 'Maharashtra',
      locality: locality || 'Central Corridor',
      address: address || `${locality}, ${city}`,
      latitude,
      longitude,
      media: mediaList.map((url, i) => ({
        url,
        isCover: i === 0,
        type: 'image',
      })),
      ownerId: currentUser.id,
      ownerName: contactName,
      ownerPhone: contactPhone,
      ownerEmail: contactEmail,
      postedByRole,
      verified: true,
      featured: false,
    });

    setCreatedSlug(newProp.slug);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-display text-neutral-900">
            Property Listed Successfully!
          </h2>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Your property has been verified and published to the live AQREVIA marketplace catalog.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => router.navigate(`/property/${createdSlug}`)}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 transition-colors"
          >
            View Live Listing
          </button>
          <button
            onClick={() => router.navigate('/dashboard')}
            className="px-6 py-2.5 text-xs font-semibold text-neutral-700 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
          >
            Open My Workspace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Wizard Header */}
      <div className="border-b border-[#E8E8E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">
            Listing Wizard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-0.5">
            List Your Property on AQREVIA
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Reach verified buyers and corporate tenants with zero hidden fees.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-500">
          <span>Step {currentStep} of {totalSteps}</span>
          <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1E3A8A] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Multi-Step Form */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 shadow-xs">
        {/* Step 1: Listing Type & Role */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display text-neutral-900">1. Listing Purpose & Role</h3>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">What do you want to do?</label>
              <div className="grid grid-cols-2 gap-3">
                {(['BUY', 'RENT'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setListingType(type)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      listingType === type
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 ring-1 ring-[#1E3A8A]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-neutral-900">
                      {type === 'BUY' ? 'Sell Property' : 'Rent Out Property'}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {type === 'BUY' ? 'List for outright purchase' : 'List for monthly tenancy'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700">You are listing as:</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { role: 'OWNER', label: 'Direct Owner', desc: 'Zero brokerage' },
                  { role: 'BROKER', label: 'Certified Broker', desc: 'Client listing' },
                  { role: 'BUILDER', label: 'Builder / Developer', desc: 'Direct developer sales' },
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setPostedByRole(item.role as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      postedByRole === item.role
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 ring-1 ring-[#1E3A8A]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-900">{item.label}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Property Type */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display text-neutral-900">2. Select Property Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                { type: 'APARTMENT', label: 'Apartment / Flat' },
                { type: 'VILLA', label: 'Independent Villa' },
                { type: 'PLOT', label: 'Residential Plot / Land' },
                { type: 'OFFICE', label: 'Commercial Office Space' },
                { type: 'RETAIL', label: 'Retail Shop / Showroom' },
                { type: 'INDEPENDENT_HOUSE', label: 'Independent House' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setPropertyType(item.type as any)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    propertyType === item.type
                      ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 ring-1 ring-[#1E3A8A]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-neutral-500 mb-2" />
                  <div className="font-bold text-neutral-900">{item.label}</div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Property Title / Headline *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 3 BHK High-Rise Sky Residence with Golf Course View"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">3. Property Location</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option>Hyderabad</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Chennai</option>
                  <option>Pune</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Locality / Micro-Market *</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Financial District, Gachibowli"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Complete Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Building Name, Tower, Street Name..."
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-neutral-600">
              <span className="font-semibold text-neutral-900 block mb-1">Geographic Coordinates</span>
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div>Latitude: {latitude.toFixed(4)}° N</div>
                <div>Longitude: {longitude.toFixed(4)}° E</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Specifications */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">4. Specifications & Floor Area</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value={1}>1 BHK</option>
                  <option value={2}>2 BHK</option>
                  <option value={3}>3 BHK</option>
                  <option value={4}>4 BHK</option>
                  <option value={5}>5+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Bathrooms</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5+</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Super Built-up (sq.ft) *</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Carpet Area (sq.ft)</label>
                <input
                  type="number"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Furnishing</label>
                <select
                  value={furnishing}
                  onChange={(e) => setFurnishing(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value="UNFURNISHED">Unfurnished</option>
                  <option value="SEMI_FURNISHED">Semi Furnished</option>
                  <option value="FULLY_FURNISHED">Fully Furnished</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Facing</label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value="EAST">East</option>
                  <option value="WEST">West</option>
                  <option value="NORTH">North</option>
                  <option value="SOUTH">South</option>
                  <option value="NORTH_EAST">North-East</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Possession Status</label>
                <select
                  value={possession}
                  onChange={(e) => setPossession(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value="READY_TO_MOVE">Ready to Move</option>
                  <option value="UNDER_CONSTRUCTION">Under Construction</option>
                  <option value="IMMEDIATE">Immediate</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Pricing */}
        {currentStep === 5 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">5. Pricing & Maintenance</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  {listingType === 'BUY' ? 'Total Expected Price (INR) *' : 'Monthly Rent (INR) *'}
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm font-bold font-mono"
                />
                <div className="text-[11px] text-[#1E3A8A] font-semibold mt-1">
                  Preview: {formatPriceDisplay(Number(price))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Monthly Maintenance (INR)</label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Amenities */}
        {currentStep === 6 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">6. Amenities & Facilities</h3>
            <p className="text-neutral-500">Select all features available in the society / apartment:</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 font-semibold text-[#1E3A8A]'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{amenity}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 7: Media */}
        {currentStep === 7 && (
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">7. Property Photographs</h3>
            <p className="text-neutral-500">Provide direct image links for the property showcase:</p>

            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste direct image URL (https://...)"
                className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-[#121316] text-white rounded font-semibold hover:bg-neutral-800"
              >
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {mediaList.map((url, i) => (
                <div key={i} className="relative aspect-[16/10] rounded-lg overflow-hidden border border-neutral-200 group">
                  <img src={url} alt={`Media ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/70 text-white rounded hover:bg-black"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-[#1E3A8A] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Preview & Contact */}
        {currentStep === 8 && (
          <div className="space-y-6 text-xs">
            <h3 className="text-lg font-bold font-display text-neutral-900">8. Contact Information & Submission</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>
            </div>

            {/* Preview Summary */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Listing Summary
              </span>
              <div className="text-sm font-bold text-neutral-900">
                {title || `${bedrooms} BHK ${propertyType} in ${locality || city}`}
              </div>
              <div className="text-xs text-neutral-600">
                {locality}, {city} · {area} sq.ft · {formatPriceDisplay(Number(price))}
              </div>
              <div className="text-[11px] text-neutral-500">
                {selectedAmenities.length} Amenities Selected · {mediaList.length} Photos Attached
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-100 mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 border border-neutral-300 rounded hover:bg-neutral-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 flex items-center gap-1.5 shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Publish Listing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
