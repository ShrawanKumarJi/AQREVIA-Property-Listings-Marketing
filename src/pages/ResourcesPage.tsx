import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { BookOpen, FileCheck, HelpCircle, ArrowRight, TrendingUp } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const router = useRouter();

  const articles = [
    {
      id: 'art-1',
      title: 'Navigating RERA Verification: A Buyer’s Checklist for Gated Communities',
      category: 'Buying Guide',
      readTime: '6 min read',
      date: 'March 2026',
      summary: 'Understanding RERA registration certificates, sanctioned building plans, encumbrance certificates, and escrow accounts before placing a token booking.',
    },
    {
      id: 'art-2',
      title: 'Hyderabad Neopolis & Kokapet: The Infrastructure Corridor Driving Commercial Yields',
      category: 'Market Intelligence',
      readTime: '8 min read',
      date: 'March 2026',
      summary: 'Analysis of Hyderabad’s golden mile growth, Trump Tower announcements, SEZ expansions, and grade-A commercial rent yields.',
    },
    {
      id: 'art-3',
      title: 'How AI Lead Qualification Reduces Real Estate Cost-per-Site-Visit by 42%',
      category: 'Developer Growth',
      readTime: '5 min read',
      date: 'February 2026',
      summary: 'Why immediate sub-60 second conversational response times on WhatsApp transform lukewarm digital form fills into confirmed weekend experience center visits.',
    },
    {
      id: 'art-4',
      title: 'Resale vs. Under-Construction: Tax Benefits, Stamp Duty, and Cash Flow Timing',
      category: 'Investment Analysis',
      readTime: '7 min read',
      date: 'February 2026',
      summary: 'Comparing capital gains tax exemptions, GST liabilities on construction stages, and rental appreciation timelines.',
    },
  ];

  const faqs = [
    {
      q: 'How does AQREVIA verify listed properties and projects?',
      a: 'We audit developer RERA registration IDs against state real estate regulatory authority registries, cross-check location coordinates, and confirm title ownership with the advertiser.',
    },
    {
      q: 'Does AQREVIA charge brokerage fees on direct developer projects?',
      a: 'No. Direct new projects listed by developers carry zero platform brokerage for property buyers.',
    },
    {
      q: 'What makes AQREVIA Growth Services different from generic ad agencies?',
      a: 'Generic agencies deliver unqualified clicks. AQREVIA delivers verified site visits by combining real estate geo-fencing, 4K architectural video production, and automated WhatsApp pre-qualification.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          AQREVIA Knowledge Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-[#121316]">
          Real Estate Insights & Market Intelligence
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Comprehensive research, regulatory guides, and growth strategies for buyers, developers, and brokers.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E8E8E2] rounded-xl p-6 hover:border-neutral-400 transition-all flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                <span className="font-semibold text-[#1E3A8A]">{item.category}</span>
                <span>·</span>
                <span>{item.readTime}</span>
                <span>·</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-lg font-bold font-display text-neutral-900 leading-snug">{item.title}</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#1E3A8A]">
              <span>Read Full Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Platform FAQs */}
      <div className="bg-white border border-[#E8E8E2] rounded-2xl p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">Frequently Asked Questions</span>
          <h2 className="text-2xl font-bold font-display text-neutral-900 mt-1">Platform Questions & Transparency</h2>
        </div>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <h4 className="text-xs font-bold text-neutral-900">{faq.q}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
