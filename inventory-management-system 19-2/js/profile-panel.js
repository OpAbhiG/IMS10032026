// profile-panel.js - User Profile Panel JavaScript

// Hospital names mapping
const hospitalNames = {
    'main': 'P.B.M.A H.V. Desai Hospital',
    'pune-east': 'Pune East Vision Center',
    'pune-west': 'Pune West Vision Center',
    'satara': 'Satara Center',
    'solapur': 'Shankarsheth Sable Eye Hospital Solapur',
    // Add more as needed
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Setup profile panel interactions
    setupProfilePanel();
    
    // Setup logout functionality
    setupLogoutFunctionality();
});

// Load user data from localStorage/sessionStorage
function loadUserData() {
    try {
        // Get hospital from localStorage
        const hospitalKey = localStorage.getItem('selectedHospital') || 'main';
        const displayName = hospitalNames[hospitalKey] || 'Unknown Center';
        
        // Update hospital name display
        const hospitalNameElement = document.getElementById('selectedHospitalName');
        if (hospitalNameElement) {
            hospitalNameElement.textContent = displayName;
        }
        
        // Get user data (you can extend this to fetch from API)
        const userData = {
            name: localStorage.getItem('userName') || 'Dr. Abhishek',
            id: localStorage.getItem('userId') || 'a@123',
            role: localStorage.getItem('userRole') || 'Doctor'
        };
        
        // Update user info in the panel
        updateUserInfo(userData);
        
    } catch (error) {
        console.error('Error loading user data:', error);
        showNotification('Error loading user data', 'error');
    }
}

// Update user information in the panel
function updateUserInfo(userData) {
    const userNameElement = document.querySelector('.user-name');
    const userIdElement = document.querySelector('.user-id');
    
    if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name;
    }
    
    if (userIdElement && userData.id) {
        userIdElement.textContent = `ID: ${userData.id}`;
    }
    
    // You can add more updates here (role, avatar, etc.)
}

// Setup profile panel interactions
function setupProfilePanel() {
    const profilePanel = document.querySelector('.user-profile-panel');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (!profilePanel || !userAvatar) return;
    
    // Add click effect to avatar
    userAvatar.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        }, 100);
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
    
    // Add hover effect to entire panel
    profilePanel.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    profilePanel.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add keyboard navigation
    profilePanel.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Setup logout functionality
function setupLogoutFunctionality() {
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogoutConfirmation();
        });
    }
}

// Show logout confirmation modal
function showLogoutConfirmation() {
    try {
        const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
        logoutModal.show();
    } catch (error) {
        console.error('Error showing logout modal:', error);
        // Fallback if Bootstrap modal fails
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    }
}

// Logout function
function logout() {
    // Show loading state
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        const originalText = logoutBtn.innerHTML;
        logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
        logoutBtn.disabled = true;
    }
    
    // Clear user data from storage
    clearUserData();
    
    // Simulate logout process
    setTimeout(() => {
        // Redirect to login page
        window.location.href = 'login.html';
    }, 1000);
}

// Clear user data from storage
function clearUserData() {
    // Clear only user-specific data, keep hospital preference if needed
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    sessionStorage.clear();
    
    // You might want to keep hospital selection for next login
    // localStorage.removeItem('selectedHospital');
}

// Show notification (can be shared with profile.js)
function showNotification(message, type = 'info') {
    // Check if notification function exists in profile.js
    if (typeof window.profileModule !== 'undefined' && 
        typeof window.profileModule.showNotification === 'function') {
        window.profileModule.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
}

// Handle responsive behavior
function handleResponsiveLayout() {
    const profilePanel = document.querySelector('.user-profile-panel');
    const mainContent = document.querySelector('.main-content');
    
    if (!profilePanel || !mainContent) return;
    
    const updateLayout = () => {
        if (window.innerWidth <= 992) {
            // Mobile/tablet layout
            profilePanel.style.position = 'static';
            profilePanel.style.margin = '2rem auto';
            mainContent.style.marginRight = '0';
        } else {
            // Desktop layout
            profilePanel.style.position = 'fixed';
            profilePanel.style.right = '20px';
            profilePanel.style.top = '100px';
            mainContent.style.marginRight = '360px';
        }
    };
    
    // Initial update
    updateLayout();
    
    // Update on resize
    window.addEventListener('resize', updateLayout);
}

// Initialize responsive layout
handleResponsiveLayout();

// Export functions for testing or external use
window.profilePanelModule = {
    loadUserData,
    updateUserInfo,
    showLogoutConfirmation,
    logout,
    hospitalNames
};