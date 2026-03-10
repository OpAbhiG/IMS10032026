const API_BASE_URL = "http://localhost:5000/api/assets";

document.addEventListener('DOMContentLoaded', function () {
    const itemType = document.getElementById('itemType');
    const customItemDiv = document.getElementById('customItemDiv');
    const customItem = document.getElementById('customItem');
    const continueBtn = document.getElementById('continueBtn');
    const itemSelection = document.getElementById('itemSelection');
    const itemForm = document.getElementById('itemForm');
    const itemName = document.getElementById('itemName');
    const customFieldsContainer = document.getElementById('customFieldsContainer');
    const addCustomFieldBtn = document.getElementById('addCustomFieldBtn');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const addMoreBtn = document.getElementById('addMoreBtn');

    // Simulated storage (replace with DB in future)
    let items = JSON.parse(localStorage.getItem('items')) || {
        'Monitor': [],
        'Keyboard': []
    };

    // Load existing custom fields for the selected item type
    let customFields = JSON.parse(localStorage.getItem('customFields')) || {};

    function loadCustomFields(selectedType) {
        customFieldsContainer.innerHTML = '';
        if (customFields[selectedType]) {
            customFields[selectedType].forEach(field => {
                addCustomFieldElement(field.title, field.type, field.value || '');
            });
        }
    }

    // Show/hide custom item input based on selection
    itemType.addEventListener('change', function () {
        if (itemType.value === 'Other') {
            customItemDiv.style.display = 'block';
            customItem.required = true;
        } else {
            customItemDiv.style.display = 'none';
            customItem.required = false;
        }
    });

    // Handle continue button to show item details form
    continueBtn.addEventListener('click', function () {
        let selectedItem = itemType.value;
        if (selectedItem === 'Other') {
            selectedItem = customItem.value.trim();
            if (!selectedItem) {
                alert('Please enter a custom item name.');
                return;
            }
        }
        if (!selectedItem || selectedItem === '') {
            alert('Please select an item or enter a custom item name.');
            return;
        }
        itemName.value = selectedItem;
        itemSelection.style.display = 'none';
        itemForm.style.display = 'block';
        loadCustomFields(selectedItem);
    });

    // Add custom field element
    function addCustomFieldElement(title = '', type = 'text', value = '') {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'custom-field';
        fieldDiv.innerHTML = `
            <input type="text" class="form-control" placeholder="Field Title" value="${title}" required>
            <select class="form-select">
                <option value="text" ${type === 'text' ? 'selected' : ''}>Text</option>
                <option value="number" ${type === 'number' ? 'selected' : ''}>Number</option>
            </select>
            <input type="text" class="form-control" placeholder="Field Value" value="${value}" ${type === 'number' ? 'type="number"' : ''}>
            <button type="button" class="btn btn-danger btn-sm remove-field"><i class="fas fa-trash"></i></button>
        `;
        customFieldsContainer.appendChild(fieldDiv);

        fieldDiv.querySelector('.remove-field').addEventListener('click', function () {
            fieldDiv.remove();
        });

        // Update input type dynamically based on select change
        fieldDiv.querySelector('select').addEventListener('change', function (e) {
            const input = fieldDiv.querySelector('input[type="text"], input[type="number"]');
            const newType = e.target.value;
            const currentValue = input.value;
            input.type = newType;
            input.value = currentValue; // Preserve value
        });
    }

    // Add new custom field button
    addCustomFieldBtn.addEventListener('click', function () {
        addCustomFieldElement();
    });

    // Handle form submission
    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemData = {
            name: itemName.value,
            model: document.getElementById('model').value,
            serialNumber: document.getElementById('serialNumber').value,
            username: document.getElementById('username').value,
            price: document.getElementById('price').value,
            vendor: document.getElementById('vendor').value,
            buyDate: document.getElementById('buyDate').value,
            registered_on: document.getElementById('registered_on').value,
            extraDetails: document.getElementById('extraDetails').value,
            addedDate: new Date().toISOString().split('T')[0] // Current date
        };

        // Collect custom fields
        const customFieldsInputs = customFieldsContainer.querySelectorAll('.custom-field');
        const newCustomFields = [];
        customFieldsInputs.forEach(field => {
            const title = field.querySelector('input[type="text"]').value.trim();
            const type = field.querySelector('select').value;
            const value = field.querySelector('input[type="text"], input[type="number"]').value;
            if (title) {
                newCustomFields.push({ title, type, value });
            }
        });

        if (newCustomFields.length > 0) {
            customFields[itemData.name] = newCustomFields;
            localStorage.setItem('customFields', JSON.stringify(customFields));
        }

        // Save item to appropriate category
        if (!items[itemData.name]) {
            items[itemData.name] = [];
        }
        // Send data to backend instead of localStorage
        fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemName: itemData.name,
                model: itemData.model,
                serialNumber: itemData.serialNumber,
                username: itemData.username,
                price: itemData.price,
                vendor: itemData.vendor,
                buyDate: itemData.buyDate,
                registered_on: itemData.registered_on,
                extraDetails: itemData.extraDetails,

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("✅ Item saved to backend:", data);
                confirmationModal.show(); // show success popup
            })
            .catch((error) => {
                console.error("❌ Error saving item:", error);
                alert("Failed to save item. Please try again.");
            });


        // Show confirmation modal
        confirmationModal.show();

        // Reset form and show item selection
        itemForm.reset();
        itemForm.style.display = 'none';
        itemSelection.style.display = 'block';
        itemType.value = '';
        customItemDiv.style.display = 'none';
        customItem.value = '';
        customFieldsContainer.innerHTML = '';
    });

    // Handle add more button
    addMoreBtn.addEventListener('click', function () {
        confirmationModal.hide();
        itemType.focus();
    });
});






