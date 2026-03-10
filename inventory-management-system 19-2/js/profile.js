// // profile.js - Fixed Profile Page JavaScript

// // Hospital names mapping
// const hospitalNames = {
//     'main': 'P.B.M.A H.V. Desai Hospital',
//     'pune-east': 'Pune East Vision Center',
//     'pune-west': 'Pune West Vision Center',
//     'satara': 'Satara Center',
//     'solapur': 'Shankarsheth Sable Eye Hospital Solapur',
// };

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Load user data
//     loadUserData();
    
//     // Setup profile panel position
//     setupProfilePanelPosition();
    
//     // Setup logout functionality
//     setupLogoutFunctionality();
    
//     // Animate counters
//     animateCounters();
    
//     // Setup back to top button
//     setupBackToTop();
    
//     // Setup scroll animations
//     setupScrollAnimations();
    
//     // Setup newsletter form
//     setupNewsletterForm();
// });

// // ===== PROFILE PANEL FUNCTIONS =====

// // Load user data from localStorage/sessionStorage
// function loadUserData() {
//     try {
//         // Get hospital from localStorage
//         const hospitalKey = localStorage.getItem('selectedHospital') || 'main';
//         const displayName = hospitalNames[hospitalKey] || 'Unknown Center';
        
//         // Update hospital name display
//         const hospitalNameElement = document.getElementById('selectedHospitalName');
//         if (hospitalNameElement) {
//             hospitalNameElement.textContent = displayName;
//         }
        
//     } catch (error) {
//         console.error('Error loading user data:', error);
//         showNotification('Error loading user data', 'error');
//     }
// }

// // Setup profile panel position (FIXED - doesn't scroll)
// function setupProfilePanelPosition() {
//     const profilePanel = document.querySelector('.user-profile-panel');
//     const navbar = document.querySelector('.custom-navbar');
    
//     if (!profilePanel || !navbar) return;
    
//     const updateProfilePanelPosition = () => {
//         if (window.innerWidth > 992) {
//             // Desktop: Fixed position
//             const navbarHeight = navbar.offsetHeight;
//             const scrollTop = window.pageYOffset;
            
//             // Always stay at top: 100px regardless of scroll
//             profilePanel.style.position = 'fixed';
//             profilePanel.style.top = `${navbarHeight + 20}px`;
//             profilePanel.style.bottom = 'auto';
//         } else {
//             // Mobile: Static position
//             profilePanel.style.position = 'static';
//             profilePanel.style.top = 'auto';
//             profilePanel.style.right = 'auto';
//         }
//     };
    
//     // Initial position update
//     updateProfilePanelPosition();
    
//     // Update on scroll and resize
//     window.addEventListener('scroll', updateProfilePanelPosition);
//     window.addEventListener('resize', updateProfilePanelPosition);
// }

// // Setup logout functionality
// function setupLogoutFunctionality() {
//     const logoutBtn = document.getElementById('logoutBtn');
//     const confirmLogoutBtn = document.getElementById('confirmLogout');
    
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', function(e) {
//             e.preventDefault();
//             showLogoutConfirmation();
//         });
//     }
    
//     if (confirmLogoutBtn) {
//         confirmLogoutBtn.addEventListener('click', logout);
//     }
// }

// // Show logout confirmation modal
// function showLogoutConfirmation() {
//     try {
//         const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
//         logoutModal.show();
//     } catch (error) {
//         console.error('Error showing logout modal:', error);
//         // Fallback if Bootstrap modal fails
//         if (confirm('Are you sure you want to logout?')) {
//             logout();
//         }
//     }
// }

// // Logout function
// function logout() {
//     // Show loading state
//     const logoutBtn = document.querySelector('.logout-btn');
//     if (logoutBtn) {
//         const originalText = logoutBtn.innerHTML;
//         logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
//         logoutBtn.disabled = true;
//     }
    
//     // Clear user data from storage
//     clearUserData();
    
//     // Simulate logout process
//     setTimeout(() => {
//         // Redirect to login page
//         window.location.href = 'login.html';
//     }, 1000);
// }

