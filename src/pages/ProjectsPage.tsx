import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { ProjectCard } from '../components/cards/ProjectCard';
import { Search, MapPin, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const allProjects = store.getProjects();

  const [selectedCity, setSelectedCity] = useState<string>(
    router.searchParams.get('city') || 'ALL'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['ALL', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'];

  const filteredProjects = allProjects.filter((proj) => {
    if (selectedCity !== 'ALL' && proj.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        proj.name.toLowerCase().includes(q) ||
        proj.locality.toLowerCase().includes(q) ||
        proj.developerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E8E8E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
            <button onClick={() => router.navigate('/')} className="hover:text-neutral-900">
              Home
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-medium">New Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#121316]">
            New Real Estate Projects & Townships
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Explore verified master-planned developments, high-rise condominiums, and gated communities.
          </p>
        </div>

        <button
          onClick={() => router.navigate('/list-project')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors whitespace-nowrap shadow-sm self-start sm:self-auto"
        >
          Submit New Project
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name, developer, or locality..."
            className="w-full pl-9 pr-4 py-2 text-xs font-medium text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-[#1E3A8A] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {city === 'ALL' ? 'All Metros' : city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E8E8E2] rounded-xl p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-neutral-900">No projects found matching criteria.</p>
          <button
            onClick={() => {
              setSelectedCity('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-[#1E3A8A] font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Developer Project Proposition Banner */}
      <div className="bg-[#F3F3EF] border border-[#E8E8E2] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">For Developers & Builders</span>
          <h3 className="text-xl font-bold font-display text-neutral-900 mt-1">
            Launching a New Real Estate Development?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            Get your project listed on AQREVIA with interactive floor plans, digital marketing funnels, and sub-60 second lead qualification.
          </p>
        </div>
        <button
          onClick={() => router.navigate('/services/project-launch-marketing')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          View Launch Solutions &rarr;
        </button>
      </div>
    </div>
  );
};
