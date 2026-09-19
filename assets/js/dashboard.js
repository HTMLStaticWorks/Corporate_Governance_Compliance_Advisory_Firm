/**
 * ==========================================================================
 * VERITAS & CROWN — CORPORATE GOVERNANCE & COMPLIANCE ADVISORY FIRM
 * Client Governance Portal Script (assets/js/dashboard.js)
 * Interactive metrics, task status toggling, audit finding logging & document vault
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initSidebarToggle();
  initTaskCheckboxes();
  initAuditFindingLogger();
  initVaultDownloads();
});

/* --------------------------------------------------------------------------
   1. DASHBOARD TAB NAVIGATION & SIDEBAR MENU TOGGLE
   -------------------------------------------------------------------------- */
function initDashboardTabs() {
  const dashNavBtns = document.querySelectorAll('.dash-nav-btn');
  const dashPanels = document.querySelectorAll('.dash-panel');

  if (!dashNavBtns.length || !dashPanels.length) return;

  dashNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('data-target');

      dashNavBtns.forEach(b => b.classList.remove('active'));
      dashPanels.forEach(p => p.classList.remove('active'));

      document.querySelectorAll(`.dash-nav-btn[data-target="${targetPanelId}"]`).forEach(b => b.classList.add('active'));

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById('dashSidebarToggle');
  const sidebar = document.getElementById('dashSidebar');
  const closeBtn = document.getElementById('dashSidebarClose');
  const backdrop = document.getElementById('dashSidebarBackdrop');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  const navBtns = sidebar.querySelectorAll('.dash-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. ACTION ITEM STATUS TOGGLES & HEALTH SCORE CALCULATION
   -------------------------------------------------------------------------- */
function initTaskCheckboxes() {
  const checkboxes = document.querySelectorAll('.action-item-checkbox');
  if (!checkboxes.length) return;

  const scoreEl = document.getElementById('dashComplianceScore');
  const totalTasks = checkboxes.length;

  function updateComplianceMetrics() {
    let completedCount = 0;
    checkboxes.forEach(cb => {
      const row = cb.closest('tr');
      const statusBadge = row ? row.querySelector('.task-status-badge') : null;

      if (cb.checked) {
        completedCount++;
        if (row) row.style.opacity = '0.65';
        if (statusBadge) {
          statusBadge.className = 'badge badge-low task-status-badge';
          statusBadge.innerHTML = '<i class="ph ph-check"></i> Resolved';
        }
      } else {
        if (row) row.style.opacity = '1';
        if (statusBadge) {
          statusBadge.className = 'badge badge-medium task-status-badge';
          statusBadge.innerHTML = '<i class="ph ph-clock"></i> In Remediation';
        }
      }
    });

    if (scoreEl) {
      // Base score 80 + percentage of completed tasks up to 100
      const calculated = Math.min(100, Math.round(80 + (completedCount / totalTasks) * 20));
      scoreEl.textContent = `${calculated}%`;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateComplianceMetrics);
  });
}

/* --------------------------------------------------------------------------
   3. AUDIT FINDING LOGGER (INTERACTIVE SUBMISSION)
   -------------------------------------------------------------------------- */
function initAuditFindingLogger() {
  const form = document.getElementById('logFindingForm');
  const tableBody = document.getElementById('auditFindingsTableBody');
  const alertEl = document.getElementById('findingSuccessAlert');

  if (!form || !tableBody) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('findingTitle').value.trim();
    const regulation = document.getElementById('findingReg').value;
    const severity = document.getElementById('findingSeverity').value;
    const committee = document.getElementById('findingCommittee').value;

    if (!title) return;

    let badgeClass = 'badge-medium';
    if (severity === 'Critical') badgeClass = 'badge-critical';
    if (severity === 'High') badgeClass = 'badge-high';
    if (severity === 'Low') badgeClass = 'badge-low';

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td><input type="checkbox" class="action-item-checkbox" style="width: 18px; height: 18px;"></td>
      <td><strong>${title}</strong><div style="font-size: 0.8rem; color: var(--color-text-subtle);">Ref: VCG-2026-${Math.floor(1000 + Math.random() * 9000)}</div></td>
      <td>${regulation}</td>
      <td>${committee}</td>
      <td><span class="badge ${badgeClass}">${severity}</span></td>
      <td>${dateStr}</td>
      <td><span class="badge badge-medium task-status-badge"><i class="ph ph-clock"></i> In Remediation</span></td>
    `;

    tableBody.insertBefore(newRow, tableBody.firstChild);

    // Rebind checkboxes
    initTaskCheckboxes();

    if (alertEl) {
      alertEl.style.display = 'flex';
      setTimeout(() => { alertEl.style.display = 'none'; }, 4000);
    }

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   4. DOCUMENT VAULT DOWNLOAD SIMULATION
   -------------------------------------------------------------------------- */
function initVaultDownloads() {
  const downloadBtns = document.querySelectorAll('.vault-download-btn');
  const toast = document.getElementById('vaultDownloadToast');

  if (!downloadBtns.length) return;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc') || 'Board Governance Document';

      if (toast) {
        toast.innerHTML = `<i class="ph ph-lock-key-open" style="font-size: 1.3rem; color: var(--color-accent);"></i> Securely decrypted & initiated download: <strong>${docName}</strong>`;
        toast.style.display = 'flex';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 3500);
      } else {
        alert(`Securely decrypted and initiated download: ${docName}`);
      }
    });
  });
}
