import React from 'react';
import { useRouter } from '../services/router';
import {
  Building2,
  Users,
  TrendingUp,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Bot,
  Video,
} from 'lucide-react';

export const ForBusinessPage: React.FC = () => {
  const router = useRouter();

  const businessPillars = [
    {
      title: 'Developers & Builders',
      desc: 'Sell out residential phases, luxury villas, and commercial developments with institutional digital marketing, 4K walkthrough videos, and AI qualified site visits.',
      cta: 'Submit New Project',
      action: () => router.navigate('/list-project'),
      features: [
        'Dedicated RERA verified project microsite',
        'Interactive unit inventory & floor plan matrix',
        'Hyper-targeted Google, Meta & YouTube ad blitzes',
        'Sub-60s WhatsApp conversational lead qualification',
        'On-site experience center visit scheduling',
      ],
    },
    {
      title: 'Brokers & Agencies',
      desc: 'Publish high-ticket resale and commercial inventory, receive direct inbound buyers, and manage client deals through our integrated CRM pipeline.',
      cta: 'Post Property Listings',
      action: () => router.navigate('/list-property'),
      features: [
        'Zero-friction multi-unit listing wizard',
        'Direct phone and click-to-WhatsApp buyer connects',
        'Verified Broker badge with RERA documentation',
        'Lead status tracking & automated follow-up reminders',
        'Micro-market locality SEO exposure',
      ],
    },
    {
      title: 'Channel Partners (CPs)',
      desc: 'Access exclusive developer project allocations, co-branded digital brochures, and synchronized lead tracking with transparent attribution.',
      cta: 'Explore Projects Network',
      action: () => router.navigate('/projects'),
      features: [
        'Direct project inventory feeds with RERA backing',
        'Digital marketing kits and localized creative assets',
        'Multi-executive lead assignment and commission logs',
        'VIP client site visit booking priority',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          AQREVIA Business Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#121316] leading-tight">
          Where Real Estate Gets Discovered and Grown.
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Standard classified portals stop at listing your inventory. AQREVIA provides the end-to-end digital infrastructure to market your property, qualify high-intent buyers, and convert site visits into bookings.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.navigate('/list-property')}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
          >
            Post Property Free &rarr;
          </button>
          <button
            onClick={() => router.navigate('/services')}
            className="px-6 py-3 text-xs font-semibold text-neutral-800 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Explore Growth Services
          </button>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {businessPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-neutral-900">{pillar.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{pillar.desc}</p>

              <div className="pt-4 border-t border-neutral-100 space-y-2.5">
                {pillar.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={pillar.action}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors text-center"
            >
              {pillar.cta}
            </button>
          </div>
        ))}
      </div>

      {/* 360 Growth Services Integration Banner */}
      <div className="bg-[#121316] text-[#F3F3EF] rounded-2xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
            The AQREVIA Growth Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Need an End-to-End Project Launch Blitz?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Our specialized team handles performance ads, 4K walkthrough video production, landing page engineering, and AI lead qualification to drive 100+ verified site visits in your first month.
          </p>
        </div>

        <button
          onClick={() => router.navigate('/services/project-launch-marketing')}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
        >
          View Project Launch Solutions &rarr;
        </button>
      </div>
    </div>
  );
};