// // Clear user data from storage
// function clearUserData() {
//     // Clear only user-specific data, keep hospital preference if needed
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userRole');
//     sessionStorage.clear();
// }

// // ===== MAIN PROFILE PAGE FUNCTIONS =====

// // Counter Animation
// function animateCounters() {
//     const counters = document.querySelectorAll('.stat-number');
    
//     counters.forEach(counter => {
//         const target = parseInt(counter.getAttribute('data-count'));
//         const speed = 50;
//         let count = 0;
        
//         const updateCount = () => {
//             const increment = target / speed;
            
//             if (count < target) {
//                 count += increment;
//                 counter.textContent = Math.floor(count) + "+";
//                 setTimeout(updateCount, 30);
//             } else {
//                 counter.textContent = target + "+";
//             }
//         };
        
//         // Start animation when element is in viewport
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     updateCount();
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, { threshold: 0.5 });
        
//         observer.observe(counter);
//     });
// }

// // Back to Top Functionality
// function setupBackToTop() {
//     const backToTopBtn = document.getElementById('backToTop');
    
//     if (!backToTopBtn) return;
    
//     window.addEventListener('scroll', () => {
//         if (window.pageYOffset > 300) {
//             backToTopBtn.classList.add('show');
//         } else {
//             backToTopBtn.classList.remove('show');
//         }
//     });
    
//     backToTopBtn.addEventListener('click', () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// }

// // Scroll Animations
// function setupScrollAnimations() {
//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };
    
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('visible');
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, observerOptions);
    
//     // Observe timeline items
//     document.querySelectorAll('.timeline-item').forEach(item => {
//         observer.observe(item);
//     });
    
//     // Observe service cards
//     document.querySelectorAll('.service-card').forEach(card => {
//         observer.observe(card);
//     });
    
//     // Observe contact items
//     document.querySelectorAll('.contact-item').forEach(item => {
//         observer.observe(item);
//     });
// }

// // Newsletter Form
// function setupNewsletterForm() {
//     const newsletterForm = document.querySelector('.newsletter-form');
    
//     if (newsletterForm) {
//         const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
//         const newsletterInput = newsletterForm.querySelector('.newsletter-input');
        
//         newsletterBtn.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             if (newsletterInput.value.trim() === '') {
//                 showNotification('Please enter your email address', 'error');
//                 newsletterInput.focus();
//                 return;
//             }
            
//             if (!isValidEmail(newsletterInput.value)) {
//                 showNotification('Please enter a valid email address', 'error');
//                 newsletterInput.focus();
//                 return;
//             }
            
//             // Simulate form submission
//             newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
//             newsletterBtn.disabled = true;
            
//             setTimeout(() => {
//                 showNotification('Successfully subscribed to newsletter!', 'success');
//                 newsletterInput.value = '';
//                 newsletterBtn.innerHTML = 'Subscribe';
//                 newsletterBtn.disabled = false;
//             }, 1500);
//         });
//     }
// }

// // Utility Functions
// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// function showNotification(message, type = 'info') {
//     // Create notification element
//     const notification = document.createElement('div');
//     notification.className = `notification notification-${type}`;
//     notification.innerHTML = `
//         <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
//         <span>${message}</span>
//     `;
    
//     // Add styles
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: ${type === 'success' ? '#28a745' : '#dc3545'};
//         color: white;
//         padding: 1rem 1.5rem;
//         border-radius: 8px;
//         box-shadow: 0 5px 15px rgba(0,0,0,0.2);
//         display: flex;
//         align-items: center;
//         gap: 0.75rem;
//         z-index: 10000;
//         animation: slideIn 0.3s ease;
//         font-family: 'Roboto', sans-serif;
//     `;
    
//     document.body.appendChild(notification);
    
//     // Remove after 3 seconds
//     setTimeout(() => {
//         notification.style.animation = 'slideOut 0.3s ease';
//         setTimeout(() => {
//             if (notification.parentNode) {
//                 notification.parentNode.removeChild(notification);
//             }
//         }, 300);
//     }, 3000);
    
