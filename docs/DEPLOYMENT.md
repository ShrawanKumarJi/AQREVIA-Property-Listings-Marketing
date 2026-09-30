# AQREVIA — Deployment & Production Guide

## 1. Hosting Architecture
AQREVIA is designed for high availability and low latency with:
- **DNS / Domain**: Hostinger, Cloudflare, or Route53 (`aqrevia.com`)
- **Web Application Host**: Firebase App Hosting, Vercel, or Google Cloud Run
- **Database**: Firebase Firestore or Google Cloud SQL (PostgreSQL)
- **Object Storage**: Firebase Storage / Google Cloud Storage for 4K media and PDFs

---

## 2. Environment Setup
Clone repository and install dependencies:
```bash
npm install
```

Configure `.env`:
```env
APP_URL="https://aqrevia.com"
```

Verify build and lint:
```bash
npm run lint
npm run build
```

---

## 3. Custom Domain Configuration (Hostinger / Cloudflare)
1. Add an **A Record** pointing `@` to your designated cloud hosting IP.
2. Add a **CNAME Record** pointing `www` to `aqrevia.com`.
3. Configure SSL/TLS to *Full (Strict)*.

---

## 4. Production Security Checklist
- [x] All demo information clearly isolated with `isDemo: true` badges.
- [x] Zero API keys or secrets exposed in client bundle.
- [x] Form validation with phone, email, and XSS sanitization.
- [x] Role-Based Access Control verified on admin routes.
- [x] Single-elevation card depth, zero-pill discipline, WCAG AA contrast.
- [x] Resilient image fallback containers in place to prevent broken images.
