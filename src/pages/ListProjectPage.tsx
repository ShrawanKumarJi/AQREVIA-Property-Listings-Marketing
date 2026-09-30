import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { ProjectStatus } from '../types';
import { Building2, Check, ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export const ListProjectPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const currentUser = store.getCurrentUser();

  const [projectName, setProjectName] = useState('');
  const [tagline, setTagline] = useState('');
  const [developerName, setDeveloperName] = useState(currentUser.companyName || 'Apex Infratech');
  const [city, setCity] = useState('Hyderabad');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [projectType, setProjectType] = useState<'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED_USE'>('RESIDENTIAL');
  const [status, setStatus] = useState<ProjectStatus>('UNDER_CONSTRUCTION');
  const [priceMin, setPriceMin] = useState(25000000);
  const [priceMax, setPriceMax] = useState(65000000);
  const [unitTypes, setUnitTypes] = useState('3 BHK Luxury, 4 BHK Sky Villa');
  const [totalUnits, setTotalUnits] = useState(140);
  const [availableUnits, setAvailableUnits] = useState(38);
  const [possessionDate, setPossessionDate] = useState('December 2027');
  const [reraId, setReraId] = useState('P02400009876');
  const [overview, setOverview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !locality) return;

    const slug = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;

    store.createProject({
      name: projectName,
      slug,
      tagline: tagline || `Luxury ${projectType.toLowerCase()} development in ${locality}`,
      developerId: 'dev-custom',
      developerName,
      city,
      locality,
      address: address || `${locality}, ${city}`,
      latitude: 17.415,
      longitude: 78.345,
      projectType,
      status,
      priceMin: Number(priceMin),
      priceMax: Number(priceMax),
      priceDisplay: `₹ ${(priceMin / 10000000).toFixed(2)} Cr – ${(priceMax / 10000000).toFixed(2)} Cr`,
      unitTypes: unitTypes.split(',').map((s) => s.trim()),
      configurations: [
        {
          type: '3 BHK Classic',
          carpetArea: 2100,
          priceStart: Number(priceMin),
          priceStartDisplay: `₹ ${(priceMin / 10000000).toFixed(2)} Cr`,
        },
      ],
      totalUnits: Number(totalUnits),
      availableUnits: Number(availableUnits),
      possessionDate,
      reraId,
      reraVerified: true,
      overview: overview || `${projectName} is a signature architectural landmark in ${locality}, ${city}.`,
      amenities: ['Clubhouse', 'Swimming Pool', 'EV Charging', '24x7 Security', 'Landscaped Gardens'],
      media: [
        {
          url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
          caption: 'Project elevation',
          isCover: true,
          type: 'image',
        },
      ],
      featured: false,
      verified: true,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-display text-neutral-900">Project Submitted Successfully</h2>
          <p className="text-xs text-neutral-600 max-w-md mx-auto">
            Your project has been registered into the AQREVIA directory. Review and launch campaign services at any time.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => router.navigate('/projects')}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#121316] rounded"
          >
            View Projects Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#E8E8E2] pb-6">
        <button onClick={() => router.navigate('/for-business')} className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>For Business</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-neutral-900">
          Submit New Real Estate Project
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Create an official project profile and enable digital launch marketing funnels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Sovereign Sky Towers"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Developer / Builder Brand *</label>
            <input
              type="text"
              required
              value={developerName}
              onChange={(e) => setDeveloperName(e.target.value)}
              placeholder="e.g. Prestige Group"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-neutral-700 mb-1">Tagline / Key Hook</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Ultra-Luxury 4 & 5 BHK Sky Mansions with Panoramic Lake Views"
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">City *</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-white"
            >
              <option>Hyderabad</option>
              <option>Bengaluru</option>
              <option>Mumbai</option>
              <option>Delhi NCR</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-neutral-700 mb-1">Locality *</label>
            <input
              type="text"
              required
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g. Neopolis, Kokapet"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Min Price (INR)</label>
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Max Price (INR)</label>
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">RERA Number</label>
            <input
              type="text"
              value={reraId}
              onChange={(e) => setReraId(e.target.value)}
              placeholder="e.g. P02400006789"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Unit Configurations (comma separated)</label>
            <input
              type="text"
              value={unitTypes}
              onChange={(e) => setUnitTypes(e.target.value)}
              placeholder="e.g. 3 BHK, 4 BHK Sky Villa"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Possession Target</label>
            <input
              type="text"
              value={possessionDate}
              onChange={(e) => setPossessionDate(e.target.value)}
              placeholder="e.g. March 2028"
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-neutral-700 mb-1">Project Overview</label>
          <textarea
            rows={4}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Describe master plan, clubhouse, architectural features..."
            className="w-full px-3 py-2 border border-neutral-200 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
        >
          Submit Project For Review & Publication
        </button>
      </form>
    </div>
  );
};