//     // Add keyframes for animation
//     if (!document.querySelector('#notification-styles')) {
//         const style = document.createElement('style');
//         style.id = 'notification-styles';
//         style.textContent = `
//             @keyframes slideIn {
//                 from {
//                     transform: translateX(100%);
//                     opacity: 0;
//                 }
//                 to {
//                     transform: translateX(0);
//                     opacity: 1;
//                 }
//             }
//             @keyframes slideOut {
//                 from {
//                     transform: translateX(0);
//                     opacity: 1;
//                 }
//                 to {
//                     transform: translateX(100%);
//                     opacity: 0;
//                 }
//             }
//         `;
//         document.head.appendChild(style);
//     }
// }

// // Export functions for testing or external use
// window.profileModule = {
//     hospitalNames,
//     loadUserData,
//     showLogoutConfirmation,
//     logout,
//     animateCounters,
//     setupBackToTop,
//     showNotification
// };


// profile.js - Enhanced Profile Page JavaScript with Improved Logout

// Hospital names mapping
const hospitalNames = {
    'main': 'P.B.M.A H.V. Desai Hospital',
    'pune-east': 'Pune East Vision Center',
    'pune-west': 'Pune West Vision Center',
    'satara': 'Satara Center',
    'solapur': 'Shankarsheth Sable Eye Hospital Solapur',
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    
    // Load user data
    loadUserData();
    
    // Setup profile panel position
    setupProfilePanelPosition();
    
    // Setup logout functionality
    setupLogoutFunctionality();
    
    // Animate counters
    animateCounters();
    
    // Setup back to top button
    setupBackToTop();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup newsletter form
    setupNewsletterForm();
});

// ===== USER DATA FUNCTIONS =====

// Load user data from localStorage
function loadUserData() {
    try {
        console.log('Loading user data...');
        
        // Get hospital from localStorage
        const hospitalKey = localStorage.getItem('selectedHospital') || 'main';
        const displayName = hospitalNames[hospitalKey] || 'H.V. Desai Eye Hospital';
        
        console.log('Hospital key:', hospitalKey);
        console.log('Display name:', displayName);
        
        // Update hospital name display in profile panel
        const hospitalNameElement = document.getElementById('selectedHospitalName');
        if (hospitalNameElement) {
            hospitalNameElement.textContent = displayName;
            console.log('Updated profile panel hospital name');
        }
        
        // Update logout modal hospital info
        const logoutHospitalElement = document.getElementById('logoutHospital');
        if (logoutHospitalElement) {
            logoutHospitalElement.textContent = displayName;
            console.log('Updated logout modal hospital name');
        }
        
        // Update username in logout modal
        const usernameElement = document.getElementById('logoutUsername');
        if (usernameElement) {
            const userName = localStorage.getItem('userName') || 'Hospital Staff';
            usernameElement.textContent = userName;
            console.log('Updated logout modal username:', userName);
        }
        
    } catch (error) {
        console.error('Error loading user data:', error);
        showNotification('Error loading user data', 'error');
    }
}

// Setup profile panel position (FIXED - doesn't scroll)
function setupProfilePanelPosition() {
    const profilePanel = document.querySelector('.user-profile-panel');
    const navbar = document.querySelector('.custom-navbar');
    
    if (!profilePanel || !navbar) {
        console.log('Profile panel or navbar not found');
        return;
    }
    
    console.log('Setting up profile panel position...');
    
    const updateProfilePanelPosition = () => {
        if (window.innerWidth > 992) {
            // Desktop: Fixed position
            const navbarHeight = navbar.offsetHeight;
            
            // Always stay at fixed position
            profilePanel.style.position = 'fixed';
            profilePanel.style.top = `${navbarHeight + 20}px`;
            profilePanel.style.right = '2rem';
            profilePanel.style.bottom = 'auto';
            profilePanel.style.zIndex = '1000';
            
            console.log('Desktop: Profile panel fixed at top:', profilePanel.style.top);
        } else {
            // Mobile: Static position
            profilePanel.style.position = 'static';
            profilePanel.style.top = 'auto';
            profilePanel.style.right = 'auto';
            profilePanel.style.zIndex = 'auto';
            
            console.log('Mobile: Profile panel static');
        }
    };
    
    // Initial position update
    updateProfilePanelPosition();
    
    // Update on scroll and resize
    window.addEventListener('scroll', updateProfilePanelPosition);
    window.addEventListener('resize', updateProfilePanelPosition);
    
    console.log('Profile panel position setup complete');
}

