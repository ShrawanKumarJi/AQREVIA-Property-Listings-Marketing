export type UserRole =
  | 'BUYER'
  | 'TENANT'
  | 'PROPERTY_OWNER'
  | 'BROKER'
  | 'DEVELOPER'
  | 'BUILDER'
  | 'CHANNEL_PARTNER'
  | 'REAL_ESTATE_COMPANY'
  | 'SALES_USER'
  | 'SALES_MANAGER'
  | 'MARKETING_USER'
  | 'CONTENT_MANAGER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  organizationId?: string;
  companyName?: string;
  verified: boolean;
  createdAt: string;
  savedPropertyIds: string[];
  savedProjectIds: string[];
}

export type ListingType = 'BUY' | 'RENT' | 'LEASE';

export type PropertyType =
  | 'APARTMENT'
  | 'VILLA'
  | 'INDEPENDENT_HOUSE'
  | 'PLOT'
  | 'LAND'
  | 'OFFICE'
  | 'RETAIL'
  | 'WAREHOUSE'
  | 'INDUSTRIAL';

export type PropertyStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CHANGES_REQUIRED'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'FEATURED'
  | 'SUSPENDED'
  | 'EXPIRED'
  | 'ARCHIVED';

export type FurnishingStatus = 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';
export type PossessionStatus = 'READY_TO_MOVE' | 'UNDER_CONSTRUCTION' | 'IMMEDIATE';

export interface PropertyMedia {
  url: string;
  caption?: string;
  isCover?: boolean;
  type: 'image' | 'video' | 'floorplan';
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number; // in INR
  priceDisplay: string;
  rent?: number;
  deposit?: number;
  maintenance?: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // sqft
  carpetArea?: number;
  builtUpArea?: number;
  plotArea?: number;
  floor?: number;
  totalFloors?: number;
  furnishing?: FurnishingStatus;
  facing?: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTH_EAST' | 'NORTH_WEST' | 'SOUTH_EAST' | 'SOUTH_WEST';
  possession: PossessionStatus;
  propertyAge?: string;
  parking?: number;
  amenities: string[];
  city: string;
  state: string;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  media: PropertyMedia[];
  developerId?: string;
  developerName?: string;
  brokerId?: string;
  brokerName?: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  postedByRole: 'OWNER' | 'BROKER' | 'BUILDER' | 'DEVELOPER';
  verified: boolean;
  featured: boolean;
  promoted?: boolean;
  viewCount: number;
  enquiryCount: number;
  createdAt: string;
  publishedAt?: string;
  isDemo?: boolean;
}

export type ProjectStatus = 'NEW_LAUNCH' | 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE';

export interface ProjectUnitConfig {
  type: string; // e.g. "2 BHK", "3 BHK", "4 BHK Sky Villa"
  carpetArea: number; // sqft
  priceStart: number;
  priceStartDisplay: string;
  floorPlanUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  developerId: string;
  developerName: string;
  city: string;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  projectType: 'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED_USE' | 'PLOTTED';
  status: ProjectStatus;
  priceMin: number;
  priceMax: number;
  priceDisplay: string;
  unitTypes: string[];
  configurations: ProjectUnitConfig[];
  totalUnits: number;
  availableUnits: number;
  possessionDate: string;
  reraId?: string;
  reraVerified: boolean;
  overview: string;
  amenities: string[];
  media: PropertyMedia[];
  brochureUrl?: string;
  masterPlanUrl?: string;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  isDemo?: boolean;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  logo: string;
  bannerImage: string;
  tagline: string;
  description: string;
  foundedYear: number;
  headquarters: string;
  cities: string[];
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  totalDeliveredSqft: string;
  verified: boolean;
  featured: boolean;
  contactPhone: string;
  contactEmail: string;
  website: string;
  isDemo?: boolean;
}

export interface Broker {
  id: string;
  slug: string;
  name: string;
  companyName: string;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  experienceYears: number;
  activeListingsCount: number;
  totalDealsClosed: number;
  operationalLocalities: string[];
  propertySpecialties: string[];
  verified: boolean;
  reraNumber?: string;
  isDemo?: boolean;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'FOLLOW_UP'
  | 'SITE_VISIT_SCHEDULED'
  | 'SITE_VISIT_COMPLETED'
  | 'NEGOTIATION'
  | 'BOOKING'
  | 'WON'
  | 'LOST'
  | 'NURTURE';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  leadType: 'PROPERTY' | 'PROJECT' | 'GROWTH_SERVICE';
  propertyId?: string;
  propertyTitle?: string;
  projectId?: string;
  projectTitle?: string;
  serviceCategory?: string;
  serviceName?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source: 'WEBSITE' | 'WHATSAPP' | 'DIRECT_CALL' | 'CAMPAIGN';
  status: LeadStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedUserId?: string;
  assignedUserName?: string;
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export type SiteVisitStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED';

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  propertyId?: string;
  propertyTitle?: string;
  projectId?: string;
  projectTitle?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  visitorCount: number;
  status: SiteVisitStatus;
  assignedExecutive?: string;
  notes?: string;
  createdAt: string;
}

export interface GrowthService {
  id: string;
  slug: string;
  title: string;
  category:
    | 'PERFORMANCE_MARKETING'
    | 'WEB_TECH'
    | 'CREATIVE'
    | 'VIDEO'
    | 'GROWTH_SEO'
    | 'AI_AUTOMATION'
    | 'PROJECT_MARKETING';
  tagline: string;
  shortSummary: string;
  problemStatement: string;
  solutionStatement: string;
  capabilities: string[];
  deliverables: string[];
  processSteps: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
}

export interface ServiceEnquiry {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  businessType: 'DEVELOPER' | 'BUILDER' | 'BROKER' | 'CHANNEL_PARTNER' | 'REAL_ESTATE_CO';
  projectName?: string;
  servicesRequired: string[];
  budgetRange: string;
  timeline: string;
  currentWebsite?: string;
  currentMarketing?: string;
  requirement: string;
  status: 'NEW' | 'REVIEWED' | 'DISCOVERY_SCHEDULED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: 'PROPERTY' | 'PROJECT' | 'LEAD' | 'SITE_VISIT' | 'USER' | 'SERVICE';
  resourceId: string;
  details: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
}
