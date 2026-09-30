import React from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { SafeImage } from '../components/ui/SafeImage';
import { ProjectCard } from '../components/cards/ProjectCard';
import { PropertyCard } from '../components/cards/PropertyCard';
import { ShieldCheck, MapPin, Globe, Phone, Mail, Building, ArrowLeft } from 'lucide-react';

export const DeveloperDetailPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const slug = router.params.slug;

  const dev = store.getDeveloperBySlug(slug);

  if (!dev) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 font-display">Developer Profile Not Found</h2>
        <button
          onClick={() => router.navigate('/developers')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
        >
          Back to Developers
        </button>
      </div>
    );
  }

  const developerProjects = store.getProjects().filter((p) => p.developerId === dev.id);
  const developerProperties = store.getPublishedProperties().filter((p) => p.developerId === dev.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 border-b border-[#E8E8E2] pb-4">
        <button onClick={() => router.navigate('/developers')} className="hover:text-neutral-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Developers</span>
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium">{dev.name}</span>
      </div>

      {/* Banner & Profile Card */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-hidden shadow-xs">
        <div className="relative h-48 sm:h-64 bg-neutral-900">
          <SafeImage
            src={dev.bannerImage}
            alt={dev.name}
            fallbackText={dev.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 relative z-10">
            <div className="flex items-end gap-5">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border-4 border-white shadow-lg shrink-0">
                <SafeImage
                  src={dev.logo}
                  alt={dev.name}
                  fallbackText={dev.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">{dev.name}</h1>
                  {dev.verified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">Est. {dev.foundedYear} · Headquarters: {dev.headquarters}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${dev.contactPhone}`}
                className="px-4 py-2 text-xs font-semibold text-neutral-800 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>Call Sales</span>
              </a>
              <button
                onClick={() => router.navigate('/services/project-launch-marketing')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] rounded hover:bg-neutral-800 transition-colors shadow-xs"
              >
                Marketing Partnership
              </button>
            </div>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed max-w-4xl">{dev.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-400">Total Projects</span>
              <div className="text-base font-bold text-neutral-900 mt-0.5 tabular-nums">{dev.totalProjects}</div>
            </div>
            <div>
              <span className="text-neutral-400">Ongoing Construction</span>
              <div className="text-base font-bold text-[#1E3A8A] mt-0.5 tabular-nums">{dev.ongoingProjects}</div>
            </div>
            <div>
              <span className="text-neutral-400">Completed & Handed Over</span>
              <div className="text-base font-bold text-emerald-700 mt-0.5 tabular-nums">{dev.completedProjects}</div>
            </div>
            <div>
              <span className="text-neutral-400">Delivered Volume</span>
              <div className="text-base font-bold text-neutral-900 mt-0.5">{dev.totalDeliveredSqft}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects by this developer */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-neutral-900">
          Projects by {dev.name} ({developerProjects.length})
        </h2>
        {developerProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developerProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-neutral-500 bg-white border border-[#E8E8E2] rounded-xl">
            No active project microsites published at this time.
          </div>
        )}
      </div>

      {/* Individual units & properties by this developer */}
      {developerProperties.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-display text-neutral-900">
            Available Listed Units ({developerProperties.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {developerProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
