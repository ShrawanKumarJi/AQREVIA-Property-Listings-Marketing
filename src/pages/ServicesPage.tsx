import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import {
  TrendingUp,
  Globe,
  Palette,
  Video,
  Bot,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Check,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const services = store.getGrowthServices();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Performance Marketing');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Managing Director / Partner');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [businessType, setBusinessType] = useState<'DEVELOPER' | 'BUILDER' | 'BROKER' | 'CHANNEL_PARTNER' | 'REAL_ESTATE_CO'>('DEVELOPER');
  const [projectName, setProjectName] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹ 3 Lac – ₹ 7 Lac / month');
  const [timeline, setTimeline] = useState('Immediate (within 14 days)');
  const [requirement, setRequirement] = useState('');
  const [success, setSuccess] = useState(false);

  const iconsMap: Record<string, any> = {
    PERFORMANCE_MARKETING: TrendingUp,
    WEB_TECH: Globe,
    CREATIVE: Palette,
    VIDEO: Video,
    AI_AUTOMATION: Bot,
    PROJECT_MARKETING: Rocket,
  };

  const handleServiceEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) return;

    store.createServiceEnquiry({
      name: contactName,
      company: companyName,
      role: contactRole,
      phone,
      email,
      city,
      businessType,
      projectName,
      servicesRequired: [selectedService],
      budgetRange,
      timeline,
      requirement: requirement || `Requested consultation for ${selectedService}`,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header & Positioning */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          360° Real Estate Growth Platform
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#121316] leading-tight">
          Where Real Estate Gets Discovered and Grown.
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          From high-converting project microsites and 4K walkthrough videos to hyper-targeted performance marketing and AI lead automation — AQREVIA builds the digital engine behind successful real estate sales.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFormOpen(true)}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
          >
            Request a Growth Plan &rarr;
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => {
          const Icon = iconsMap[svc.category] || TrendingUp;
          return (
            <div
              key={svc.id}
              onClick={() => router.navigate(`/services/${svc.slug}`)}
              className="group bg-white border border-[#E8E8E2] rounded-xl p-6 hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold font-display text-neutral-900 group-hover:text-[#1E3A8A] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs font-medium text-[#1E3A8A] mt-1">{svc.tagline}</p>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {svc.shortSummary}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1.5">
                  {svc.capabilities.slice(0, 3).map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#1E3A8A]">
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Service Enquiry Form Section */}
      <div id="enquiry-form" className="bg-white border border-[#E8E8E2] rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="max-w-xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
            Real Estate Business Growth
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900 mt-1">
            Request an Institutional Growth Plan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
            Separate from individual property leads. Tell us about your project, target launch dates, and required digital services. Our senior growth architect will schedule a strategy discovery call within 24 hours.
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">Growth Plan Requested</h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Thank you, {contactName}. We have received your requirement for {companyName}. An AQREVIA strategy director will contact you directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleServiceEnquiry} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Company / Developer Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Skyline Infratech"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Suresh Chandra"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Phone Number (Direct WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98110 55443"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="suresh@company.com"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Operating City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Hyderabad, Bengaluru, Mumbai"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Business Organization Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option value="DEVELOPER">Real Estate Developer</option>
                  <option value="BUILDER">Builder / Construction Firm</option>
                  <option value="BROKER">Brokerage / Advisory</option>
                  <option value="CHANNEL_PARTNER">Channel Partner Network</option>
                  <option value="REAL_ESTATE_CO">Real Estate Investment Firm</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Project Name (if applicable)</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Pinnacle Residences"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Primary Growth Service Needed</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option>Performance Marketing & Lead Generation</option>
                  <option>High-Converting Real Estate Websites</option>
                  <option>Branding & Creative Production</option>
                  <option>Architectural Video & Walkthroughs</option>
                  <option>AI Lead Qualification & WhatsApp CRM</option>
                  <option>360° Real Estate Project Launch Blitz</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Monthly Marketing Budget Allocation</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option>₹ 1 Lac – ₹ 3 Lac / month</option>
                  <option>₹ 3 Lac – ₹ 7 Lac / month</option>
                  <option>₹ 7 Lac – ₹ 15 Lac / month</option>
                  <option>₹ 15 Lac+ / month (Mega Township)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Launch Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                >
                  <option>Immediate (within 14 days)</option>
                  <option>Within 30–45 days</option>
                  <option>Planning Phase (2–3 months)</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-semibold text-neutral-700 mb-1">
                Specific Targets / Requirements (e.g. 50+ site visits/weekend, new phase launch, etc.)
              </label>
              <textarea
                rows={3}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="Share any details about your development, current bottlenecks, or target site visit numbers..."
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
            >
              Submit Growth Service Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
