import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { ShieldCheck, MapPin, Building, ArrowRight, Search } from 'lucide-react';

export const DevelopersPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const developers = store.getDevelopers();
  const [search, setSearch] = useState('');

  const filtered = developers.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return d.name.toLowerCase().includes(q) || d.cities.some((c) => c.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-[#E8E8E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1">
            <button onClick={() => router.navigate('/')} className="hover:text-neutral-900">Home</button> / <span className="text-neutral-900 font-medium">Developers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316]">
            Verified Real Estate Developers
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Institutional property builders with documented project delivery track records.
          </p>
        </div>

        <button
          onClick={() => router.navigate('/for-business')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors whitespace-nowrap shadow-sm self-start sm:self-auto"
        >
          Join as Developer Partner
        </button>
      </div>

      <div className="bg-white border border-[#E8E8E2] rounded-xl p-3 max-w-md">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by builder name or city..."
            className="w-full pl-9 pr-3 py-2 text-xs text-neutral-900 border-none focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dev) => (
          <div
            key={dev.id}
            onClick={() => router.navigate(`/developer/${dev.slug}`)}
            className="bg-white border border-[#E8E8E2] rounded-xl overflow-hidden hover:border-neutral-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-40 bg-neutral-900">
              <SafeImage
                src={dev.bannerImage}
                alt={dev.name}
                fallbackText={dev.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-semibold text-neutral-900">
                {dev.totalDeliveredSqft} Delivered
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 -mt-12 relative z-10">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border-2 border-white shadow-md shrink-0">
                  <SafeImage
                    src={dev.logo}
                    alt={dev.name}
                    fallbackText={dev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-8">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-bold font-display text-neutral-900">{dev.name}</h3>
                    {dev.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-neutral-500">{dev.headquarters} · Est. {dev.foundedYear}</p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {dev.description}
              </p>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="text-neutral-500">
                  <strong className="text-neutral-900 tabular-nums">{dev.totalProjects}</strong> Total Projects ({dev.ongoingProjects} Active)
                </div>
                <span className="font-semibold text-[#1E3A8A] flex items-center gap-1">
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
