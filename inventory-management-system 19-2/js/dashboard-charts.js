/**
 * dashboard-charts.js
 * ────────────────────────────────────────────────────────────────
 * Renders Chart.js charts on the dashboard.
 * ✅ Does NOT modify dashboard.js
 * ✅ Uses the same API endpoint your dashboard.js already calls
 * ✅ Fully independent — just include after dashboard.js
 * ────────────────────────────────────────────────────────────────
 */

(function () {

    // ── Palette: rotate through these colors for each category ──
    const PALETTE = [
        '#0d6efd', '#20c997', '#fd7e14', '#6f42c1',
        '#e83e8c', '#17a2b8', '#ffc107', '#28a745',
        '#dc3545', '#6610f2', '#00b4d8', '#f77f00'
    ];

    // ── Helper: pick color by index (loops if more than palette length) ──
    function getColor(index, alpha = 1) {
        const hex = PALETTE[index % PALETTE.length];
        // Convert hex → rgba for alpha support
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return alpha < 1 ? `rgba(${r},${g},${b},${alpha})` : hex;
    }

    // ── Chart.js global defaults (clean, modern look) ──
    Chart.defaults.font.family = "'Poppins', 'Roboto', sans-serif";
    Chart.defaults.font.size   = 13;
    Chart.defaults.color       = '#6c757d';

    // ── Main function: fetch assets & render charts ──
    async function renderCharts() {
        try {
            const response = await fetch("http://localhost:5000/api/assets");
            const assets   = await response.json();

            if (!Array.isArray(assets) || assets.length === 0) return;

            // ── Group assets by category ──
            const grouped = {};
            assets.forEach(asset => {
                const cat = asset.itemName || "Other";
                grouped[cat] = (grouped[cat] || 0) + 1;
            });

            const labels = Object.keys(grouped);
            const values = Object.values(grouped);
            const colors = labels.map((_, i) => getColor(i));
            const colorsAlpha = labels.map((_, i) => getColor(i, 0.8));

            // Show the charts section
            const section = document.getElementById('chartsSection');
            if (section) section.style.display = 'block';

            // ── Render Donut Chart ──
            renderDonut(labels, values, colors);

            // ── Render Bar Chart ──
            renderBar(labels, values, colorsAlpha, colors);

            // ── Render legend badges ──
            renderLegend(labels, values, colors);

        } catch (err) {
            console.warn("Charts: Could not load asset data.", err);
        }
    }

    function renderDonut(labels, values, colors) {
        const loading = document.getElementById('donutLoading');
        const canvas  = document.getElementById('donutChart');
        if (!canvas) return;

        if (loading) loading.style.display = 'none';
        canvas.style.display = 'block';

        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 14,
                    hoverBorderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                animation: {
                    animateRotate: true,
                    duration: 900,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    legend: { display: false }, // We use custom badges instead
                    tooltip: {
                        backgroundColor: '#1a2f5e',
                        titleColor: '#fff',
                        bodyColor: '#cdd5e0',
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: (ctx) => {
                                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                                const pct   = ((ctx.parsed / total) * 100).toFixed(1);
                                return `  ${ctx.parsed} items (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    function renderBar(labels, values, bgColors, borderColors) {
        const loading = document.getElementById('barLoading');
        const canvas  = document.getElementById('barChart');
        if (!canvas) return;

        if (loading) loading.style.display = 'none';
        canvas.style.display = 'block';

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Items',
                    data: values,
                    backgroundColor: bgColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    borderRadius: 10,       // Rounded bar tops
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 900,
                    easing: 'easeOutBounce'
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1a2f5e',
                        titleColor: '#fff',
                        bodyColor: '#cdd5e0',
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: (ctx) => `  ${ctx.parsed.y} item${ctx.parsed.y !== 1 ? 's' : ''}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 12 },
                            maxRotation: 30
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            stepSize: 1,
                            precision: 0
                        }
                    }
                }
            }
        });
    }

    function renderLegend(labels, values, colors) {
        const container = document.getElementById('legendBadges');
        if (!container) return;

        container.innerHTML = labels.map((label, i) => `
            <a href="view-all-stored-items.html?category=${encodeURIComponent(label)}"
               class="category-badge text-decoration-none"
               style="--badge-color: ${colors[i]}">
                ${label}
                <span class="count">${values[i]}</span>
            </a>
        `).join('');
    }

    // ── Wait for DOM then render ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCharts);
    } else {
        renderCharts();
    }

})();
