# AQREVIA — System Architecture & Product Blueprint

## 1. Executive Summary
**AQREVIA** is a modern real-estate marketplace and business growth platform. It is architected around two connected pillars:
1. **Pillar 1: Real Estate Marketplace** — Discovery, search, multi-axis filtering, property detail with high-res galleries and floorplans, new master-planned projects, verified developers, licensed broker directories, property comparison matrix, and instant lead capture (enquiries, direct calling, click-to-WhatsApp, site visits).
2. **Pillar 2: Real Estate Growth Platform** — End-to-end digital infrastructure for developers, builders, and brokerages encompassing performance advertising (Meta & Google Search), 4K architectural video production, custom microsite engineering, and sub-60 second conversational AI lead qualification.

---

## 2. Core Positioning & Brand Language
- **Brand Name**: AQREVIA
- **Primary Message**: *"Find the Right Property. Grow the Right Project."*
- **Supporting Message**: *"Where Real Estate Gets Discovered and Grown."*
- **Visual Design Constitution**:
  - Dominant Neutral Canvas (60%): Warm Ivory (`#FBFBF9`), Pure White (`#FFFFFF`).
  - Structural Surfaces (30%): Soft Neutral Gray (`#F3F3EF`), Hairline borders (`#E8E8E2`), Deep Graphite text (`#121316`).
  - Accent Budget (10%): Refined Architectural Navy (`#1E3A8A`), Restrained Champagne (`#C5A880`).
  - Anti-Slop Discipline: Zero static pill enclosures, natural editorial titles, single-line action controls, tabular numerals (`tabular-nums`) for currency and metrics.

---

## 3. Application Topology & Tech Stack
- **Frontend SPA**: React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Routing**: Clean HTML5 History API (`window.history.pushState`) without hash-bang artifacts.
- **State & Persistence**: Decoupled `DataStore` repository pattern with reactive subscription model, localStorage local cache, and zero-setup cold boot.
- **Cloud Database Ready**: Designed for direct synchronization with Firebase Firestore or PostgreSQL (Cloud SQL).
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Cards, dynamic schema injection (`RealEstateAgent` JSON-LD), and semantic HTML.

---

## 4. Role-Based Access Control (RBAC)
AQREVIA supports granular personas with tailored permission sets:
- `BUYER` / `TENANT`: Search, filter, save, compare, book site visits, send enquiries.
- `PROPERTY_OWNER`: Post free properties, preview listings, track buyer enquiries, schedule visits.
- `BROKER`: Manage multiple client listings, manage inbound leads in CRM, track deals closed.
- `DEVELOPER` / `BUILDER`: Manage multi-unit projects, download analytics, request growth marketing services.
- `CHANNEL_PARTNER`: Access exclusive developer inventories, track assigned leads and commissions.
- `ADMIN` / `SUPER_ADMIN`: Full listing moderation (approve/suspend/feature), CRM lead pipeline management, executive assignment, audit trail logging.
