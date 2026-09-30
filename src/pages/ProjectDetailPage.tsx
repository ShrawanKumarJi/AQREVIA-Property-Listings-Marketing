import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { PropertyCard } from '../components/cards/PropertyCard';
import {
  MapPin,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Download,
  CalendarCheck,
  MessageSquare,
  CheckCircle2,
  Phone,
  ArrowLeft,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const slug = router.params.slug;

  const project = store.getProjectBySlug(slug);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);
  const [brochureSuccess, setBrochureSuccess] = useState(false);

  // Form states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState(
    'Please send pricing sheet, unit inventory and payment schedules for this project.'
  );
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Site visit state
  const [visitDate, setVisitDate] = useState('2026-10-04');
  const [visitTime, setVisitTime] = useState('11:00 AM – 12:30 PM');
  const [visitSuccess, setVisitSuccess] = useState(false);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 font-display">Project Not Found</h2>
        <p className="text-xs text-neutral-500">The development project you requested could not be located.</p>
        <button
          onClick={() => router.navigate('/projects')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
        >
          Back to All Projects
        </button>
      </div>
    );
  }

  const developer = store.getDevelopers().find((d) => d.id === project.developerId);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    store.createLead({
      name: leadName,
      phone: leadPhone,
      email: leadEmail || 'not-provided@client.com',
      leadType: 'PROJECT',
      projectId: project.id,
      projectTitle: project.name,
      budget: project.priceDisplay,
      timeline: 'Immediate to 3 months',
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
      leadType: 'PROJECT',
      projectId: project.id,
      projectTitle: project.name,
      message: `Project site visit requested for ${visitDate} at ${visitTime}`,
      source: 'WEBSITE',
      priority: 'URGENT',
    });

    store.scheduleSiteVisit({
      leadId: lead.id,
      leadName,
      leadPhone,
      leadEmail,
      projectId: project.id,
      projectTitle: project.name,
      preferredDate: visitDate,
      preferredTimeSlot: visitTime,
      visitorCount: 2,
    });

    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setSiteVisitModalOpen(false);
    }, 2000);
  };

  const handleBrochureDownload = () => {
    setBrochureSuccess(true);
    setTimeout(() => setBrochureSuccess(false), 3000);
  };

  const activeMedia = project.media[activeMediaIndex] || project.media[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 border-b border-[#E8E8E2] pb-4">
        <button onClick={() => router.navigate('/projects')} className="hover:text-neutral-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Projects</span>
        </button>
        <span>/</span>
        <button onClick={() => router.navigate(`/properties/${encodeURIComponent(project.city)}`)} className="hover:text-neutral-900">
          {project.city}
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-sm">{project.name}</span>
      </div>

      {/* Hero Media Showcase */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
          <SafeImage
            src={activeMedia?.url}
            alt={project.name}
            fallbackText={project.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
          />

          {project.media.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
              <button
                onClick={() => setActiveMediaIndex((prev) => (prev === 0 ? project.media.length - 1 : prev - 1))}
                className="pointer-events-auto p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveMediaIndex((prev) => (prev === project.media.length - 1 ? 0 : prev + 1))}
                className="pointer-events-auto p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {project.isDemo && (
              <span className="bg-neutral-900/90 text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded backdrop-blur-md">
                Demo Project
              </span>
            )}
            {project.reraVerified && (
              <span className="bg-emerald-800/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                RERA Registered: {project.reraId}
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {project.media.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {project.media.map((med, idx) => (
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

      {/* Main Grid: Details + Sticky Conversion Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Specs, Units, Overview */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span>By {project.developerName}</span>
              <span>·</span>
              <span>{project.projectType} Development</span>
              <span>·</span>
              <span>{project.status.replace('_', ' ')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#121316]">
              {project.name}
            </h1>

            <p className="text-sm font-medium text-neutral-600 mt-2">
              {project.tagline}
            </p>

            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{project.address}</span>
            </p>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="text-xs text-neutral-400">Price Range</div>
              <div className="text-3xl font-bold font-display text-[#121316] tabular-nums mt-0.5">
                {project.priceDisplay}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-[#E8E8E2]">
            <div>
              <div className="text-xs text-neutral-400">Configuration</div>
              <div className="text-xs font-bold text-neutral-900 mt-0.5">{project.unitTypes.join(', ')}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Possession Date</div>
              <div className="text-xs font-bold text-neutral-900 mt-0.5">{project.possessionDate}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Total Project Scale</div>
              <div className="text-xs font-bold text-neutral-900 mt-0.5 tabular-nums">{project.totalUnits} Units</div>
            </div>
            <div>
              <div className="text-xs text-neutral-400">Available Inventory</div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5 tabular-nums">{project.availableUnits} Units Left</div>
            </div>
          </div>

          {/* Unit Configurations Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Unit Types & Floor Plans</h3>
            <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-hidden divide-y divide-neutral-100">
              {project.configurations.map((unit, idx) => (
                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{unit.type}</h4>
                    <div className="text-xs text-neutral-500 mt-0.5 tabular-nums">
                      Carpet Area: {unit.carpetArea.toLocaleString()} sq.ft
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-neutral-400">Starting at</div>
                      <div className="text-sm font-bold text-neutral-900 font-display tabular-nums">
                        {unit.priceStartDisplay}
                      </div>
                    </div>
                    <button
                      onClick={() => setEnquiryModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#1E3A8A] border border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white rounded transition-colors"
                    >
                      Enquire Unit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Project Overview</h3>
            <p className="text-sm text-neutral-700 leading-relaxed bg-white border border-[#E8E8E2] rounded-xl p-5">
              {project.overview}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Master Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.amenities.map((amenity, idx) => (
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

          {/* Developer Card Preview */}
          {developer && (
            <div className="p-6 bg-white border border-[#E8E8E2] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                  <SafeImage
                    src={developer.logo}
                    alt={developer.name}
                    fallbackText={developer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900 font-display">{developer.name}</h4>
                  <p className="text-xs text-neutral-500">Established {developer.foundedYear} · {developer.totalProjects} Landmark Projects</p>
                </div>
              </div>
              <button
                onClick={() => router.navigate(`/developer/${developer.slug}`)}
                className="px-4 py-2 text-xs font-semibold text-neutral-800 hover:text-neutral-950 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                View Developer Profile
              </button>
            </div>
          )}
        </div>

        {/* Sticky Conversion & Booking Card */}
        <div className="sticky top-28 space-y-4">
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-5 shadow-sm space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-wider">
                Sales Experience Center
              </span>
              <h3 className="text-base font-bold text-neutral-900 font-display mt-0.5">{project.name}</h3>
              <p className="text-xs text-neutral-500 mt-1">Direct Developer Sales Representation</p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => setSiteVisitModalOpen(true)}
                className="w-full py-3 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1a337a] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Project Site Visit</span>
              </button>

              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full py-2.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Price Sheet & Inventory</span>
              </button>

              <button
                onClick={handleBrochureDownload}
                className="w-full py-2.5 text-xs font-medium text-neutral-700 border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-neutral-500" />
                <span>{brochureSuccess ? 'Downloading E-Brochure...' : 'Download Project E-Brochure'}</span>
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-neutral-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Authorized Channel</span>
              </div>
              <p>No brokerage fees or middleman charges on direct new project bookings.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
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
              <div className="py-8 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-neutral-900">Enquiry Received</h4>
                <p className="text-xs text-neutral-500">The developer’s sales team will contact you with floorplans and pricing.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-display">Enquire About {project.name}</h3>
                  <p className="text-xs text-neutral-500 mt-1">Receive floor plans, unit availability, and cost breakdown.</p>
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
                    <label className="block font-medium text-neutral-700 mb-1">Phone Number (with WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 98480 12345"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Site Visit Modal */}
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
              <div className="py-8 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-neutral-900">Site Visit Booked</h4>
                <p className="text-xs text-neutral-500">Your site visit is scheduled for {visitDate} ({visitTime}).</p>
              </div>
            ) : (
              <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 font-display">Schedule Experience Center Visit</h3>
                  <p className="text-xs text-neutral-500 mt-1">Tour the sample mock apartments and project site at {project.locality}.</p>
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
                      <label className="block font-medium text-neutral-700 mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">Slot *</label>
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
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1a337a] rounded-lg transition-colors"
                >
                  Confirm Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
