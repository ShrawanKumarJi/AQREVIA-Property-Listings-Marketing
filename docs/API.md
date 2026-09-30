# AQREVIA — API & Integration Architecture

## 1. Overview
AQREVIA exposes clean, decoupled service interfaces for client, server, and third-party webhook integrations.

---

## 2. Core Service Endpoints / Contracts

### `POST /api/leads`
Creates a verified inbound lead from property detail, project detail, or digital ad campaign.
- **Request Payload**:
  ```json
  {
    "name": "Vikramaditya Reddy",
    "phone": "+919848012345",
    "email": "vikram@example.com",
    "leadType": "PROPERTY",
    "propertyId": "prop-1",
    "budget": "₹ 2.5 Cr",
    "timeline": "Immediate",
    "message": "Interested in viewing unit on Saturday.",
    "source": "WEBSITE",
    "utm": {
      "source": "meta_ads",
      "campaign": "financial_district_q1"
    }
  }
  ```
- **Response**: `{ "id": "lead-12345", "status": "NEW", "createdAt": "..." }`

### `POST /api/site-visits`
Schedules an on-site property inspection or developer experience center tour.
- **Request Payload**:
  ```json
  {
    "leadId": "lead-12345",
    "leadName": "Vikramaditya Reddy",
    "leadPhone": "+919848012345",
    "propertyId": "prop-1",
    "preferredDate": "2026-10-04",
    "preferredTimeSlot": "11:00 AM – 12:00 PM",
    "visitorCount": 2
  }
  ```
- **Response**: `{ "id": "sv-9876", "status": "CONFIRMED" }`

### `POST /api/growth/service-enquiries`
Submits an institutional growth proposal request from a builder, developer, or brokerage.
- **Request Payload**:
  ```json
  {
    "company": "Skyline Infratech",
    "name": "Suresh Chandra",
    "role": "Managing Director",
    "phone": "+919811055443",
    "email": "suresh@skyline.com",
    "city": "Hyderabad",
    "businessType": "DEVELOPER",
    "projectName": "Skyline Pinnacle Phase 2",
    "servicesRequired": ["Performance Marketing", "Website Development"],
    "budgetRange": "₹ 5 Lac – ₹ 10 Lac / month",
    "timeline": "Within 14 days",
    "requirement": "Targeting 50+ qualified site visits every weekend."
  }
  ```
- **Response**: `{ "id": "se-4433", "status": "NEW" }`

---

## 3. Webhook Triggers
1. **WhatsApp Business Cloud API**: Triggered on `lead.created` to send sub-60s pre-qualification questionnaire.
2. **Sales Executive Alert**: Real-time SMS and email dispatched to assigned agent upon `site_visit.confirmed`.
3. **Admin Audit Hook**: Emits event on listing moderation or status changes.
