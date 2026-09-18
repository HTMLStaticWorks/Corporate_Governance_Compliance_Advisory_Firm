# Veritas & Crown — Corporate Governance & Compliance Advisory Firm

A state-of-the-art, hyper-premium multi-page web application for **Veritas & Crown Governance Partners**, a top-tier international corporate governance, board advisory, SEC regulatory compliance defense, and executive ethics firm.

---

## 💎 Brand & Aesthetic Direction
- **Visual Direction**: Executive Boardroom Authority & Institutional Integrity — merging prestigious corporate legal gravitas with razor-sharp analytical clarity.
- **Color Palette (Max 3 CSS Tokens)**:
  - **Primary**: Midnight Fiduciary Navy (`#0c1a2e`)
  - **Secondary**: Imperial Slate Blue (`#1e3a5f`)
  - **Accent**: Burnished Champagne Gold (`#c59b27`)
- **Typography Scale**:
  - Headings: Variable Google Fonts **`Outfit`** & **`Cinzel`**
  - Body & UI: Variable Google Sans-Serif **`Plus Jakarta Sans`**
  - **Maximum Heading Weight Rule**: Strictly capped at `580` (no 600+, 700, 800, 900, or `bold` anywhere).
- **Uniform Global Geometry**:
  - Border Radius: `14px` uniformly across all cards, buttons, badges, inputs, and modals.
  - Box Shadows: Single unified elevation system (`0 10px 30px -4px rgba(12, 26, 46, 0.08)` in light; customized in dark mode).
- **Icons**: Phosphor Icons library for pristine, authoritative executive symbology.

---

## 📂 File Structure
```
Corporate Governance & Compliance Advisory Firm/
├── index.html            # Primary Homepage (Hero animation, Boardroom metrics, Practice areas, Governance architecture, Case studies, Testimonials, CTA)
├── home2.html            # Home 2 (Editorial split hero, Interactive Enterprise Governance & Compliance Diagnostic Engine)
├── services.html         # 6 Detailed Advisory Disciplines, Engagement Tier Matrix, Governance FAQ
├── about.html            # Institutional Heritage, Senior Partner Letter, Senior Advisory Fellows, Milestones Timeline, Ethics Charter
├── blog.html             # Governance Intelligence Hub, Search & Category Filters, Read Times, Quarterly Bulletin Newsletter
├── blog-single.html      # Comprehensive Governance Whitepaper on SEC & AI Regulations, Author Bio, Citations
├── contact.html          # Confidential Board Consultation Form with real-time validation, Global Office Directory, Hotline
├── login.html            # Centered Institutional Client Login (No theme toggle, No back button)
├── register.html         # Centered Client Entity Registration with Terms Checkbox (No theme toggle, No back button)
├── dashboard.html        # Institutional Client Governance Portal (Health Score, Regulatory Deadlines, Audit Action Logger, Vault)
├── 404.html              # Custom Institutional Docket 404 Recovery Screen
├── coming-soon.html      # Countdown Timer & VIP Boardroom Early-Access Waitlist for AI Intelligence Platform
├── assets/
│   ├── css/
│   │   ├── style.css     # Design tokens, typography rules, dark theme tokens, layout system, animations
│   │   └── rtl.css       # Dedicated RTL layout flipping overrides & left-drawer sliding
│   └── js/
│       ├── main.js       # Sticky nav, slide-drawer, theme toggle, RTL toggle, hero animation, form validation, diagnostic engine
│       └── dashboard.js  # Client portal tab switching, task toggles, interactive audit logger
├── test_suite.ps1        # Automated QA script verifying all 9 audit categories with 0 errors
└── README.md             # Project documentation and architectural overview
```

---

## 🚀 Key Features

1. **Breakpoints & Navbar Behavior (Step 4 & Step 7)**:
   - `> 1024px`: Full horizontal navbar displaying all fixed links (`Home`, `Home 2`, `Services`, `About`, `Blog`, `Contact`, `Dashboard`), RTL toggle (`⇄`), theme switcher (moon/sun), and `Login` button.
   - `≤ 1024px`: Clean mobile/tablet header with logo, RTL toggle, and hamburger button. Opens a smooth slide-in drawer from the right (or from the left in RTL mode) containing all nav links, the theme toggle, and the `Login` button.
   - `360px`: Full-width mobile drawer with touch targets ≥ 44px and zero horizontal overflow.

2. **Full Bi-Directional RTL Support (Step 5)**:
   - Easily toggled via the `⇄` icon button in the desktop navbar and mobile drawer.
   - Separate `rtl.css` overrides file.
   - Drawer slides seamlessly from the left in RTL mode; text, badges, and card baselines align cleanly.

3. **Theme Management (Step 6)**:
   - Light and Dark modes using `[data-theme="dark"]` on `<html>`.
   - Persists user preferences in `localStorage` with initial detection of system `prefers-color-scheme`.
   - Per specifications: **Auth pages (`login.html`, `register.html`) omit theme toggle and back button**.

4. **Client-Side Form Validation (Step 12)**:
   - Validates required inputs, email regex formatting, minimum 8-character password requirements, password matching on registration, and terms acceptance checkboxes.
   - Visual red borders and error messages on invalid inputs; green borders on valid inputs.
   - Submissions display an inline confirmation without reloading the page.

5. **Home 2 Interactive Diagnostic Engine (Step 9.2)**:
   - Dynamic multi-category assessment tool adjusting Independent Director Ratio, Audit Committee Cadence, ESG Maturity, and AI/Cyber Safeguards.
   - Dynamically calculates the Boardroom Governance Quality Index (0–100) with risk tier categorizations and tailored fiduciary advisory recommendations.

6. **Institutional Client Portal (`dashboard.html`)**:
   - Live Governance Health Score indicator with real-time recalculation as action items are toggled.
   - Interactive Audit Observation Logger allowing users to submit new internal compliance observations dynamically into the table.
   - Cryptographic Document Vault with simulated encrypted download notifications.

7. **Automated 9-Step QA Verification (`test_suite.ps1`)**:
   - Audits file existence, link and anchor integrity, typography font weight constraints (max 580), auth page rules, fixed navbar links, responsive breakpoint CSS rules, RTL drawer direction, and JS safe null guards.

---

## 💻 How to Run Locally

Open `index.html` directly in any modern web browser, or start a local lightweight web server:

```powershell
# Python 3
python -m http.server 8080

# Node.js npx serve
npx serve .
```

Navigate to `http://localhost:8080` to view the website.

---

## 🧪 Running Automated QA Tests

Execute the included automated PowerShell test script:

```powershell
powershell -ExecutionPolicy Bypass -File "d:\project 2\Corporate Governance & Compliance Advisory Firm\test_suite.ps1"
```
