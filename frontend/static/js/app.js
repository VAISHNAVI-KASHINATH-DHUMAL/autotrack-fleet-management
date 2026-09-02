const dashboardSummary = {
    totalVehicles: 24,
    vehiclesInService: 18,
    maintenanceDue: 3
};

const testRuns = [
    {
        id: "TR-2026-041",
        vehicle: "BMW iX3 • S-VK 124",
        testCase: "CAN signal communication",
        result: "Passed",
        date: "31 Aug 2026"
    },
    {
        id: "TR-2026-042",
        vehicle: "Mercedes EQB • S-VK 208",
        testCase: "Battery voltage monitoring",
        result: "Failed",
        date: "30 Aug 2026"
    },
    {
        id: "TR-2026-043",
        vehicle: "Porsche Taycan • S-VK 118",
        testCase: "Brake system validation",
        result: "Passed",
        date: "30 Aug 2026"
    },
    {
        id: "TR-2026-044",
        vehicle: "Audi Q4 e-tron • S-VK 315",
        testCase: "Instrument cluster display",
        result: "Blocked",
        date: "29 Aug 2026"
    }
];

const defects = [
    {
        id: "DEF-101",
        title: "CAN signal timeout during startup",
        vehicle: "BMW iX3 • S-VK 124",
        severity: "High",
        status: "Open"
    },
    {
        id: "DEF-102",
        title: "Battery voltage warning threshold incorrect",
        vehicle: "Mercedes EQB • S-VK 208",
        severity: "Medium",
        status: "In Progress"
    },
    {
        id: "DEF-103",
        title: "Display text overlaps warning icon",
        vehicle: "Audi Q4 e-tron • S-VK 315",
        severity: "Low",
        status: "Open"
    }
];

function getResultClass(result) {
    return result.toLowerCase();
}

function getSeverityClass(severity) {
    return severity.toLowerCase();
}

function renderSummary() {
    const openDefects = defects.filter((defect) => defect.status !== "Closed");

    document.querySelector("#total-vehicles").textContent =
        dashboardSummary.totalVehicles;

    document.querySelector("#vehicles-in-service").textContent =
        dashboardSummary.vehiclesInService;

    document.querySelector("#maintenance-due").textContent =
        dashboardSummary.maintenanceDue;

    document.querySelector("#open-defects-count").textContent =
        openDefects.length;
}

function renderTestRuns() {
    const tableBody = document.querySelector("#test-runs-table-body");

    tableBody.innerHTML = testRuns
        .map(
            (testRun) => `
        <tr>
          <td>${testRun.id}</td>
          <td>${testRun.vehicle}</td>
          <td>${testRun.testCase}</td>
          <td>
            <span class="status-badge status-badge--${getResultClass(
                testRun.result
            )}">
              ${testRun.result}
            </span>
          </td>
          <td>${testRun.date}</td>
        </tr>
      `
        )
        .join("");
}

function renderDefects() {
    const defectList = document.querySelector("#defect-list");
    const openDefects = defects.filter((defect) => defect.status !== "Closed");

    if (openDefects.length === 0) {
        defectList.innerHTML =
            '<p class="empty-state">There are no open defects.</p>';
        return;
    }

    defectList.innerHTML = openDefects
        .map(
            (defect) => `
        <article class="defect-card defect-card--${getSeverityClass(
                defect.severity
            )}">
          <div class="defect-card__header">
            <div>
              <p class="defect-card__id">${defect.id}</p>
              <h3 class="defect-card__title">${defect.title}</h3>
            </div>
            <span class="severity-badge severity-badge--${getSeverityClass(
                defect.severity
            )}">
              ${defect.severity}
            </span>
          </div>
          <p class="defect-card__details">
            ${defect.vehicle} · ${defect.status}
          </p>
        </article>
      `
        )
        .join("");
}

function initializeDashboard() {
    renderSummary();
    renderTestRuns();
    renderDefects();
}

initializeDashboard();