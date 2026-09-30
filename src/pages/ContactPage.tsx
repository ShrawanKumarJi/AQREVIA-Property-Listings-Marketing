import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { MapPin, Phone, Mail, Clock, Check, Flag } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
          Direct Support & Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900">
          Contact AQREVIA Headquarters
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Reach our marketplace operations, developer partnerships, or listing audit moderation teams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 bg-white border border-[#E8E8E2] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <MapPin className="w-4 h-4 text-[#1E3A8A]" />
              <span>Corporate Offices</span>
            </div>
            <p className="text-xs text-neutral-600">
              Tower 4, Financial District, Gachibowli, Hyderabad, Telangana 500032
            </p>
            <p className="text-xs text-neutral-500 pt-1">
              Regional Desks: Bengaluru (Whitefield) · Mumbai (BKC)
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E8E8E2] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <Phone className="w-4 h-4 text-[#1E3A8A]" />
              <span>Direct Phone</span>
            </div>
            <p className="text-xs text-neutral-800 font-mono font-medium">+91 40 6900 1200</p>
            <p className="text-[11px] text-neutral-500">Mon – Sat, 9:00 AM – 7:00 PM IST</p>
          </div>

          <div className="p-5 bg-white border border-[#E8E8E2] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <Mail className="w-4 h-4 text-[#1E3A8A]" />
              <span>Email Desks</span>
            </div>
            <p className="text-xs text-neutral-800">hello@aqrevia.com</p>
            <p className="text-xs text-neutral-600">growth@aqrevia.com (Enterprise Partnerships)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8">
          <h3 className="text-base font-bold font-display text-neutral-900 mb-4">Send a Direct Message</h3>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-neutral-900">Message Delivered</h4>
              <p className="text-xs text-neutral-500">Our customer support desk will respond within 4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
                  >
                    <option>General Marketplace Enquiry</option>
                    <option>Developer Growth Partnership</option>
                    <option>Report Inaccurate Listing</option>
                    <option>Broker Verification Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-neutral-700 leading-relaxed">
      <h1 className="text-2xl font-bold font-display text-neutral-900">AQREVIA Privacy Policy</h1>
      <p className="text-neutral-500">Effective Date: January 1, 2026</p>
      <div className="space-y-4 bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8">
        <h3 className="text-sm font-bold text-neutral-900">1. Information We Collect</h3>
        <p>
          When you submit enquiries on properties or projects, we collect contact details (name, telephone number, email) strictly to connect you with the verified advertiser, builder, or brokerage managing that listing.
        </p>

        <h3 className="text-sm font-bold text-neutral-900">2. No Third-Party Spam Resale</h3>
        <p>
          AQREVIA does not resell user phone numbers or email addresses to unrelated financial or insurance telemarketers. Lead information is transmitted exclusively to the specified property advertiser.
        </p>

        <h3 className="text-sm font-bold text-neutral-900">3. Growth Services Data</h3>
        <p>
          Enterprise real estate businesses utilizing AQREVIA performance marketing retain full ownership of their lead records, campaign creative assets, and prospective client database.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-neutral-700 leading-relaxed">
      <h1 className="text-2xl font-bold font-display text-neutral-900">AQREVIA Terms of Service</h1>
      <p className="text-neutral-500">Effective Date: January 1, 2026</p>
      <div className="space-y-4 bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8">
        <h3 className="text-sm font-bold text-neutral-900">1. Listing Integrity & Accuracy</h3>
        <p>
          Advertisers (owners, developers, and brokers) warrant that all published property specifications, pricing, RERA numbers, and photographs reflect real inventory. Fabricated listings are subject to immediate suspension.
        </p>

        <h3 className="text-sm font-bold text-neutral-900">2. Real Estate Advisory Disclaimer</h3>
        <p>
          AQREVIA operates as a discovery technology marketplace and digital growth engine. Buyers are advised to conduct independent title searches, structural inspections, and RERA verification prior to executing legal deed registrations.
        </p>
      </div>
    </div>
  );
};
