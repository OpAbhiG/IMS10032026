document.addEventListener('DOMContentLoaded', function () {

    const itemList = document.getElementById('itemList');
    const noItems = document.getElementById('noItems');
    const totalItemsCount = document.getElementById('totalItemsCount');

    async function loadDashboard() {
        try {
            // Fetch total count
            const statsResponse = await fetch("http://localhost:5000/api/assets/dashboard/stats");
            const statsData = await statsResponse.json();

            totalItemsCount.textContent = statsData.totalAssets || 0;

            if (statsData.totalAssets === 0) {
                noItems.style.display = 'block';
                itemList.style.display = 'none';
                return;
            }

            // Fetch all assets to build category cards
            const assetsResponse = await fetch("http://localhost:5000/api/assets");
            const assets = await assetsResponse.json();

            if (!Array.isArray(assets)) {
                throw new Error("Invalid assets response");
            }

            // Group by itemName (category)
            const grouped = {};

            assets.forEach(asset => {
                const category = asset.itemName || "Other";
                if (!grouped[category]) {
                    grouped[category] = [];
                }
                grouped[category].push(asset);
            });

            // Show cards
            itemList.innerHTML = "";
            itemList.style.display = "flex";
            noItems.style.display = "none";

            for (const category in grouped) {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-3';

                card.innerHTML = `
                    <a href="view-all-stored-items.html?category=${encodeURIComponent(category)}" class="text-decoration-none text-body">
                        <div class="card shadow-sm">
                            <div class="card-body text-center">
                                <h4 class="card-title">${category}</h4>
                                <p class="card-text">${grouped[category].length}</p>
                            </div>
                        </div>
                    </a>
                `;

                itemList.appendChild(card);
            }

        } catch (error) {
            console.error("Dashboard error:", error);
            totalItemsCount.textContent = "0";
            noItems.style.display = 'block';
            itemList.style.display = 'none';
        }
    }

    loadDashboard();
});
