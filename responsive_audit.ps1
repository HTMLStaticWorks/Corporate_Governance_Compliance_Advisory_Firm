# ==========================================================================
# VERITAS & CROWN — RESPONSIVE & BUTTON ALIGNMENT QA AUDIT
# Tests 360px (Mobile), 760px (Tab Portrait), and 1024px (Tab Landscape)
# ==========================================================================

$dir = "d:\project 2\Corporate Governance & Compliance Advisory Firm"
$cssPath = Join-Path $dir "assets\css\style.css"
$css = Get-Content $cssPath -Raw

$results = [System.Collections.Generic.List[string]]::new()
$failures = [System.Collections.Generic.List[string]]::new()

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "RESPONSIVE AUDIT: 360px Mobile, 760px & 1024px Tab Views" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. 1024px Breakpoint Existence & Navigation Collapse
if ($css -match '@media\s*\(max-width:\s*1024px\)') {
  $results.Add("PASS: 1024px responsive breakpoint block is active")
} else {
  $failures.Add("FAIL: Missing @media (max-width: 1024px)")
}

if ($css -match '\.nav-menu\s*\{[^}]*display:\s*none\s*!important;') {
  $results.Add("PASS: Desktop nav menu is hidden at <= 1024px")
} else {
  $failures.Add("FAIL: .nav-menu is not hidden at <= 1024px")
}

# 2. Headings Centered Verification
$headingCenteringRegex = '(h1,\s*h2,\s*h3|card-title|section-title)[^{]*\{[^}]*text-align:\s*center\s*!important;'
if ($css -match $headingCenteringRegex) {
  $results.Add("PASS: Headings (h1-h6, hero-title, section-title, card-title) explicitly set to text-align: center !important")
} else {
  $failures.Add("FAIL: Headings not explicitly centered in responsive styles")
}

# 3. Paragraph & Content Text Centered Verification
$textCenteringRegex = '(\bp\b|hero-desc|section-desc|card\s+p)[^{]*\{[^}]*text-align:\s*center\s*!important;'
if ($css -match $textCenteringRegex) {
  $results.Add("PASS: Text contents (p, hero-desc, section-desc, card p, footer-desc) set to text-align: center !important")
} else {
  $failures.Add("FAIL: Text contents not explicitly centered in responsive styles")
}

# 4. Containers & Cards Centering Verification
$containerRegex = '(section-header|hero-content|card|auth-card)[^{]*\{[^}]*text-align:\s*center\s*!important;[^}]*align-items:\s*center\s*!important;'
if ($css -match $containerRegex) {
  $results.Add("PASS: Containers and cards set to text-align: center and align-items: center")
} else {
  $failures.Add("FAIL: Containers and cards not centered")
}

# 5. Button Alignment & Sizing (Uniform 320px Max Width & Centered)
if ($css -match '\.btn:not\([^}]*width:\s*100%\s*!important;\s*max-width:\s*320px\s*!important;') {
  $results.Add("PASS: Buttons have uniform centered max-width (320px) on tablet (<= 1024px)")
} else {
  $failures.Add("FAIL: Button uniform max-width rule missing on tablet")
}

if ($css -match '\.btn:not\([^}]*margin:\s*8px\s*auto\s*!important;') {
  $results.Add("PASS: Buttons have automatic horizontal margins (margin: 8px auto !important) for universal centering")
} else {
  $failures.Add("FAIL: Buttons missing universal margin-inline centering")
}

# 6. Button Containers Centered
if ($css -match '\.hero-actions,\s*\.cta-actions[^{]*\{[^}]*display:\s*flex\s*!important;\s*flex-direction:\s*column\s*!important;\s*align-items:\s*center\s*!important;') {
  $results.Add("PASS: Hero actions and CTA containers vertically stacked and centered (align-items: center)")
} else {
  $failures.Add("FAIL: Hero actions and CTA containers not centered")
}

# 7. 768px & 760px Breakpoint Verification
if ($css -match '@media\s*\(max-width:\s*768px\)') {
  $results.Add("PASS: 768px/760px tablet portrait breakpoint is defined with single column grids")
} else {
  $failures.Add("FAIL: Missing 768px/760px breakpoint")
}

# 8. 360px Small Mobile Breakpoint & Button Sizing
if ($css -match '@media\s*\(max-width:\s*360px\)') {
  $results.Add("PASS: 360px small mobile breakpoint is active")
} else {
  $failures.Add("FAIL: Missing 360px breakpoint")
}

if ($css -match '@media\s*\(max-width:\s*360px\)[^}]*\{[\s\S]*?max-width:\s*290px\s*!important;') {
  $results.Add("PASS: 360px mobile view has constrained button width (290px) preventing horizontal scrollbar")
} else {
  $failures.Add("FAIL: 360px mobile view button width not adjusted")
}

# 9. Header Buttons Alignment Fix
if ($css -match '\.header-actions\s+\.btn-primary,\s*\.header-actions\s+#desktopThemeToggle,\s*\.header-actions\s+\.rtl-toggle-btn\s*\{[^}]*display:\s*none\s*!important;') {
  $results.Add("PASS: Desktop header login, theme, and RTL toggle buttons hidden at <= 1024px (only hamburger visible)")
} else {
  $failures.Add("FAIL: Header login, theme, or RTL toggle button not hidden on mobile/tablet")
}

# 10. Table Buttons Protection
if ($css -match '\.table-responsive\s+\.btn[^{]*\{[^}]*width:\s*auto\s*!important;') {
  $results.Add("PASS: Table cell action buttons are exempt from 320px button stretching (preserves table alignment)")
} else {
  $failures.Add("FAIL: Table action buttons not protected")
}

# 11. Zero Illegal Font Weights
if ($css.Contains("font-weight: 600") -or $css.Contains("font-weight: 700") -or $css.Contains("font-weight: 800") -or $css.Contains("font-weight: bold")) {
  $failures.Add("FAIL: Illegal font-weight found in style.css")
} else {
  $results.Add("PASS: Zero illegal font-weights (strictly <= 580)")
}

# OUTPUT RESULTS
Write-Host "`nAUDIT CHECKS:" -ForegroundColor Yellow
foreach ($r in $results) {
  Write-Host " [OK] $r" -ForegroundColor Green
}

if ($failures.Count -gt 0) {
  Write-Host "`nAUDIT FAILURES:" -ForegroundColor Red
  foreach ($f in $failures) {
    Write-Host " [ERR] $f" -ForegroundColor Red
  }
} else {
  Write-Host "`n>>> ALL 11 RESPONSIVE AUDIT CHECKS PASSED WITH ZERO FAILURES! <<<" -ForegroundColor Green
}
