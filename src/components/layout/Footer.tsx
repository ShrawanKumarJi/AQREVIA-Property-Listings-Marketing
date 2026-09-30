import React from 'react';
import { useRouter } from '../../services/router';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="bg-[#121316] text-[#F3F3EF] border-t border-neutral-800">
      {/* Top Banner: Ecosystem Positioning */}
      <div className="border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-wider text-[#C5A880] uppercase">
              The Real Estate Growth Platform
            </span>
            <h3 className="text-2xl font-bold font-display text-white mt-1">
              Find the Right Property. Grow the Right Project.
            </h3>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              AQREVIA connects verified property buyers with developers, builders, brokers, and channel partners while providing end-to-end performance marketing, video, and AI lead automation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.navigate('/list-property')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded transition-colors"
            >
              List Your Property
            </button>
            <button
              onClick={() => router.navigate('/services')}
              className="px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded transition-colors"
            >
              Explore Growth Services
            </button>
          </div>
        </div>
      </div>

      {/* Main Link Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Properties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Properties</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => router.navigate('/properties')} className="hover:text-white transition-colors">
                  All Properties
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties?type=APARTMENT')} className="hover:text-white transition-colors">
                  Apartments & Flats
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties?type=VILLA')} className="hover:text-white transition-colors">
                  Luxury Villas
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties?type=PLOT')} className="hover:text-white transition-colors">
                  Plots & Gated Land
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties?type=OFFICE')} className="hover:text-white transition-colors">
                  Commercial Offices
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties?listing=RENT')} className="hover:text-white transition-colors">
                  Rental Properties
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Projects & Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">New Projects</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => router.navigate('/projects')} className="hover:text-white transition-colors">
                  Browse All Projects
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties/Hyderabad')} className="hover:text-white transition-colors">
                  Projects in Hyderabad
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties/Bengaluru')} className="hover:text-white transition-colors">
                  Projects in Bengaluru
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties/Mumbai')} className="hover:text-white transition-colors">
                  Projects in Mumbai
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/properties/Delhi%20NCR')} className="hover:text-white transition-colors">
                  Projects in Delhi NCR
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/developers')} className="hover:text-white transition-colors">
                  Verified Developers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Business */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">For Business</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => router.navigate('/for-business')} className="hover:text-white transition-colors">
                  Developers & Builders
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/for-business')} className="hover:text-white transition-colors">
                  Brokers & Agencies
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/for-business')} className="hover:text-white transition-colors">
                  Channel Partners
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/list-property')} className="hover:text-white transition-colors">
                  Post a Property
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/list-project')} className="hover:text-white transition-colors">
                  Submit a Project
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/admin')} className="hover:text-white transition-colors">
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Growth Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Growth Services</h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => router.navigate('/services/performance-marketing')} className="hover:text-white transition-colors">
                  Performance Marketing
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/services/website-development')} className="hover:text-white transition-colors">
                  Real Estate Websites
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/services/creative-production')} className="hover:text-white transition-colors">
                  Branding & Brochures
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/services/video-production')} className="hover:text-white transition-colors">
                  Cinematic Video Tours
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/services/ai-lead-automation')} className="hover:text-white transition-colors">
                  AI Lead Qualification
                </button>
              </li>
              <li>
                <button onClick={() => router.navigate('/services/project-launch-marketing')} className="hover:text-white transition-colors">
                  360° Project Launch
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">AQREVIA</h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Financial District, Hyderabad / Bengaluru / Mumbai</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>+91 40 6900 1200</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>hello@aqrevia.com</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => router.navigate('/about')}
                  className="inline-flex items-center gap-1 text-xs text-[#C5A880] hover:underline"
                >
                  <span>About AQREVIA Platform</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer on Demo Data */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>
            AQREVIA is a real-estate discovery and digital growth platform. Listings, developers, and project details marked with “DEMO” are realistic simulation data designed for development, testing, and platform verification.
          </p>
          <div className="flex items-center gap-6 shrink-0 text-neutral-400">
            <button onClick={() => router.navigate('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => router.navigate('/terms')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => router.navigate('/contact')} className="hover:text-white transition-colors">
              Report Listing
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-neutral-900/60 text-xs text-neutral-600 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} AQREVIA Technologies Pvt Ltd. All rights reserved.</span>
          <span className="tabular-nums font-mono text-[11px] text-neutral-500">v1.0.0-PROD</span>
        </div>
      </div>
    </footer>
  );
};
