import React from 'react';
import { Project } from '../../types';
import { SafeImage } from '../ui/SafeImage';
import { useRouter } from '../../services/router';
import { MapPin, ShieldCheck, Calendar, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const coverImage =
    project.media.find((m) => m.isCover)?.url ||
    project.media[0]?.url ||
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80';

  return (
    <div
      onClick={() => router.navigate(`/project/${project.slug}`)}
      className="group bg-white border border-[#E8E8E2] rounded-lg overflow-hidden hover:border-neutral-400 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <SafeImage
          src={coverImage}
          alt={project.name}
          fallbackText={project.name}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {project.isDemo && (
          <div className="absolute bottom-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase">
            Demo Project
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata Header */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5 tracking-tight">
            <span className="font-medium text-neutral-700">{project.developerName}</span>
            <span aria-hidden="true">·</span>
            <span>{project.projectType}</span>
            {project.reraVerified && (
              <>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  RERA
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#121316] font-display line-clamp-1 group-hover:text-[#1E3A8A] transition-colors">
            {project.name}
          </h3>

          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
            <span>{project.locality}, {project.city}</span>
          </p>

          <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Configurations & Possession */}
        <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="line-clamp-1">{project.unitTypes.join(' · ')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Possession: <strong className="text-neutral-800">{project.possessionDate}</strong></span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-400">Starting from</div>
            <div className="text-base font-bold text-[#121316] font-display tabular-nums">
              {project.priceDisplay}
            </div>
          </div>

          <span className="text-xs font-semibold text-[#1E3A8A] group-hover:underline">
            Explore Project &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
