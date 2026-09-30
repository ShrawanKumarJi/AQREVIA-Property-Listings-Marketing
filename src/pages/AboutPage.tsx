import React from 'react';
import { useRouter } from '../services/router';
import { ShieldCheck, Building2, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          About AQREVIA
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#121316] leading-tight">
          Find the Right Property. <br />Grow the Right Project.
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          AQREVIA is a modern real-estate discovery marketplace and real-estate business growth platform. We bridge the gap between discerning property buyers and the developers, builders, brokers, and channel partners shaping modern urban landscapes.
        </p>
      </div>

      {/* Two Pillars Foundation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#E8E8E2] rounded-xl p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">Pillar One</span>
          <h2 className="text-2xl font-bold font-display text-neutral-900">The Real Estate Marketplace</h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            A fast, architectural discovery engine for residential apartments, luxury villas, commercial offices, and approved plots across prime metro corridors. Every listing is audited for title clarity, verified locations, and direct contact transparency.
          </p>
        </div>

        <div className="bg-white border border-[#E8E8E2] rounded-xl p-8 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">Pillar Two</span>
          <h2 className="text-2xl font-bold font-display text-neutral-900">The Real Estate Growth Platform</h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            A comprehensive digital infrastructure suite empowering builders and brokerages with hyper-targeted performance marketing, architectural 4K video production, custom microsite engineering, and sub-60 second AI lead qualification.
          </p>
        </div>
      </div>

      {/* Mission Standards */}
      <div className="bg-[#121316] text-[#F3F3EF] rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider">Our Core Commitment</span>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">Integrity, Speed, and Engineering Excellence</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            We reject the cluttered classified portals of the past. AQREVIA is built on clean architectural grids, verified data, zero spam, and measurable business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-800 text-xs">
          <div className="space-y-1.5">
            <div className="font-bold text-white text-sm">100% Verified Information</div>
            <p className="text-neutral-400">Strict RERA adherence and verification checks on all master project profiles.</p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-white text-sm">Zero-Brokerage Direct Connect</div>
            <p className="text-neutral-400">Direct direct access to developers and property owners with direct calling and WhatsApp.</p>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-white text-sm">Enterprise Growth Engines</div>
            <p className="text-neutral-400">End-to-end launch marketing that scales project sales and fills sales galleries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
