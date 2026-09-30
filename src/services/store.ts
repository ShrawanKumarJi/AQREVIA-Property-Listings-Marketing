import {
  Property,
  Project,
  Developer,
  Broker,
  GrowthService,
  Lead,
  SiteVisit,
  ServiceEnquiry,
  User,
  UserRole,
  AuditLog,
  PropertyStatus,
  LeadStatus,
  SiteVisitStatus,
} from '../types';
import {
  INITIAL_DEVELOPERS,
  INITIAL_PROJECTS,
  INITIAL_PROPERTIES,
  INITIAL_BROKERS,
  INITIAL_GROWTH_SERVICES,
  INITIAL_LEADS,
  INITIAL_SITE_VISITS,
  INITIAL_SERVICE_ENQUIRIES,
  DEFAULT_USER,
} from '../data/seedData';

const STORAGE_KEYS = {
  PROPERTIES: 'aqrevia_properties_v1',
  PROJECTS: 'aqrevia_projects_v1',
  DEVELOPERS: 'aqrevia_developers_v1',
  BROKERS: 'aqrevia_brokers_v1',
  LEADS: 'aqrevia_leads_v1',
  SITE_VISITS: 'aqrevia_site_visits_v1',
  SERVICE_ENQUIRIES: 'aqrevia_service_enquiries_v1',
  CURRENT_USER: 'aqrevia_current_user_v1',
  COMPARE_LIST: 'aqrevia_compare_list_v1',
  AUDIT_LOGS: 'aqrevia_audit_logs_v1',
};

function loadStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return defaultValue;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export class DataStore {
  private static instance: DataStore;

  private properties: Property[] = [];
  private projects: Project[] = [];
  private developers: Developer[] = [];
  private brokers: Broker[] = [];
  private leads: Lead[] = [];
  private siteVisits: SiteVisit[] = [];
  private serviceEnquiries: ServiceEnquiry[] = [];
  private currentUser: User = DEFAULT_USER;
  private comparePropertyIds: string[] = [];
  private auditLogs: AuditLog[] = [];
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.init();
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private init() {
    this.properties = loadStorage<Property[]>(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
    this.projects = loadStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    this.developers = loadStorage<Developer[]>(STORAGE_KEYS.DEVELOPERS, INITIAL_DEVELOPERS);
    this.brokers = loadStorage<Broker[]>(STORAGE_KEYS.BROKERS, INITIAL_BROKERS);
    this.leads = loadStorage<Lead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
    this.siteVisits = loadStorage<SiteVisit[]>(STORAGE_KEYS.SITE_VISITS, INITIAL_SITE_VISITS);
    this.serviceEnquiries = loadStorage<ServiceEnquiry[]>(STORAGE_KEYS.SERVICE_ENQUIRIES, INITIAL_SERVICE_ENQUIRIES);
    this.currentUser = loadStorage<User>(STORAGE_KEYS.CURRENT_USER, DEFAULT_USER);
    this.comparePropertyIds = loadStorage<string[]>(STORAGE_KEYS.COMPARE_LIST, []);
    this.auditLogs = loadStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        userId: 'usr-superadmin',
        userName: 'Shrawan Kumar',
        action: 'SYSTEM_INITIALIZED',
        resourceType: 'SERVICE',
        resourceId: 'sys-0',
        details: 'AQREVIA platform database initialized with seed catalog.',
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- CURRENT USER & AUTH ---
  public getCurrentUser(): User {
    return this.currentUser;
  }

  public updateUserRole(newRole: UserRole, companyName?: string) {
    this.currentUser = {
      ...this.currentUser,
      role: newRole,
      companyName: companyName || this.currentUser.companyName,
    };
    saveStorage(STORAGE_KEYS.CURRENT_USER, this.currentUser);
    this.addAuditLog('USER_ROLE_SWITCH', 'USER', this.currentUser.id, `Switched active role to ${newRole}`);
    this.notify();
  }

  public toggleSaveProperty(propertyId: string) {
    const isSaved = this.currentUser.savedPropertyIds.includes(propertyId);
    const updatedIds = isSaved
      ? this.currentUser.savedPropertyIds.filter((id) => id !== propertyId)
      : [...this.currentUser.savedPropertyIds, propertyId];

    this.currentUser = {
      ...this.currentUser,
      savedPropertyIds: updatedIds,
    };
    saveStorage(STORAGE_KEYS.CURRENT_USER, this.currentUser);
    this.notify();
  }

  public isPropertySaved(propertyId: string): boolean {
    return this.currentUser.savedPropertyIds.includes(propertyId);
  }

  // --- COMPARE LIST ---
  public getComparePropertyIds(): string[] {
    return this.comparePropertyIds;
  }

  public getComparedProperties(): Property[] {
    return this.properties.filter((p) => this.comparePropertyIds.includes(p.id));
  }

  public toggleCompareProperty(propertyId: string): { added: boolean; message: string } {
    if (this.comparePropertyIds.includes(propertyId)) {
      this.comparePropertyIds = this.comparePropertyIds.filter((id) => id !== propertyId);
      saveStorage(STORAGE_KEYS.COMPARE_LIST, this.comparePropertyIds);
      this.notify();
      return { added: false, message: 'Removed from comparison' };
    }

    if (this.comparePropertyIds.length >= 4) {
      return { added: false, message: 'You can compare a maximum of 4 properties' };
    }

    this.comparePropertyIds.push(propertyId);
    saveStorage(STORAGE_KEYS.COMPARE_LIST, this.comparePropertyIds);
    this.notify();
    return { added: true, message: 'Added to comparison list' };
  }

  public clearCompare() {
    this.comparePropertyIds = [];
    saveStorage(STORAGE_KEYS.COMPARE_LIST, this.comparePropertyIds);
    this.notify();
  }

  // --- PROPERTIES CRUD & QUERIES ---
  public getProperties(): Property[] {
    return this.properties;
  }

  public getPublishedProperties(): Property[] {
    return this.properties.filter((p) => p.status === 'PUBLISHED' || p.status === 'FEATURED');
  }

  public getPropertyById(id: string): Property | undefined {
    return this.properties.find((p) => p.id === id);
  }

  public getPropertyBySlug(slug: string): Property | undefined {
    return this.properties.find((p) => p.slug === slug);
  }

  public incrementPropertyViews(propertyId: string) {
    const prop = this.properties.find((p) => p.id === propertyId);
    if (prop) {
      prop.viewCount = (prop.viewCount || 0) + 1;
      saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
      this.notify();
    }
  }

  public createProperty(property: Omit<Property, 'id' | 'createdAt' | 'viewCount' | 'enquiryCount'>): Property {
    const id = `prop-${Date.now()}`;
    const newProperty: Property = {
      ...property,
      id,
      viewCount: 0,
      enquiryCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.properties.unshift(newProperty);
    saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
    this.addAuditLog('PROPERTY_CREATED', 'PROPERTY', id, `Submitted listing "${newProperty.title}" [${newProperty.status}]`);
    this.notify();
    return newProperty;
  }

  public updateProperty(id: string, updates: Partial<Property>): Property | undefined {
    const index = this.properties.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    this.properties[index] = { ...this.properties[index], ...updates };
    saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
    this.addAuditLog('PROPERTY_UPDATED', 'PROPERTY', id, `Updated property details: ${updates.title || id}`);
    this.notify();
    return this.properties[index];
  }

  public updatePropertyStatus(id: string, status: PropertyStatus, adminNotes?: string) {
    const prop = this.properties.find((p) => p.id === id);
    if (prop) {
      const prevStatus = prop.status;
      prop.status = status;
      if (status === 'PUBLISHED' && !prop.publishedAt) {
        prop.publishedAt = new Date().toISOString();
      }
      saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
      this.addAuditLog(
        'PROPERTY_STATUS_CHANGE',
        'PROPERTY',
        id,
        `Status changed from ${prevStatus} to ${status}. ${adminNotes ? `Notes: ${adminNotes}` : ''}`
      );
      this.notify();
    }
  }

  public togglePropertyFeatured(id: string) {
    const prop = this.properties.find((p) => p.id === id);
    if (prop) {
      prop.featured = !prop.featured;
      saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
      this.addAuditLog('PROPERTY_FEATURED_TOGGLE', 'PROPERTY', id, `Featured set to ${prop.featured}`);
      this.notify();
    }
  }

  public togglePropertyVerified(id: string) {
    const prop = this.properties.find((p) => p.id === id);
    if (prop) {
      prop.verified = !prop.verified;
      saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
      this.addAuditLog('PROPERTY_VERIFIED_TOGGLE', 'PROPERTY', id, `Verified set to ${prop.verified}`);
      this.notify();
    }
  }

  public deleteProperty(id: string) {
    this.properties = this.properties.filter((p) => p.id !== id);
    saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
    this.addAuditLog('PROPERTY_DELETED', 'PROPERTY', id, `Deleted property ${id}`);
    this.notify();
  }

  // --- PROJECTS CRUD & QUERIES ---
  public getProjects(): Project[] {
    return this.projects;
  }

  public getProjectById(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  public createProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const id = `proj-${Date.now()}`;
    const newProject: Project = {
      ...project,
      id,
      createdAt: new Date().toISOString(),
    };
    this.projects.unshift(newProject);
    saveStorage(STORAGE_KEYS.PROJECTS, this.projects);
    this.addAuditLog('PROJECT_CREATED', 'PROJECT', id, `Created new project "${newProject.name}" in ${newProject.city}`);
    this.notify();
    return newProject;
  }

  // --- DEVELOPERS & BROKERS ---
  public getDevelopers(): Developer[] {
    return this.developers;
  }

  public getDeveloperBySlug(slug: string): Developer | undefined {
    return this.developers.find((d) => d.slug === slug);
  }

  public getBrokers(): Broker[] {
    return this.brokers;
  }

  public getBrokerBySlug(slug: string): Broker | undefined {
    return this.brokers.find((b) => b.slug === slug);
  }

  // --- GROWTH SERVICES ---
  public getGrowthServices(): GrowthService[] {
    return INITIAL_GROWTH_SERVICES;
  }

  public getGrowthServiceBySlug(slug: string): GrowthService | undefined {
    return INITIAL_GROWTH_SERVICES.find((s) => s.slug === slug);
  }

  // --- LEADS CRM PIPELINE ---
  public getLeads(): Lead[] {
    return this.leads;
  }

  public createLead(leadData: Omit<Lead, 'id' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>): Lead {
    const id = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...leadData,
      id,
      status: 'NEW',
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.leads.unshift(newLead);
    saveStorage(STORAGE_KEYS.LEADS, this.leads);

    // If attached to a property, increment enquiryCount
    if (leadData.propertyId) {
      const prop = this.properties.find((p) => p.id === leadData.propertyId);
      if (prop) {
        prop.enquiryCount = (prop.enquiryCount || 0) + 1;
        saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
      }
    }

    this.addAuditLog('LEAD_GENERATED', 'LEAD', id, `Inbound lead from ${newLead.name} (${newLead.leadType})`);
    this.notify();
    return newLead;
  }

  public updateLeadStatus(id: string, status: LeadStatus) {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      const prev = lead.status;
      lead.status = status;
      lead.updatedAt = new Date().toISOString();
      saveStorage(STORAGE_KEYS.LEADS, this.leads);
      this.addAuditLog('LEAD_STATUS_UPDATE', 'LEAD', id, `Lead stage moved from ${prev} to ${status}`);
      this.notify();
    }
  }

  public assignLeadUser(id: string, userId: string, userName: string) {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      lead.assignedUserId = userId;
      lead.assignedUserName = userName;
      lead.updatedAt = new Date().toISOString();
      saveStorage(STORAGE_KEYS.LEADS, this.leads);
      this.addAuditLog('LEAD_ASSIGNED', 'LEAD', id, `Assigned to executive ${userName}`);
      this.notify();
    }
  }

  public addLeadNote(id: string, text: string, authorName: string) {
    const lead = this.leads.find((l) => l.id === id);
    if (lead) {
      lead.notes.unshift({
        id: `note-${Date.now()}`,
        author: authorName,
        text,
        createdAt: new Date().toISOString(),
      });
      lead.updatedAt = new Date().toISOString();
      saveStorage(STORAGE_KEYS.LEADS, this.leads);
      this.notify();
    }
  }

  // --- SITE VISITS ---
  public getSiteVisits(): SiteVisit[] {
    return this.siteVisits;
  }

  public scheduleSiteVisit(visitData: Omit<SiteVisit, 'id' | 'status' | 'createdAt'>): SiteVisit {
    const id = `sv-${Date.now()}`;
    const newVisit: SiteVisit = {
      ...visitData,
      id,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    this.siteVisits.unshift(newVisit);
    saveStorage(STORAGE_KEYS.SITE_VISITS, this.siteVisits);
    this.addAuditLog('SITE_VISIT_BOOKED', 'SITE_VISIT', id, `Site visit requested by ${newVisit.leadName} for ${newVisit.preferredDate}`);
    this.notify();
    return newVisit;
  }

  public updateSiteVisitStatus(id: string, status: SiteVisitStatus, assignedExecutive?: string) {
    const visit = this.siteVisits.find((v) => v.id === id);
    if (visit) {
      visit.status = status;
      if (assignedExecutive) visit.assignedExecutive = assignedExecutive;
      saveStorage(STORAGE_KEYS.SITE_VISITS, this.siteVisits);
      this.addAuditLog('SITE_VISIT_STATUS_UPDATE', 'SITE_VISIT', id, `Site visit changed to ${status}`);
      this.notify();
    }
  }

  // --- SERVICE ENQUIRIES (GROWTH PLATFORM) ---
  public getServiceEnquiries(): ServiceEnquiry[] {
    return this.serviceEnquiries;
  }

  public createServiceEnquiry(enquiry: Omit<ServiceEnquiry, 'id' | 'status' | 'createdAt'>): ServiceEnquiry {
    const id = `se-${Date.now()}`;
    const newEnquiry: ServiceEnquiry = {
      ...enquiry,
      id,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.serviceEnquiries.unshift(newEnquiry);
    saveStorage(STORAGE_KEYS.SERVICE_ENQUIRIES, this.serviceEnquiries);
    this.addAuditLog('SERVICE_ENQUIRY_RECEIVED', 'SERVICE', id, `Growth service proposal requested by ${newEnquiry.company} (${newEnquiry.name})`);
    this.notify();
    return newEnquiry;
  }

  public updateServiceEnquiryStatus(id: string, status: ServiceEnquiry['status']) {
    const enq = this.serviceEnquiries.find((e) => e.id === id);
    if (enq) {
      enq.status = status;
      saveStorage(STORAGE_KEYS.SERVICE_ENQUIRIES, this.serviceEnquiries);
      this.notify();
    }
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  private addAuditLog(action: string, resourceType: AuditLog['resourceType'], resourceId: string, details: string) {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      action,
      resourceType,
      resourceId,
      details,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    if (this.auditLogs.length > 200) {
      this.auditLogs = this.auditLogs.slice(0, 200);
    }
    saveStorage(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);
  }

  // Reset to initial seed catalog if needed
  public resetToSeed() {
    this.properties = INITIAL_PROPERTIES;
    this.projects = INITIAL_PROJECTS;
    this.developers = INITIAL_DEVELOPERS;
    this.brokers = INITIAL_BROKERS;
    this.leads = INITIAL_LEADS;
    this.siteVisits = INITIAL_SITE_VISITS;
    this.serviceEnquiries = INITIAL_SERVICE_ENQUIRIES;
    this.comparePropertyIds = [];
    saveStorage(STORAGE_KEYS.PROPERTIES, this.properties);
    saveStorage(STORAGE_KEYS.PROJECTS, this.projects);
    saveStorage(STORAGE_KEYS.DEVELOPERS, this.developers);
    saveStorage(STORAGE_KEYS.BROKERS, this.brokers);
    saveStorage(STORAGE_KEYS.LEADS, this.leads);
    saveStorage(STORAGE_KEYS.SITE_VISITS, this.siteVisits);
    saveStorage(STORAGE_KEYS.SERVICE_ENQUIRIES, this.serviceEnquiries);
    saveStorage(STORAGE_KEYS.COMPARE_LIST, this.comparePropertyIds);
    this.notify();
  }
}

export const store = DataStore.getInstance();
