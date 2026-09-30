import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { ShieldCheck, MapPin, Phone, Mail, Award, Search, ArrowRight } from 'lucide-react';

export const BrokersPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const brokers = store.getBrokers();
  const [search, setSearch] = useState('');

  const filtered = brokers.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.companyName.toLowerCase().includes(q) ||
      b.operationalLocalities.some((l) => l.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-[#E8E8E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1">
            <button onClick={() => router.navigate('/')} className="hover:text-neutral-900">Home</button> / <span className="text-neutral-900 font-medium">Brokers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316]">
            Licensed Real Estate Brokers & Advisories
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Connect with verified, RERA-compliant property consultants across major micro-markets.
          </p>
        </div>

        <button
          onClick={() => router.navigate('/for-business')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors whitespace-nowrap shadow-sm self-start sm:self-auto"
        >
          Join as Verified Broker
        </button>
      </div>

      <div className="bg-white border border-[#E8E8E2] rounded-xl p-3 max-w-md">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search broker by name, company, or locality..."
            className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 border-none focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((broker) => (
          <div
            key={broker.id}
            className="bg-white border border-[#E8E8E2] rounded-xl p-6 hover:border-neutral-400 transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <SafeImage
                      src={broker.avatar}
                      alt={broker.name}
                      fallbackText={broker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-neutral-900 font-display">{broker.name}</h3>
                      {broker.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="text-xs text-neutral-500 font-medium">{broker.companyName}</div>
                    {broker.reraNumber && (
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">RERA: {broker.reraNumber}</div>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="font-bold text-neutral-900 tabular-nums">{broker.totalDealsClosed}+</span>
                  <div className="text-[10px] text-neutral-400">Deals Closed</div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mt-4 leading-relaxed line-clamp-2">
                {broker.bio}
              </p>

              <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Operating Localities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {broker.operationalLocalities.map((loc, idx) => (
                      <span key={idx} className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[11px]">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${broker.phone}`}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-800 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${broker.phone.replace(/\D/g, '')}?text=Hi,%20I%20found%20your%20profile%20on%20AQREVIA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-300 rounded hover:bg-emerald-50 transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => router.navigate('/properties')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline"
              >
                View {broker.activeListingsCount} Listings &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
