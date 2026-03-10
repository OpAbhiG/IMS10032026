const API_BASE_URL = "http://localhost:5000/api/assets";
document.addEventListener('DOMContentLoaded', function () {
    const itemsTableBody = document.getElementById('itemsTableBody');
    const editItemModalElement = document.getElementById('editItemModal');
    const deleteItemModalElement = document.getElementById('deleteItemModal');
    const relocateItemModalElement = document.getElementById('relocateItemModal');
    const historyModalElement = document.getElementById('historyModal');
    const successToastElement = document.getElementById('successToast');
    const relocateToastElement = document.getElementById('relocateToast');

    // Initialize modals and toasts with error handling
    let editItemModal, deleteItemModal, relocateItemModal, historyModal, successToast, relocateToast;
    try {
        editItemModal = new bootstrap.Modal(editItemModalElement, { backdrop: 'static' });
        deleteItemModal = new bootstrap.Modal(deleteItemModalElement, { backdrop: 'static' });
        relocateItemModal = new bootstrap.Modal(relocateItemModalElement, { backdrop: 'static' });
        historyModal = new bootstrap.Modal(historyModalElement, { backdrop: 'static' });
        successToast = new bootstrap.Toast(successToastElement, { autohide: true, delay: 5000 });
        relocateToast = new bootstrap.Toast(relocateToastElement, { autohide: true, delay: 5000 });
    } catch (error) {
        console.error('Error initializing Bootstrap components:', error);
        alert('Failed to initialize components. Please refresh the page.');
        return;
    }

    const editItemForm = document.getElementById('editItemForm');
    const relocateItemForm = document.getElementById('relocateItemForm');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const saveRelocateBtn = document.getElementById('saveRelocateBtn');
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    const sortableHeaders = document.querySelectorAll('.sortable');

    // Load items from localStorage
    // Load items from backend API
    let items = {}; // category => array


    async function fetchItems() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryFilter = urlParams.get('category'); // optional category filter

            const response = await fetch(API_BASE_URL);

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            const data = await response.json();
            console.log('Backend response:', data); // Debug: check what comes from backend

            if (!Array.isArray(data)) {
                throw new Error("Expected an array from backend");
            }

            items = {};

            data.forEach(asset => {
                const category = asset.itemName || 'Other';
                if (!items[category]) items[category] = [];
                items[category].push({
                    id: asset.id,
                    itemName: asset.itemName,
                    model: asset.model,
                    serialNumber: asset.serialNumber,
                    username: asset.username,
                    price: asset.price,
                    vendor: asset.vendor,
                    buyDate: asset.buyDate,
                    registered_on: asset.registered_on,
                    extraDetails: asset.extraDetails,
                    updatedDate: asset.updatedDate || null,
                    relocationHistory: asset.relocationHistory || []
                });
            });

            // Filter by URL category if provided
            if (categoryFilter) {
                const filteredItems = {};
                if (items[categoryFilter]) filteredItems[categoryFilter] = items[categoryFilter];
                items = filteredItems;
            }

            displayItems(); // Render table
        } catch (err) {
            console.error('Error fetching items from backend:', err);
            alert('Failed to load items from server. Check console for details.');
        }
    }

    fetchItems(); // fetch on page load

    let currentCategory = null;
    let currentIndex = null;
    let sortColumn = 'name';
    let sortDirection = 'asc';

    // Function to show toast notification
    function showToast(message, isRelocate = false) {
        const toastElement = isRelocate ? relocateToastElement : successToastElement;
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.textContent = message;
        const toast = isRelocate ? relocateToast : successToast;
        toast.show();
    }

    // Function to get current timestamp
    function getCurrentTimestamp() {
        return new Date().toISOString();
    }

    // Function to format timestamp for display
    function formatTimestamp(timestamp) {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

    // Function to validate edit form
    function validateEditForm() {
        const model = document.getElementById('editModel').value.trim();
        const serialNumber = document.getElementById('editSerialNumber').value.trim();
        const username = document.getElementById('editUser').value.trim();
        if (!model || !serialNumber || !username) {
            showToast('Please fill in all required fields (Model, Serial Number, User).');
            return false;
        }
        return true;
    }

    // Function to validate relocate form
    function validateRelocateForm() {
        const fromLocation = document.getElementById('relocateFromLocation').value.trim();
        const toLocation = document.getElementById('relocateToLocation').value.trim();
        const relocatedBy = document.getElementById('relocateBy').value.trim();
        const assignedTo = document.getElementById('assignedTo').value.trim();
        if (!fromLocation || !toLocation || !assignedTo ||!relocatedBy) {
            showToast('Please fill in all required fields (From Location, To Location, Relocated By, Assigned To).');

            return false;
        }
        return true;
    }

    // Function to display items in the table
    function displayItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = filterType.value;

        // Flatten items for sorting
        let allItems = [];
        for (let category in items) {
            items[category].forEach((item, index) => {
                allItems.push({ ...item, category, index });
            });
        }

        // Filter items
        allItems = allItems.filter(item => {
            if (selectedType !== 'all' && item.name !== selectedType && item.category !== selectedType) {
                return false;
            }
            if (searchTerm &&
                !item.itemName.toLowerCase().includes(searchTerm) &&
                !item.model.toLowerCase().includes(searchTerm) &&
                !item.serialNumber.toLowerCase().includes(searchTerm)) {
                return false;
            }
            return true;
        });

        // Sort items
        allItems.sort((a, b) => {
            let valueA = a[sortColumn] || '';
            let valueB = b[sortColumn] || '';
            if (sortColumn === 'price') {
                valueA = parseFloat(valueA) || 0;
                valueB = parseFloat(valueB) || 0;
            } else if (sortColumn === 'updatedDate') {
                valueA = new Date(valueA).getTime() || 0;
                valueB = new Date(valueB).getTime() || 0;
            }
            if (typeof valueA === 'string' && sortColumn !== 'updatedDate') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            if (sortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });

        // Update table
        itemsTableBody.innerHTML = '';
        allItems.forEach((item, index)=> {
            const row = document.createElement('tr');
            row.innerHTML = `
                 <td>${index + 1}</td>
                <td>${item.itemName}</td>
                <td>${item.model}</td>
                <td>${item.serialNumber}</td>
                <td>${item.username}</td>
                <td>${item.price || '-'}</td>
                <td>${item.vendor}</td>
                <td>${item.buyDate || '-'}</td>
                <td>${item.registered_on || '-'}</td>
                <td>${item.extraDetails || '-'}</td>
                <td>${formatTimestamp(item.updatedDate)}</td>
            <td>
                    <button class="btn btn-primary btn-sm" onclick="editItem('${item.category}', ${item.index})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="confirmDelete('${item.category}', ${item.index})"><i class="fas fa-trash"></i></button>
                    <button class="btn btn-warning btn-sm" onclick="relocateItem('${item.category}', ${item.index})"><i class="fas fa-arrows-alt"></i></button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="viewHistory('${item.category}', ${item.index})"><i class="fas fa-history"></i></button>
                </td>
            `;
            itemsTableBody.appendChild(row);
        });

        // Update sort indicators
        sortableHeaders.forEach(header => {
            const icon = header.querySelector('.fas');
            if (header.dataset.sort === sortColumn) {
                icon.classList.remove('fa-sort');
                icon.classList.add(sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down');
            } else {
                icon.classList.remove('fa-sort-up', 'fa-sort-down');
                icon.classList.add('fa-sort');
            }
        });
    }

    // Function to open edit modal with item details
    window.editItem = function (category, index) {
        const item = items[category][index];
        document.getElementById('editItemCategory').value = category;
        document.getElementById('editItemIndex').value = index;
        document.getElementById('editItemName').value = item.itemName;
        document.getElementById('editModel').value = item.model;
        document.getElementById('editSerialNumber').value = item.serialNumber;
        document.getElementById('editUser').value = item.username;
        document.getElementById('editPrice').value = item.price || '';
        document.getElementById('editVendor').value = item.vendor;
        document.getElementById('editBuyDate').value = item.buyDate || '';
        document.getElementById('editExtraDetails').value = item.extraDetails || '';
        editItemModal.show();
    };

    // Function to open delete confirmation modal
    window.confirmDelete = function (category, index) {
        currentCategory = category;
        currentIndex = index;
        deleteItemModal.show();
    };

    // Function to open relocate modal
    window.relocateItem = function (category, index) {
        document.getElementById('relocateItemCategory').value = category;
        document.getElementById('relocateItemIndex').value = index;
        document.getElementById('relocateFromLocation').value = '';
        document.getElementById('relocateToLocation').value = '';
        document.getElementById('relocateBy').value = '';
        document.getElementById('assignedTo').value = '';
        document.getElementById('relocateReason').value = '';
        relocateItemModal.show();
    };

    // Function to view relocation history
    window.viewHistory = async function (category, index) {
        const item = items[category][index];
        const historyTableBody = document.getElementById('historyTableBody');

        historyTableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center">Loading...</td>
        </tr>
    `;

        if (!item || !item.id) {
            historyTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-danger text-center">Asset ID missing</td>
            </tr>
        `;
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${item.id}/relocations`);

            if (!response.ok) {
                throw new Error('Failed to fetch relocation history');
            }

            const history = await response.json();

            historyTableBody.innerHTML = '';

            if (history.length === 0) {
                historyTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No relocation history available.</td>
                </tr>
            `;
            } else {
                history.forEach(log => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${log.fromLocation}</td>
                    <td>${log.toLocation}</td>
                    <td>${log.relocatedBy}</td>
                    <td>${log.assignedTo}</td>
                    <td>${log.reason || '-'}</td>
                    <td>${formatTimestamp(log.relocatedAt)}</td>

                    
                    
                `;
                    historyTableBody.appendChild(row);
                });
                console.log(history);
            }

            historyModal.show();

        } catch (error) {
            console.error(error);
            historyTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-danger text-center">
                    Failed to load relocation history
                </td>
            </tr>
        `;
        }
    };



    // Handle save changes in edit modal
    saveEditBtn.addEventListener("click", async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!validateEditForm()) return;

        const category = document.getElementById("editItemCategory").value;
        const index = parseInt(document.getElementById("editItemIndex").value);
        const asset = items[category][index];

        if (!asset || !asset.id) {
            showToast("Asset ID missing!");
            return;
        }

        const payload = {
            itemName: document.getElementById("editItemName").value.trim(),
            model: document.getElementById("editModel").value.trim(),
            serialNumber: document.getElementById("editSerialNumber").value.trim(),
            username: document.getElementById("editUser").value.trim(),
            price: document.getElementById("editPrice").value
                ? Number(document.getElementById("editPrice").value)
                : null,
            vendor: document.getElementById("editVendor").value.trim(),
            buyDate: document.getElementById("editBuyDate").value || null,           
            extraDetails: document.getElementById("editExtraDetails").value.trim() || null
        };

        try {
            const response = await fetch(`${API_BASE_URL}/${asset.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Update failed");
            }

            showToast("Asset updated successfully!");

            await fetchItems();

            setTimeout(() => {
                editItemModal.hide();
                document.body.classList.remove("modal-open");
                document.querySelectorAll(".modal-backdrop").forEach(b => b.remove());
            }, 150);

        } catch (error) {
            console.error("Update error:", error);
            showToast("Error updating asset");
        }
    });



    // Handle delete confirmation
    // Handle delete confirmation
    confirmDeleteBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (currentCategory && currentIndex !== null) {

            // Get asset ID from items array
            const asset = items[currentCategory][currentIndex];

            if (!asset || !asset.id) {
                console.error("Asset ID missing:", asset);
                showToast("Error: Asset ID not found!");
                return;
            }

            try {
                // Call backend delete API
                const response = await fetch(`${API_BASE_URL}/${asset.id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Failed to delete asset from backend");
                }

                // Fetch fresh items from server after delete
                await fetchItems();

                // Close modal after small delay
                setTimeout(() => {
                    deleteItemModal.hide();
                    deleteItemModalElement.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
                }, 100);

                showToast("Asset deleted successfully!");

                currentCategory = null;
                currentIndex = null;

            } catch (error) {
                console.error("Error deleting asset:", error);
                showToast("Error deleting asset. Please try again.");
            }
        }
    });


    // Handle save relocation
    saveRelocateBtn.addEventListener('click', async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!validateRelocateForm()) return;

        const category = document.getElementById('relocateItemCategory').value;
        const index = parseInt(document.getElementById('relocateItemIndex').value);
        const asset = items[category][index];

        try {
            const response = await fetch(`${API_BASE_URL}/${asset.id}/relocate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fromLocation: document.getElementById('relocateFromLocation').value,
                    toLocation: document.getElementById('relocateToLocation').value,
                    relocatedBy: document.getElementById('relocateBy').value,
                    assignedTo: document.getElementById('assignedTo').value,
                    reason: document.getElementById('relocateReason').value
                })
            });

            if (!response.ok) {
                throw new Error("Relocation failed");
            }

            showToast("Item relocated successfully!", true);

            await fetchItems(); // refresh table

            setTimeout(() => {
                relocateItemModal.hide();
                document.body.classList.remove("modal-open");
                document.querySelectorAll(".modal-backdrop").forEach(b => b.remove());
            }, 150);

        } catch (error) {
            console.error("Relocation error:", error);
            showToast("Error relocating item.");
        }
    });



    // Handle search input
    searchInput.addEventListener('input', displayItems);

    // Handle filter change
    filterType.addEventListener('change', displayItems);

    // Handle column sorting
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            displayItems();
        });
    });

    // Initial display of items
    displayItems();
});