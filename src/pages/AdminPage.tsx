import React, { useState } from 'react';
import { useRouter } from '../services/router';
import { useStore } from '../services/useStore';
import { PropertyStatus, LeadStatus, SiteVisitStatus } from '../types';
import {
  Shield,
  Layers,
  Users,
  CheckCircle2,
  XCircle,
  Star,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  CalendarCheck,
  Activity,
  Trash2,
  Clock,
  RotateCcw,
  Check,
  Filter,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const user = store.getCurrentUser();

  const [activeSection, setActiveSection] = useState<
    'OVERVIEW' | 'LISTINGS' | 'LEADS_CRM' | 'SITE_VISITS' | 'SERVICE_LEADS' | 'AUDIT_LOGS'
  >('OVERVIEW');

  const properties = store.getProperties();
  const projects = store.getProjects();
  const leads = store.getLeads();
  const siteVisits = store.getSiteVisits();
  const serviceEnquiries = store.getServiceEnquiries();
  const auditLogs = store.getAuditLogs();

  // Listing filter
  const [listingFilter, setListingFilter] = useState<'ALL' | PropertyStatus>('ALL');

  // Lead status filter
  const [leadStageFilter, setLeadStageFilter] = useState<'ALL' | LeadStatus>('ALL');

  // New Note Modal state for CRM
  const [activeLeadForNote, setActiveLeadForNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const filteredProperties = properties.filter((p) => {
    if (listingFilter !== 'ALL' && p.status !== listingFilter) return false;
    return true;
  });

  const filteredLeads = leads.filter((l) => {
    if (leadStageFilter !== 'ALL' && l.status !== leadStageFilter) return false;
    return true;
  });

  const handleAddNote = (leadId: string) => {
    if (noteText.trim()) {
      store.addLeadNote(leadId, noteText.trim(), user.name);
      setNoteText('');
      setActiveLeadForNote(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="bg-[#121316] text-[#F3F3EF] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">AQREVIA Admin Console</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                Super Admin Active
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Listing moderation, CRM lead pipeline, site visit logistics, and audit trails.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to initial seed data?')) {
                store.resetToSeed();
              }
            }}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-300 border border-neutral-700 rounded hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seed Catalog</span>
          </button>

          <button
            onClick={() => router.navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#2563EB] rounded transition-colors"
          >
            Live Site &rarr;
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-[#E8E8E2] overflow-x-auto pb-px">
        {[
          { id: 'OVERVIEW', label: 'Overview Metrics' },
          { id: 'LISTINGS', label: `Listing Moderation (${properties.length})` },
          { id: 'LEADS_CRM', label: `Lead CRM Pipeline (${leads.length})` },
          { id: 'SITE_VISITS', label: `Site Visits (${siteVisits.length})` },
          { id: 'SERVICE_LEADS', label: `Growth Inquiries (${serviceEnquiries.length})` },
          { id: 'AUDIT_LOGS', label: `Audit Trails (${auditLogs.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeSection === tab.id
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW SECTION */}
      {activeSection === 'OVERVIEW' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E8E8E2] rounded-xl p-5">
              <span className="text-xs text-neutral-400 block mb-1">Total Properties</span>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">
                {properties.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                {properties.filter((p) => p.status === 'PUBLISHED').length} Published Listings
              </div>
            </div>

            <div className="bg-white border border-[#E8E8E2] rounded-xl p-5">
              <span className="text-xs text-neutral-400 block mb-1">Projects Catalog</span>
              <div className="text-2xl font-bold font-display text-neutral-900 tabular-nums">
                {projects.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Institutional Developments</div>
            </div>

            <div className="bg-white border border-[#E8E8E2] rounded-xl p-5">
              <span className="text-xs text-neutral-400 block mb-1">Inbound Leads</span>
              <div className="text-2xl font-bold font-display text-[#1E3A8A] tabular-nums">
                {leads.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                {leads.filter((l) => l.status === 'QUALIFIED' || l.status === 'SITE_VISIT_SCHEDULED').length} High-Intent
              </div>
            </div>

            <div className="bg-white border border-[#E8E8E2] rounded-xl p-5">
              <span className="text-xs text-neutral-400 block mb-1">Growth Proposals</span>
              <div className="text-2xl font-bold font-display text-emerald-700 tabular-nums">
                {serviceEnquiries.length}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Developer Marketing Enquiries</div>
            </div>
          </div>

          {/* Recent Audit Activities preview */}
          <div className="bg-white border border-[#E8E8E2] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-neutral-900">Recent Platform Operations</h3>
              <button
                onClick={() => setActiveSection('AUDIT_LOGS')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline"
              >
                View Full Audit Trail &rarr;
              </button>
            </div>

            <div className="divide-y divide-neutral-100 text-xs">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-neutral-900">{log.action}</span>
                    <span className="text-neutral-500 ml-2">{log.details}</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. LISTING MODERATION */}
      {activeSection === 'LISTINGS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-display text-neutral-900">Marketplace Listings Moderation</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500">Filter status:</span>
              <select
                value={listingFilter}
                onChange={(e) => setListingFilter(e.target.value as any)}
                className="px-2.5 py-1.5 border border-neutral-200 rounded-md bg-white text-xs font-medium"
              >
                <option value="ALL">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="SUBMITTED">Submitted / Pending Review</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                  <th className="p-3">Title & Location</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Posted By</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Badges</th>
                  <th className="p-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-neutral-900 line-clamp-1">{p.title}</div>
                      <div className="text-neutral-500 text-[11px]">{p.locality}, {p.city}</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-neutral-900">{p.priceDisplay}</td>
                    <td className="p-3">
                      <div>{p.ownerName}</div>
                      <div className="text-[10px] text-neutral-400 font-medium">{p.postedByRole}</div>
                    </td>
                    <td className="p-3">
                      <select
                        value={p.status}
                        onChange={(e) => store.updatePropertyStatus(p.id, e.target.value as any, 'Admin update')}
                        className={`text-[11px] font-semibold px-2 py-1 rounded border ${
                          p.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : p.status === 'SUSPENDED'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="SUBMITTED">SUBMITTED</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => store.togglePropertyVerified(p.id)}
                          className={`p-1 rounded transition-colors ${
                            p.verified ? 'text-emerald-600 bg-emerald-50' : 'text-neutral-400 hover:text-neutral-700'
                          }`}
                          title="Toggle Title Verified"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => store.togglePropertyFeatured(p.id)}
                          className={`p-1 rounded transition-colors ${
                            p.featured ? 'text-amber-500 bg-amber-50' : 'text-neutral-400 hover:text-neutral-700'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.navigate(`/property/${p.slug}`)}
                          className="text-[#1E3A8A] font-semibold hover:underline"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete listing "${p.title}"?`)) {
                              store.deleteProperty(p.id);
                            }
                          }}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. LEAD CRM PIPELINE */}
      {activeSection === 'LEADS_CRM' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold font-display text-neutral-900">Lead CRM Pipeline</h3>
              <p className="text-xs text-neutral-500">
                Track buyer enquiries, qualification status, and site visit transitions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500">Pipeline Stage:</span>
              <select
                value={leadStageFilter}
                onChange={(e) => setLeadStageFilter(e.target.value as any)}
                className="px-2.5 py-1.5 border border-neutral-200 rounded-md bg-white"
              >
                <option value="ALL">All Stages</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="SITE_VISIT_SCHEDULED">SITE_VISIT_SCHEDULED</option>
                <option value="WON">WON</option>
                <option value="LOST">LOST</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                  <th className="p-3">Buyer Name & Phone</th>
                  <th className="p-3">Target Property / Project</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Assigned Sales</th>
                  <th className="p-3">Notes & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-neutral-900">{lead.name}</div>
                      <div className="text-neutral-500 text-[11px] font-mono">{lead.phone}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-neutral-800 line-clamp-1">
                        {lead.propertyTitle || lead.projectTitle || lead.serviceName}
                      </div>
                      <div className="text-[10px] text-neutral-400">{lead.leadType}</div>
                    </td>
                    <td className="p-3 font-mono font-medium text-neutral-900">{lead.budget || '—'}</td>
                    <td className="p-3">
                      <select
                        value={lead.status}
                        onChange={(e) => store.updateLeadStatus(lead.id, e.target.value as any)}
                        className="px-2 py-1 text-[11px] font-semibold rounded border border-neutral-200 bg-white"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="SITE_VISIT_SCHEDULED">SITE_VISIT_SCHEDULED</option>
                        <option value="SITE_VISIT_COMPLETED">SITE_VISIT_COMPLETED</option>
                        <option value="NEGOTIATION">NEGOTIATION</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        defaultValue={lead.assignedUserName || 'Unassigned'}
                        onBlur={(e) => store.assignLeadUser(lead.id, 'usr-sales', e.target.value)}
                        className="px-2 py-1 text-xs border border-neutral-200 rounded w-28 bg-white"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setActiveLeadForNote(lead.id)}
                        className="text-xs font-semibold text-[#1E3A8A] hover:underline"
                      >
                        Notes ({lead.notes.length}) +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SITE VISITS */}
      {activeSection === 'SITE_VISITS' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold font-display text-neutral-900">Site Inspections Logistics</h3>
          <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                  <th className="p-3">Prospect & Contact</th>
                  <th className="p-3">Target Property / Project</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assigned Sales Executive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {siteVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3">
                      <div className="font-semibold text-neutral-900">{v.leadName}</div>
                      <div className="text-neutral-500 text-[11px] font-mono">{v.leadPhone}</div>
                    </td>
                    <td className="p-3 font-medium text-neutral-800">{v.propertyTitle || v.projectTitle}</td>
                    <td className="p-3">
                      <div className="font-medium text-neutral-900">{v.preferredDate}</div>
                      <div className="text-[11px] text-neutral-500">{v.preferredTimeSlot}</div>
                    </td>
                    <td className="p-3">
                      <select
                        value={v.status}
                        onChange={(e) => store.updateSiteVisitStatus(v.id, e.target.value as any)}
                        className="px-2 py-1 text-[11px] font-semibold rounded border border-neutral-200 bg-white"
                      >
                        <option value="REQUESTED">REQUESTED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        defaultValue={v.assignedExecutive || 'Ananya Sharma'}
                        onBlur={(e) => store.updateSiteVisitStatus(v.id, v.status, e.target.value)}
                        className="px-2 py-1 text-xs border border-neutral-200 rounded w-32 bg-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. SERVICE LEADS */}
      {activeSection === 'SERVICE_LEADS' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold font-display text-neutral-900">Developer Growth Proposals</h3>
          <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                  <th className="p-3">Company & Contact</th>
                  <th className="p-3">City & Project</th>
                  <th className="p-3">Services Requested</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {serviceEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-neutral-900">{enq.company}</div>
                      <div className="text-neutral-500 text-[11px]">{enq.name} ({enq.role}) · {enq.phone}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-neutral-800">{enq.projectName || '—'}</div>
                      <div className="text-[11px] text-neutral-400">{enq.city}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-neutral-800 font-medium">{enq.servicesRequired.join(', ')}</div>
                    </td>
                    <td className="p-3 font-mono">{enq.budgetRange}</td>
                    <td className="p-3">
                      <select
                        value={enq.status}
                        onChange={(e) => store.updateServiceEnquiryStatus(enq.id, e.target.value as any)}
                        className="px-2 py-1 text-[11px] font-semibold rounded border border-neutral-200 bg-white"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="DISCOVERY_SCHEDULED">DISCOVERY_SCHEDULED</option>
                        <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                        <option value="CONVERTED">CONVERTED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. AUDIT LOGS */}
      {activeSection === 'AUDIT_LOGS' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold font-display text-neutral-900">Security & Administrative Audit Logs</h3>
          <div className="bg-white border border-[#E8E8E2] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 font-bold uppercase tracking-wider text-[11px] text-neutral-500">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Admin User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Resource</th>
                  <th className="p-3">Operational Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3 text-neutral-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 font-sans font-medium text-neutral-800">{log.userName}</td>
                    <td className="p-3 font-semibold text-[#1E3A8A]">{log.action}</td>
                    <td className="p-3 text-neutral-500">{log.resourceType}:{log.resourceId}</td>
                    <td className="p-3 font-sans text-neutral-700">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Note modal for Leads */}
      {activeLeadForNote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-xl space-y-4 text-xs">
            <h4 className="text-sm font-bold text-neutral-900">Add Sales Executive Note</h4>
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Spoke with client. Confirmed budget and booked site visit for weekend."
              className="w-full p-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#1E3A8A]"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveLeadForNote(null)}
                className="px-3 py-1.5 border border-neutral-200 rounded text-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddNote(activeLeadForNote)}
                className="px-4 py-1.5 bg-[#121316] text-white rounded font-semibold"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
