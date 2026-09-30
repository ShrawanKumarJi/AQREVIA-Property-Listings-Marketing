import React from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { PropertySearchBox } from '../components/search/PropertySearchBox';
import { PropertyCard } from '../components/cards/PropertyCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { SafeImage } from '../components/ui/SafeImage';
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  Bot,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Compass,
  FileCheck,
  CalendarCheck,
  BarChart3,
  Layers,
  PhoneCall,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const router = useRouter();
  const store = useStore();

  const properties = store.getPublishedProperties().slice(0, 4);
  const projects = store.getProjects().slice(0, 3);
  const developers = store.getDevelopers().slice(0, 4);

  const propertyTypes = [
    {
      type: 'APARTMENT',
      label: 'Apartments & Flats',
      desc: 'High-rise gated communities and premium condominiums',
      count: '1,240+ Units',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    },
    {
      type: 'VILLA',
      label: 'Luxury Gated Villas',
      desc: 'Private plots with clubhouses, lawns and private pools',
      count: '380+ Residences',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80',
    },
    {
      type: 'PLOT',
      label: 'Plots & Gated Land',
      desc: 'Clear title HMDA, BDA, and DTCP approved layouts',
      count: '510+ Plots',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    },
    {
      type: 'OFFICE',
      label: 'Commercial & Tech Parks',
      desc: 'Grade-A corporate office spaces and plug & play floors',
      count: '190+ Properties',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const cities = [
    {
      name: 'Hyderabad',
      state: 'Telangana',
      tag: 'HITEC City · Gachibowli · Kokapet',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Bengaluru',
      state: 'Karnataka',
      tag: 'Whitefield · Indiranagar · Sarjapur',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mumbai',
      state: 'Maharashtra',
      tag: 'Bandra · Worli · Powai',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Delhi NCR',
      state: 'NCR',
      tag: 'Golf Course Ext · Cyber City · Noida',
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 overflow-hidden border-b border-[#E8E8E2] bg-gradient-to-b from-[#F3F3EF]/60 to-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] mb-3">
              <span>Verified Real Estate Marketplace & Growth Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-[#121316] tracking-tight leading-[1.08] text-balance">
              Find the Right Property. <br className="hidden sm:block" />
              Grow the Right Project.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              AQREVIA connects property buyers and tenants with verified developers, builders, and brokers — backed by end-to-end performance marketing, video, and AI lead automation.
            </p>
          </div>

          {/* Embedded Property Search Engine */}
          <div className="relative z-10 max-w-5xl">
            <PropertySearchBox />
          </div>

          {/* Trust Value Proof Strip (Adjacent to Hero Claim) */}
          <div className="mt-10 pt-6 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-neutral-700">
            <div>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">100%</div>
              <div className="text-xs text-neutral-500 mt-0.5">RERA & Title Checked Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">&lt; 60s</div>
              <div className="text-xs text-neutral-500 mt-0.5">Automated Lead Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">360°</div>
              <div className="text-xs text-neutral-500 mt-0.5">End-to-End Digital Growth Suite</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">Direct</div>
              <div className="text-xs text-neutral-500 mt-0.5">Direct Developer & Owner Connect</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Curated Discovery</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
              Featured Residential & Commercial Properties
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Hand-verified properties with direct owner and licensed broker contacts.
            </p>
          </div>
          <button
            onClick={() => router.navigate('/properties')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 3. NEW PROJECTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Major Developments</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
              New Landmark Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Gated communities and high-rise developments from top institutional builders.
            </p>
          </div>
          <button
            onClick={() => router.navigate('/projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. BROWSE BY PROPERTY TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Asset Classes</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
            Browse by Property Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((item) => (
            <div
              key={item.type}
              onClick={() => router.navigate(`/properties?type=${item.type}`)}
              className="group bg-white border border-[#E8E8E2] rounded-lg overflow-hidden p-5 hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] rounded overflow-hidden mb-4 bg-neutral-100">
                <SafeImage
                  src={item.image}
                  alt={item.label}
                  fallbackText={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#1E3A8A]">{item.count}</span>
                <h3 className="text-base font-bold text-[#121316] font-display mt-0.5 group-hover:text-[#1E3A8A] transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:text-[#1E3A8A]">
                <span>Browse Inventory</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BROWSE BY TOP CITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Top Metro Markets</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
            Explore Prime Metros
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              onClick={() => router.navigate(`/properties/${encodeURIComponent(city.name)}`)}
              className="group relative rounded-lg overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer shadow-sm"
            >
              <SafeImage
                src={city.image}
                alt={city.name}
                fallbackText={city.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-xs text-neutral-300 font-medium">{city.state}</span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">{city.name}</h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{city.tag}</p>
                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white font-medium">
                  <span>View Localities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "MORE THAN A LISTING" — THE AQREVIA GROWTH ECOSYSTEM */}
      <section className="bg-[#121316] text-[#F3F3EF] py-16 sm:py-20 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-wider text-[#C5A880] uppercase">
              The Real Estate Ecosystem Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mt-2 leading-tight">
              Listing Is Only the Beginning.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
              Standard real estate portals stop at listing your project. AQREVIA provides the end-to-end digital infrastructure to market your property, qualify high-intent buyers, and convert site visits into bookings.
            </p>
          </div>

          {/* 6-Stage Ecosystem Chain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'List & Verify',
                desc: 'Publish RERA-verified project microsites with interactive floor plans.',
                icon: Layers,
              },
              {
                step: '02',
                title: 'Targeted Marketing',
                desc: 'Hyper-targeted Google, Meta, and YouTube ads calibrated for high net worth buyers.',
                icon: TrendingUp,
              },
              {
                step: '03',
                title: 'Demand Generation',
                desc: 'Generate verified inbound enquiries from active property seekers.',
                icon: Users,
              },
              {
                step: '04',
                title: 'AI Qualification',
                desc: 'Sub-60s WhatsApp screening verifies buyer budget and timeline.',
                icon: Bot,
              },
              {
                step: '05',
                title: 'Site Visit Engine',
                desc: 'Automated booking calendar schedules visits on your sales team’s agenda.',
                icon: CalendarCheck,
              },
              {
                step: '06',
                title: 'Attribution & Growth',
                desc: 'Full-funnel analytics tracking cost-per-site-visit and ROI.',
                icon: BarChart3,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-neutral-500 mb-4">
                      <span className="font-mono text-xs font-bold text-[#C5A880]">{card.step}</span>
                      <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business Call to Action Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Are you a Developer, Builder, or Brokerage?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                Get an institutional growth plan with custom lead qualification, 4K walkthrough video production, and performance ad funnels.
              </p>
            </div>
            <button
              onClick={() => router.navigate('/services')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Request a Growth Plan &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* 7. HOW AQREVIA WORKS (DUAL FLOWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Frictionless Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
            Engineered for Buyers and Real Estate Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flow 1: For Buyers / Tenants */}
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-bold text-[#1E3A8A] uppercase">Consumer Journey</span>
                <h3 className="text-xl font-bold font-display text-[#121316]">For Property Seekers</h3>
              </div>
              <Compass className="w-7 h-7 text-[#1E3A8A]" />
            </div>

            <ol className="space-y-4 text-xs text-neutral-600">
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-neutral-900">Search & Filter:</strong> Search by micro-locality, budget, BHK, possession timeline, and RERA status.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-neutral-900">Compare & Inspect:</strong> Compare floor plans, price per square foot, amenities, and developer track record side by side.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-neutral-900">Connect & Schedule Visit:</strong> Direct one-click WhatsApp connect, phone callback, or book a private site visit.
                </div>
              </li>
            </ol>

            <button
              onClick={() => router.navigate('/properties')}
              className="w-full py-2.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors text-center"
            >
              Start Searching Properties
            </button>
          </div>

          {/* Flow 2: For Real Estate Businesses */}
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-bold text-[#1E3A8A] uppercase">Enterprise Journey</span>
                <h3 className="text-xl font-bold font-display text-[#121316]">For Developers & Brokers</h3>
              </div>
              <Building2 className="w-7 h-7 text-[#1E3A8A]" />
            </div>

            <ol className="space-y-4 text-xs text-neutral-600">
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-neutral-900">List Your Inventory:</strong> Publish high-res unit configurations, brochures, and master plans.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-neutral-900">Activate Performance Growth:</strong> Deploy performance ad blitzes, 4K walkthrough video cuts, and microsites.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-900 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-neutral-900">AI Qualification & Conversion:</strong> Sub-60s WhatsApp qualification automatically filters leads into confirmed site visits.
                </div>
              </li>
            </ol>

            <button
              onClick={() => router.navigate('/for-business')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors text-center"
            >
              Explore Business Solutions
            </button>
          </div>
        </div>
      </section>

      {/* 8. FEATURED DEVELOPERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Institutional Trust</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
              Featured Developers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Leading builders with proven track records of timely delivery and architectural excellence.
            </p>
          </div>
          <button
            onClick={() => router.navigate('/developers')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline"
          >
            <span>All Developers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {developers.map((dev) => (
            <div
              key={dev.id}
              onClick={() => router.navigate(`/developer/${dev.slug}`)}
              className="group bg-white border border-[#E8E8E2] rounded-lg p-5 hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200">
                    <SafeImage
                      src={dev.logo}
                      alt={dev.name}
                      fallbackText={dev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {dev.verified && (
                    <span className="text-xs text-emerald-700 font-medium inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#121316] font-display group-hover:text-[#1E3A8A] transition-colors">
                  {dev.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">Est. {dev.foundedYear} · {dev.headquarters}</p>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{dev.tagline}</p>
              </div>

              <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                <span>{dev.totalProjects} Landmark Projects</span>
                <span className="text-[#1E3A8A] font-semibold group-hover:underline">Portfolio &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3F3EF] border border-[#E8E8E2] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wider">Start Today</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] mt-1">
              Ready to Discover or List Your Real Estate?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Join thousands of buyers finding verified properties, or partner with AQREVIA to scale project sales and accelerate lead acquisition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.navigate('/list-property')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
            >
              List Your Property Free
            </button>
            <button
              onClick={() => router.navigate('/services')}
              className="px-6 py-3 text-xs font-semibold text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 rounded-lg transition-colors"
            >
              Schedule Growth Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