// ===== LOGOUT FUNCTIONS =====

// Setup logout functionality
function setupLogoutFunctionality() {
    console.log('Setting up logout functionality...');
    
    const logoutBtn = document.getElementById('logoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogout');
    
    if (logoutBtn) {
        console.log('Logout button found');
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout button clicked');
            showLogoutConfirmation();
        });
    } else {
        console.warn('Logout button not found!');
    }
    
    if (confirmLogoutBtn) {
        console.log('Confirm logout button found');
        confirmLogoutBtn.addEventListener('click', function() {
            console.log('Confirm logout clicked');
            executeLogout();
        });
    } else {
        console.warn('Confirm logout button not found!');
    }
    
    // Setup modal show event to update info
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
        console.log('Logout modal found');
        logoutModal.addEventListener('show.bs.modal', function() {
            console.log('Logout modal opening');
            updateLogoutModalInfo();
        });
    }
}

// Update logout modal with current user info
function updateLogoutModalInfo() {
    try {
        console.log('Updating logout modal info...');
        
        // Get user data
        const userName = localStorage.getItem('userName') || 'Hospital Staff';
        const hospitalKey = localStorage.getItem('selectedHospital') || 'main';
        const hospitalName = hospitalNames[hospitalKey] || 'H.V. Desai Eye Hospital';
        
        console.log('User:', userName, 'Hospital:', hospitalName);
        
        // Update modal content
        const usernameElement = document.getElementById('logoutUsername');
        const hospitalElement = document.getElementById('logoutHospital');
        
        if (usernameElement) {
            usernameElement.textContent = userName;
            console.log('Updated username in modal');
        }
        
        if (hospitalElement) {
            hospitalElement.textContent = hospitalName;
            console.log('Updated hospital in modal');
        }
        
    } catch (error) {
        console.error('Error updating logout modal:', error);
    }
}

// Show logout confirmation modal
function showLogoutConfirmation() {
    try {
        console.log('Showing logout confirmation modal...');
        
        const logoutModalElement = document.getElementById('logoutModal');
        if (!logoutModalElement) {
            console.error('Logout modal element not found!');
            // Fallback to basic confirmation
            if (confirm('Are you sure you want to logout?')) {
                executeLogout();
            }
            return;
        }
        
        const logoutModal = new bootstrap.Modal(logoutModalElement);
        logoutModal.show();
        
        console.log('Logout modal shown successfully');
        
    } catch (error) {
        console.error('Error showing logout modal:', error);
        // Fallback confirmation
        if (confirm('Are you sure you want to logout?')) {
            executeLogout();
        }
    }
}

// Execute logout process
function executeLogout() {
    console.log('Executing logout process...');
    
    const confirmLogoutBtn = document.getElementById('confirmLogout');
    
    // Show loading state on button
    if (confirmLogoutBtn) {
        console.log('Adding loading state to logout button');
        const originalHTML = confirmLogoutBtn.innerHTML;
        confirmLogoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Logging out...';
        confirmLogoutBtn.disabled = true;
        
        // Store original state for cleanup
        confirmLogoutBtn.dataset.originalHtml = originalHTML;
    }
    
    // Show logout animation in modal
    showLogoutAnimation();
    
    // Clear user data
    clearUserData();
    
    // Show success message
    showNotification('Successfully logged out! Redirecting to login...', 'success');
    
    // Close modal after delay
    setTimeout(() => {
        const logoutModal = bootstrap.Modal.getInstance(document.getElementById('logoutModal'));
        if (logoutModal) {
            logoutModal.hide();
        }
        
        // Redirect to login page
        setTimeout(() => {
            console.log('Redirecting to login page...');
            window.location.href = 'login.html';
        }, 1000);
        
    }, 1500);
}

