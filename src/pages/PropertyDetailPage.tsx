import React, { useState, useEffect } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { PropertyCard } from '../components/cards/PropertyCard';
import {
  MapPin,
  Heart,
  Scale,
  Share2,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Building,
  Calendar,
  Car,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  CalendarCheck,
  Flag,
  X,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const slug = router.params.slug;

  const property = store.getPropertyBySlug(slug);

  // Increment view count on mount
  useEffect(() => {
    if (property?.id) {
      store.incrementPropertyViews(property.id);
    }
  }, [property?.id]);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState(
    'I am interested in this property. Please share full brochure and pricing details.'
  );
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Site visit form
  const [visitDate, setVisitDate] = useState('2026-10-04');
  const [visitTime, setVisitTime] = useState('11:00 AM – 12:00 PM');
  const [visitorsCount, setVisitorsCount] = useState(2);
  const [visitSuccess, setVisitSuccess] = useState(false);

  // Report form
  const [reportReason, setReportReason] = useState('INCORRECT_PRICE');
  const [reportNote, setReportNote] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 font-display">Property Listing Not Found</h2>
        <p className="text-xs text-neutral-500">The property you are looking for may have been archived or sold.</p>
        <button
          onClick={() => router.navigate('/properties')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
        >
          Back to All Properties
        </button>
      </div>
    );
  }

  const isSaved = store.isPropertySaved(property.id);
  const isCompared = store.getComparePropertyIds().includes(property.id);

  const pricePerSqft = Math.round(property.price / property.area);

  // Similar properties in same city or property type
  const similarProperties = store
    .getPublishedProperties()
    .filter((p) => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    store.createLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail || 'not-provided@client.com',
      leadType: 'PROPERTY',
      propertyId: property.id,
      propertyTitle: property.title,
      budget: property.priceDisplay,
      timeline: '1 to 3 months',
      message: leadMessage,
      source: 'WEBSITE',
      priority: 'HIGH',
    });

    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setEnquiryModalOpen(false);
      setLeadName('');
      setLeadPhone('');
    }, 2000);
  };

  const handleSiteVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    const lead = store.createLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail || 'not-provided@client.com',
      leadType: 'PROPERTY',
      propertyId: property.id,
      propertyTitle: property.title,
      message: `Site visit requested for ${visitDate} at ${visitTime}`,
      source: 'WEBSITE',
      priority: 'URGENT',
    });

    store.scheduleSiteVisit({
      leadId: lead.id,
      leadName,
      leadPhone,
      leadEmail,
      propertyId: property.id,
      propertyTitle: property.title,
      preferredDate: visitDate,
      preferredTimeSlot: visitTime,
      visitorCount: Number(visitorsCount),
    });

    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setSiteVisitModalOpen(false);
    }, 2000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportModalOpen(false);
    }, 1500);
  };

  const activeMedia = property.media[activeMediaIndex] || property.media[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E2] pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <button
            onClick={() => router.navigate('/properties')}
            className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Properties</span>
          </button>
          <span>/</span>
          <button
            onClick={() => router.navigate(`/properties/${encodeURIComponent(property.city)}`)}
            className="hover:text-neutral-900 transition-colors"
          >
            {property.city}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-xs">{property.locality}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => store.toggleCompareProperty(property.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 ${
              isCompared
                ? 'border-[#1E3A8A] bg-[#1E3A8A] text-white'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            onClick={() => store.toggleSaveProperty(property.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 ${
              isSaved
                ? 'border-rose-300 bg-rose-50 text-rose-700'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 text-xs font-medium rounded border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setReportModalOpen(true)}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
            title="Report inaccurate information"
          >
            <Flag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Showcase Gallery */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
          <SafeImage
            src={activeMedia?.url}
            alt={property.title}
            fallbackText={property.title}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />

          {/* Navigation Controls on Hero Image */}
          {property.media.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMediaIndex((prev) => (prev === 0 ? property.media.length - 1 : prev - 1));
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMediaIndex((prev) => (prev === property.media.length - 1 ? 0 : prev + 1));
                }}
                className="pointer-events-auto p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Demo status & verification overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {property.isDemo && (
              <span className="bg-neutral-900/90 text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded backdrop-blur-md">
                Demo Listing
              </span>
            )}
            {property.verified && (
              <span className="bg-emerald-800/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Title & Location
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {property.media.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.media.map((med, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  activeMediaIndex === idx ? 'border-[#1E3A8A] ring-1 ring-[#1E3A8A]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={med.url}
                  alt={`Thumbnail ${idx + 1}`}
                  fallbackText={`Thumb ${idx + 1}`}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Two Column Layout: Details & Sticky Conversion Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Details (Col Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Title & Pricing */}
          <div className="border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span>{property.listingType === 'BUY' ? 'For Sale' : 'For Rent'}</span>
              <span>·</span>
              <span>{property.propertyType.replace('_', ' ')}</span>
              <span>·</span>
              <span>ID: {property.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] leading-snug">
              {property.title}
            </h1>

            <p className="text-sm text-neutral-500 mt-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{property.address}</span>
            </p>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-3xl font-bold font-display text-[#121316] tabular-nums">
                  {property.priceDisplay}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  ₹{pricePerSqft.toLocaleString()} / sq.ft
                  {property.maintenance ? ` · Maintenance ₹${property.maintenance.toLocaleString()}/mo` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Key Facts Matrix */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">Key Property Facts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-[#E8E8E2]">
              {property.bedrooms && (
                <div>
                  <div className="text-xs text-neutral-400">Bedrooms</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5 tabular-nums">{property.bedrooms} BHK</div>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <div className="text-xs text-neutral-400">Bathrooms</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5 tabular-nums">{property.bathrooms} Baths</div>
                </div>
              )}
              <div>
                <div className="text-xs text-neutral-400">Super Built-up Area</div>
                <div className="text-sm font-bold text-neutral-900 mt-0.5 tabular-nums">{property.area.toLocaleString()} sq.ft</div>
              </div>
              {property.carpetArea && (
                <div>
                  <div className="text-xs text-neutral-400">Carpet Area</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5 tabular-nums">{property.carpetArea.toLocaleString()} sq.ft</div>
                </div>
              )}
              {property.furnishing && (
                <div>
                  <div className="text-xs text-neutral-400">Furnishing</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5">{property.furnishing.replace('_', ' ')}</div>
                </div>
              )}
              {property.facing && (
                <div>
                  <div className="text-xs text-neutral-400">Facing</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5">{property.facing}</div>
                </div>
              )}
              {property.floor && (
                <div>
                  <div className="text-xs text-neutral-400">Floor</div>
                  <div className="text-sm font-bold text-neutral-900 mt-0.5 tabular-nums">Floor {property.floor} of {property.totalFloors}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-neutral-400">Possession</div>
                <div className="text-sm font-bold text-neutral-900 mt-0.5">{property.possession.replace(/_/g, ' ')}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Property Overview</h3>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line bg-white border border-[#E8E8E2] rounded-xl p-5">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Amenities & Infrastructure</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-white border border-[#E8E8E2] rounded-lg text-xs font-medium text-neutral-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Location Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Location & Coordinates</h3>
            <div className="bg-white border border-[#E8E8E2] rounded-xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-semibold text-neutral-900">{property.locality}</span>
                  <span className="text-neutral-500">, {property.city}, {property.state}</span>
                </div>
                <div className="font-mono text-neutral-500 text-[11px]">
                  Coordinates: {property.latitude.toFixed(4)}° N, {property.longitude.toFixed(4)}° E
                </div>
              </div>

              {/* Viewport Box */}
              <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                <span>View on Maps application</span>
                <a
                  href={`https://maps.google.com/?q=${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#1E3A8A] hover:underline"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Real Estate Growth Banner for Advertisers */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-wider">
                AQREVIA Growth Solutions
              </span>
              <h4 className="text-base font-bold font-display mt-0.5">Need More Inbound Enquiries for Your Property?</h4>
              <p className="text-xs text-neutral-300 mt-1">
                Activate high-intent performance marketing, 4K walkthrough video cuts, and AI lead qualification.
              </p>
            </div>
            <button
              onClick={() => router.navigate('/services')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Explore Growth Services
            </button>
          </div>
        </div>

        {/* Sticky Conversion & Contact Sidebar (Col Span 1) */}
        <div className="sticky top-28 space-y-4">
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-5 shadow-sm space-y-5">
            {/* Contact Card Header */}
            <div className="border-b border-neutral-100 pb-4">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Advertiser Information
              </span>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-800 font-display">
                  {property.ownerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{property.ownerName}</h4>
                  <div className="text-xs text-neutral-500">
                    Posted as <strong>{property.postedByRole}</strong>
                    {property.developerName && ` · ${property.developerName}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Inbound Enquiry</span>
              </button>

              <button
                onClick={() => setSiteVisitModalOpen(true)}
                className="w-full py-3 text-xs font-semibold text-[#1E3A8A] bg-[#1E3A8A]/10 hover:bg-[#1E3A8A]/15 border border-[#1E3A8A]/20 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Private Site Visit</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${property.ownerPhone}`}
                  className="py-2.5 text-xs font-medium text-neutral-800 border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={`https://wa.me/${property.ownerPhone.replace(/\D/g, '')}?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 text-xs font-medium text-emerald-800 border border-emerald-300 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Spam Guarantee</span>
              </div>
              <p>Your contact information is only transmitted to the verified advertiser of this listing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-[#E8E8E2]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Related Listings</span>
              <h3 className="text-xl font-bold font-display text-neutral-900 mt-0.5">
                Similar Properties in {property.city}
              </h3>
            </div>
            <button
              onClick={() => router.navigate('/properties')}
              className="text-xs font-semibold text-[#1E3A8A] hover:underline"
            >
              Browse All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}

      {/* 1. Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">Enquiry Submitted Successfully</h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  The advertiser has been notified and will reach out to you directly via phone or WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-wider">Direct Enquiry</span>
                  <h3 className="text-lg font-bold text-neutral-900 font-display mt-0.5">Contact Advertiser</h3>
                  <p className="text-xs text-neutral-500 mt-1 truncate">{property.title}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Vikramaditya Reddy"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Phone Number (with WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 98480 12345"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Message / Question</label>
                    <textarea
                      rows={3}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Schedule Site Visit Modal */}
      {siteVisitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSiteVisitModalOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {visitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">Site Visit Booked</h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Your site visit has been scheduled for {visitDate} ({visitTime}). An SMS and WhatsApp confirmation will be sent shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-wider">
                    Site Visit Booking
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 font-display mt-0.5">Schedule On-Site Inspection</h3>
                  <p className="text-xs text-neutral-500 mt-1 truncate">{property.title}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 98480 12345"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Time Slot *</label>
                      <select
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                      >
                        <option>10:00 AM – 11:30 AM</option>
                        <option>11:30 AM – 01:00 PM</option>
                        <option>02:00 PM – 03:30 PM</option>
                        <option>04:00 PM – 05:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Number of Visitors</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={visitorsCount}
                      onChange={(e) => setVisitorsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1a337a] rounded-lg transition-colors"
                >
                  Confirm Site Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Report Listing Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {reportSuccess ? (
              <div className="py-6 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-neutral-900">Report Submitted</h4>
                <p className="text-xs text-neutral-500">Thank you. Our moderation team will audit this listing within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-neutral-900 font-display">Report Listing Inaccuracy</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Reason for Report</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                    >
                      <option value="INCORRECT_PRICE">Incorrect or misleading price</option>
                      <option value="UNAVAILABLE">Property is already sold or rented</option>
                      <option value="WRONG_LOCATION">Incorrect map location or address</option>
                      <option value="DUPLICATE">Duplicate listing</option>
                      <option value="FRAUD">Fraudulent or suspicious advertiser</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Additional Details</label>
                    <textarea
                      rows={3}
                      value={reportNote}
                      onChange={(e) => setReportNote(e.target.value)}
                      placeholder="Please describe the discrepancy..."
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                >
                  Submit Audit Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
