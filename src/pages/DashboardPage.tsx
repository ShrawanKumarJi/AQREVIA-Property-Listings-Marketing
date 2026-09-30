import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { PropertyCard } from '../components/cards/PropertyCard';
import {
  User,
  Heart,
  Scale,
  CalendarCheck,
  MessageSquare,
  Building,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const user = store.getCurrentUser();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SAVED' | 'ENQUIRIES' | 'VISITS' | 'MY_LISTINGS'>('OVERVIEW');

  // Queries
  const allProperties = store.getProperties();
  const savedProperties = allProperties.filter((p) => user.savedPropertyIds.includes(p.id));
  const myListedProperties = allProperties.filter((p) => p.ownerId === user.id || p.ownerName.includes(user.name));
  const myLeads = store.getLeads().filter((l) => l.name === user.name || l.email === user.email || l.assignedUserId === user.id);
  const mySiteVisits = store.getSiteVisits().filter((v) => v.leadName === user.name || v.leadEmail === user.email || v.assignedExecutive === user.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workspace Header */}
      <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#121316] text-white flex items-center justify-center font-bold text-lg font-display">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-neutral-900">{user.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E3A8A]/10 text-[#1E3A8A] px-2 py-0.5 rounded">
                {user.role.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">{user.email} · {user.companyName || 'Verified AQREVIA Account'}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => router.navigate('/list-property')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#121316] hover:bg-neutral-800 rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List New Property</span>
          </button>
          <button
            onClick={() => router.navigate('/properties')}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 border border-neutral-300 hover:bg-neutral-50 rounded transition-colors"
          >
            Explore Marketplace
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E8E2] overflow-x-auto pb-px">
        {[
          { id: 'OVERVIEW', label: 'Workspace Overview' },
          { id: 'SAVED', label: `Saved Properties (${savedProperties.length})` },
          { id: 'MY_LISTINGS', label: `My Listings (${myListedProperties.length})` },
          { id: 'ENQUIRIES', label: `Enquiries (${myLeads.length})` },
          { id: 'VISITS', label: `Site Visits (${mySiteVisits.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E8E8E2] p-5 rounded-xl">
              <span className="text-xs text-neutral-400 block mb-1">Saved Properties</span>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">
                {savedProperties.length}
              </div>
            </div>
            <div className="bg-white border border-[#E8E8E2] p-5 rounded-xl">
              <span className="text-xs text-neutral-400 block mb-1">Active Listings</span>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">
                {myListedProperties.length}
              </div>
            </div>
            <div className="bg-white border border-[#E8E8E2] p-5 rounded-xl">
              <span className="text-xs text-neutral-400 block mb-1">Inbound Enquiries</span>
              <div className="text-2xl font-bold font-display text-[#1E3A8A] tabular-nums">
                {myLeads.length}
              </div>
            </div>
            <div className="bg-white border border-[#E8E8E2] p-5 rounded-xl">
              <span className="text-xs text-neutral-400 block mb-1">Scheduled Site Visits</span>
              <div className="text-2xl font-bold font-display text-emerald-700 tabular-nums">
                {mySiteVisits.length}
              </div>
            </div>
          </div>

          {/* Recent Saved Properties preview */}
          {savedProperties.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-neutral-900">Saved Properties</h3>
                <button
                  onClick={() => setActiveTab('SAVED')}
                  className="text-xs font-semibold text-[#1E3A8A] hover:underline"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {savedProperties.slice(0, 3).map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}

          {/* Scheduled Site Visits List */}
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-neutral-900">Upcoming Site Inspections</h3>
            {mySiteVisits.length > 0 ? (
              <div className="divide-y divide-neutral-100 text-xs">
                {mySiteVisits.map((v) => (
                  <div key={v.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-neutral-900">{v.propertyTitle || v.projectTitle}</div>
                      <div className="text-neutral-500 mt-0.5">
                        Scheduled for: <strong>{v.preferredDate}</strong> ({v.preferredTimeSlot})
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">No scheduled site visits at this time.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Saved */}
      {activeTab === 'SAVED' && (
        <div>
          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {savedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-neutral-500 bg-white border border-[#E8E8E2] rounded-xl">
              You have not saved any properties yet.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Listings */}
      {activeTab === 'MY_LISTINGS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-neutral-900">
              Listings Posted by You ({myListedProperties.length})
            </h3>
            <button
              onClick={() => router.navigate('/list-property')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#121316] rounded"
            >
              + Post New
            </button>
          </div>

          {myListedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {myListedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-neutral-500 bg-white border border-[#E8E8E2] rounded-xl space-y-3">
              <p>You have not posted any properties yet.</p>
              <button
                onClick={() => router.navigate('/list-property')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded"
              >
                Post Your First Property Free
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Enquiries */}
      {activeTab === 'ENQUIRIES' && (
        <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-neutral-900">Inbound Enquiries</h3>
          {myLeads.length > 0 ? (
            <div className="divide-y divide-neutral-100 text-xs">
              {myLeads.map((lead) => (
                <div key={lead.id} className="py-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">{lead.name}</span>
                    <span className="text-[10px] font-semibold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded">
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-neutral-500">{lead.propertyTitle || lead.projectTitle}</div>
                  <p className="text-neutral-700 italic pt-1">{lead.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">No active enquiries received.</p>
          )}
        </div>
      )}

      {/* Tab 5: Site Visits */}
      {activeTab === 'VISITS' && (
        <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-neutral-900">Scheduled Site Visits</h3>
          {mySiteVisits.length > 0 ? (
            <div className="divide-y divide-neutral-100 text-xs">
              {mySiteVisits.map((v) => (
                <div key={v.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-neutral-900">{v.propertyTitle || v.projectTitle}</div>
                    <div className="text-neutral-500">
                      Date: {v.preferredDate} ({v.preferredTimeSlot}) · {v.visitorCount} Visitors
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded bg-emerald-100 text-emerald-800">
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500">No site visits scheduled.</p>
          )}
        </div>
      )}
    </div>
  );
};
