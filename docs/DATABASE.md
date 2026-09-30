# AQREVIA — Database Architecture & Schema Specification

## 1. Storage Evaluation
AQREVIA supports two robust production storage backends:
1. **Firebase Firestore (Recommended for Serverless & Real-time Web/Mobile Apps)**:
   - Flexible JSON document model
   - Sub-second real-time listeners for CRM lead updates and site visit alerts
   - Seamless rule enforcement via `firestore.rules`
2. **PostgreSQL / Cloud SQL (Recommended for Complex Relational Reporting & Heavy SQL BI)**:
   - Strong foreign-key constraints across Organizations, Projects, Units, and Leads
   - Native PostGIS for geospatial radius and boundary querying

---

## 2. Firestore Document Collections

### `properties`
```typescript
interface Property {
  id: string; // Document ID (e.g. prop-12345)
  slug: string; // Unique SEO slug
  title: string;
  description: string;
  listingType: 'BUY' | 'RENT' | 'LEASE';
  propertyType: 'APARTMENT' | 'VILLA' | 'PLOT' | 'OFFICE' | 'RETAIL';
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'SUSPENDED';
  price: number; // in INR
  priceDisplay: string;
  maintenance?: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // sq.ft
  carpetArea?: number;
  floor?: number;
  totalFloors?: number;
  furnishing?: 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';
  facing?: 'EAST' | 'WEST' | 'NORTH' | 'SOUTH' | 'NORTH_EAST';
  possession: 'READY_TO_MOVE' | 'UNDER_CONSTRUCTION' | 'IMMEDIATE';
  amenities: string[];
  city: string;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  media: { url: string; caption?: string; isCover?: boolean; type: string }[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  postedByRole: 'OWNER' | 'BROKER' | 'BUILDER';
  verified: boolean;
  featured: boolean;
  viewCount: number;
  enquiryCount: number;
  createdAt: string; // ISO 8601
  publishedAt?: string;
  isDemo?: boolean;
}
```

### `projects`
```typescript
interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  developerId: string;
  developerName: string;
  city: string;
  locality: string;
  projectType: 'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED_USE';
  status: 'NEW_LAUNCH' | 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE';
  priceMin: number;
  priceMax: number;
  priceDisplay: string;
  unitTypes: string[];
  configurations: { type: string; carpetArea: number; priceStart: number; priceStartDisplay: string }[];
  totalUnits: number;
  availableUnits: number;
  possessionDate: string;
  reraId?: string;
  reraVerified: boolean;
  overview: string;
  amenities: string[];
  media: { url: string; isCover?: boolean; caption?: string }[];
  featured: boolean;
  verified: boolean;
  createdAt: string;
  isDemo?: boolean;
}
```

### `leads`
```typescript
interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  leadType: 'PROPERTY' | 'PROJECT' | 'GROWTH_SERVICE';
  propertyId?: string;
  propertyTitle?: string;
  projectId?: string;
  projectTitle?: string;
  serviceName?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source: 'WEBSITE' | 'WHATSAPP' | 'DIRECT_CALL' | 'CAMPAIGN';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'FOLLOW_UP' | 'SITE_VISIT_SCHEDULED' | 'WON' | 'LOST';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedUserId?: string;
  assignedUserName?: string;
  notes: { id: string; author: string; text: string; createdAt: string }[];
  createdAt: string;
  updatedAt: string;
}
```

### `site_visits`
```typescript
interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  propertyId?: string;
  projectId?: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: string;
  visitorCount: number;
  status: 'REQUESTED' | 'CONFIRMED' | 'ASSIGNED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  assignedExecutive?: string;
  createdAt: string;
}
```

### `service_enquiries` (Growth Platform)
```typescript
interface ServiceEnquiry {
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
  requirement: string;
  status: 'NEW' | 'REVIEWED' | 'DISCOVERY_SCHEDULED' | 'PROPOSAL_SENT' | 'CONVERTED';
  createdAt: string;
}
```

### `audit_logs`
```typescript
interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: 'PROPERTY' | 'PROJECT' | 'LEAD' | 'SITE_VISIT' | 'USER' | 'SERVICE';
  resourceId: string;
  details: string;
  timestamp: string;
}
```
