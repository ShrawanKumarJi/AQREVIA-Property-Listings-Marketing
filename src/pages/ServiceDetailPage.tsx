import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import {
  CheckCircle2,
  ArrowLeft,
  Check,
  TrendingUp,
  Globe,
  Palette,
  Video,
  Bot,
  Rocket,
  ChevronDown,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const slug = router.params.slug;

  const service = store.getGrowthServiceBySlug(slug);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹ 3 Lac – ₹ 7 Lac / month');
  const [requirement, setRequirement] = useState('');
  const [success, setSuccess] = useState(false);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 font-display">Service Not Found</h2>
        <button
          onClick={() => router.navigate('/services')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
        >
          Back to Growth Services
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !phone) return;

    store.createServiceEnquiry({
      name: contactName,
      company: companyName,
      role: 'Project Lead',
      phone,
      email,
      city: 'Hyderabad',
      businessType: 'DEVELOPER',
      servicesRequired: [service.title],
      budgetRange,
      timeline: 'Immediate',
      requirement: requirement || `Enquiry for ${service.title}`,
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 border-b border-[#E8E8E2] pb-4">
        <button onClick={() => router.navigate('/services')} className="hover:text-neutral-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Growth Services</span>
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium">{service.title}</span>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl space-y-4">
        <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">
          Enterprise Growth Suite
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 leading-tight">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg text-[#1E3A8A] font-medium">{service.tagline}</p>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{service.shortSummary}</p>
      </div>

      {/* Problem vs Solution Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-rose-50/50 border border-rose-100 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800">The Industry Bottleneck</span>
          <h3 className="text-base font-bold text-neutral-900">Why Typical Approaches Fail</h3>
          <p className="text-xs text-neutral-700 leading-relaxed">{service.problemStatement}</p>
        </div>

        <div className="p-6 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">The AQREVIA Solution</span>
          <h3 className="text-base font-bold text-neutral-900">Engineered Growth Architecture</h3>
          <p className="text-xs text-neutral-700 leading-relaxed">{service.solutionStatement}</p>
        </div>
      </div>

      {/* Capabilities & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold font-display text-neutral-900">Core Capabilities</h3>
          <div className="space-y-3">
            {service.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold font-display text-neutral-900">Deliverables & Scope</h3>
          <div className="space-y-3">
            {service.deliverables.map((del, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{del}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Step Process Flow */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Methodology</span>
          <h2 className="text-2xl font-bold font-display text-neutral-900 mt-0.5">Execution Process</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.processSteps.map((step) => (
            <div key={step.step} className="bg-white border border-[#E8E8E2] rounded-xl p-5 space-y-3">
              <span className="text-xs font-mono font-bold text-[#1E3A8A]">Step 0{step.step}</span>
              <h4 className="text-sm font-bold text-neutral-900">{step.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-display text-neutral-900">Frequently Asked Questions</h3>
          <div className="space-y-3 max-w-3xl">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8E8E2] space-y-1">
                <h4 className="text-xs font-bold text-neutral-900">{faq.q}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Contact Box */}
      <div className="bg-[#121316] text-[#F3F3EF] rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Ready to deploy {service.title}?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Submit your project details and request a customized growth scope.
          </p>
        </div>

        {success ? (
          <div className="py-6 text-center text-emerald-400 text-xs font-semibold">
            ✓ Request submitted successfully. Our team will contact you within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name *"
              className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white"
            />
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your Full Name *"
              className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white"
            />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone / WhatsApp *"
              className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-white"
            />
            <button
              type="submit"
              className="py-2 px-4 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded transition-colors"
            >
              Request Proposal
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