// Show logout animation in modal
function showLogoutAnimation() {
    console.log('Showing logout animation...');
    
    const modalBody = document.querySelector('#logoutModal .modal-body');
    if (!modalBody) return;
    
    // Store original content
    const originalContent = modalBody.innerHTML;
    modalBody.dataset.originalContent = originalContent;
    
    // Show animation
    modalBody.innerHTML = `
        <div class="logout-animation text-center">
            <div class="spinner-border text-danger mb-3" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Logging out...</span>
            </div>
            <h4 class="text-primary">Securing your session...</h4>
            <p class="text-muted">Please wait while we log you out safely</p>
        </div>
    `;
}

// Clear user data from storage
function clearUserData() {
    console.log('Clearing user data from storage...');
    
    try {
        // Clear all user-related data
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userToken');
        
        // Keep hospital preference for next login if needed
        // localStorage.removeItem('selectedHospital');
        
        // Clear session storage
        sessionStorage.clear();
        
        console.log('User data cleared successfully');
        
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
}

// ===== PROFILE PAGE FEATURES =====

// Counter Animation
function animateCounters() {
    console.log('Setting up counter animations...');
    
    const counters = document.querySelectorAll('.stat-number');
    console.log('Found', counters.length, 'counters');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        const speed = 50;
        let count = 0;
        
        console.log('Animating counter:', counter, 'Target:', target);
        
        const updateCount = () => {
            const increment = target / speed;
            
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + "+";
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target + "+";
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Counter in view, starting animation');
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(counter);
    });
}

// Back to Top Functionality
function setupBackToTop() {
    console.log('Setting up back to top button...');
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) {
        console.warn('Back to top button not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        console.log('Scrolling to top...');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('Back to top button setup complete');
}

// Scroll Animations for timeline and cards
function setupScrollAnimations() {
    console.log('Setting up scroll animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                console.log('Element became visible:', entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log('Found', timelineItems.length, 'timeline items');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    console.log('Found', serviceCards.length, 'service cards');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    console.log('Found', contactItems.length, 'contact items');
    contactItems.forEach(item => {
        observer.observe(item);
    });
}

// Newsletter Form
function setupNewsletterForm() {
    console.log('Setting up newsletter form...');
    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) {
        console.log('Newsletter form not found');
        return;
    }
    
    const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
    const newsletterInput = newsletterForm.querySelector('.newsletter-input');
    
    if (!newsletterBtn || !newsletterInput) {
        console.warn('Newsletter button or input not found');
        return;
    }
    
    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (newsletterInput.value.trim() === '') {
            showNotification('Please enter your email address', 'error');
            newsletterInput.focus();
            return;
        }
        
        if (!isValidEmail(newsletterInput.value)) {
            showNotification('Please enter a valid email address', 'error');
            newsletterInput.focus();
            return;
        }
        
        console.log('Subscribing email:', newsletterInput.value);
        
        // Simulate form submission
        const originalBtnText = newsletterBtn.innerHTML;
        newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Subscribing...';
        newsletterBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Successfully subscribed to newsletter!', 'success');
            newsletterInput.value = '';
            newsletterBtn.innerHTML = originalBtnText;
            newsletterBtn.disabled = false;
            console.log('Newsletter subscription simulated');
        }, 1500);
    });
    
    console.log('Newsletter form setup complete');
}

// ===== UTILITY FUNCTIONS =====

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification message
function showNotification(message, type = 'info') {
    console.log('Showing notification:', type, message);
    
    // Remove any existing notifications
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: notificationSlideIn 0.3s ease;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Add keyframes for animation if not already present
    if (!document.querySelector('#notification-keyframes')) {
        const style = document.createElement('style');
        style.id = 'notification-keyframes';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== WINDOW EXPORTS =====

// Export functions for testing or external use
window.profileModule = {
    hospitalNames,
    loadUserData,
    updateLogoutModalInfo,
    showLogoutConfirmation,
    executeLogout,
    animateCounters,
    setupBackToTop,
    showNotification
};

console.log('Profile JS module loaded successfully');