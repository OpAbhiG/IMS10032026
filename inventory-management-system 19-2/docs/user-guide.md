# 🧑‍💻 User Guide – Inventory Management System

This guide explains how to use the Inventory Management System effectively.

---

## 🔐 1. Login

- Open `login.html`.
- Enter your **username** and **password**.
- Click **Login** to access the dashboard.
- If credentials are valid, you’ll be redirected to `dashboard.html`.

---

## 📊 2. Dashboard Overview

- Displays an overview of inventory statistics.
- Includes quick access buttons to add items, view items, and user profile.

---

## ➕ 3. Add New Inventory Item

- Navigate to `add-item.html`.
- Fill in the required fields:
  - **Item Name**
  - **Category**
  - **Model/Serial Number**
  - **Quantity**
  - **Location**
- Click **Save** to store the item in the system.

---

## 📁 4. View Inventory Items

- Go to `view-items.html`.
- Filter items by **category** or **location**.
- Search by name or model.
- Edit or delete items if required (feature optional in static version).

---

## 🧑 5. Profile Page

- Access `profile.html`.
- View user details such as:
  - **Name**
  - **Designation**
  - **Gender**
  - **Age**
- Logout option is available here.

---

## 📱 6. Responsive Design

- The system is fully responsive and works on:
  - Desktop
  - Tablet
  - Mobile

---

## 🗂️ 7. Data Storage (Front-end Only Version)

- All data is temporarily stored using **LocalStorage**.
- For permanent storage, connect the system to a backend and database.

---

## 🧪 8. Sample Data

- Use the files in the `data/` folder:
  - `sample-inventory.json` – preloaded inventory items
  - `item-categories.json` – available categories

---

## 🛠️ 9. Customization

You can:
- Add more categories in `item-categories.json`.
- Modify page styles via the `css/` folder.
- Extend functionality using JavaScript in the `js/` folder.

---

**Support:** For issues or improvements, contact the system admin or project developer.
