const API_BASE_URL = "http://localhost:5000/api/assets";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addItemForm");
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));
  const addMoreBtn = document.getElementById("addMoreBtn");
  const goToDashboardBtn = document.getElementById("goToDashboardBtn");

  // When form is submitted
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const itemData = {
      itemName: document.getElementById("itemName").value,
      itemModel: document.getElementById("itemModel").value,
      serialNumber: document.getElementById("serialNumber").value,
      assignedUser: document.getElementById("assignedUser").value,
      purchasePrice: document.getElementById("purchasePrice").value,
      purchaseDate: document.getElementById("purchaseDate").value,
      vendor: document.getElementById("vendor").value,
      warrantyPeriod: document.getElementById("warrantyPeriod").value,
      conditions: document.getElementById("conditions").value,
      location: document.getElementById("location").value,
      additionalNotes: document.getElementById("additionalNotes").value
    };

    try {
      const response = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        console.log(response);
        successModal.show();
        form.reset();
      } else {
        const errorData = await response.json();
        alert("❌ Failed to save item: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Unable to connect to the server. Make sure your backend is running.");
    }
  });

  // Buttons inside success modal
  addMoreBtn.addEventListener("click", () => {
    successModal.hide();
    form.reset();
  });

  goToDashboardBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
});

// Go back button
function goBack() {
  window.history.back();
}
