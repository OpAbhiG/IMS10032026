document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    // Load current page if navigated directly
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    if (currentPage.endsWith('.html')) {
        // Allow default navigation for HTML files
        history.replaceState({}, document.title, window.location.pathname);
    } else {
        loadPage(currentPage);
    }
});

function initializeNavigation() {
    // Handle navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.endsWith('.html')) {
                // Allow default navigation for HTML files
                window.location.href = href;
            } else if (href && href !== '#') {
                e.preventDefault();
                loadPage(href);
            }
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        if (currentPage.endsWith('.html')) {
            // Reload the page for HTML navigation
            window.location.reload();
        } else {
            loadPage(currentPage);
        }
    });
}

async function loadPage(page) {
    try {
        console.log('Loading page:', page);
        const response = await fetch(page);
        if (!response.ok) throw new Error(`Failed to load ${page}: ${response.status}`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#app-content')?.innerHTML || '';
        const newScripts = Array.from(doc.querySelectorAll('script[src]')).map(script => script.src);

        // Update content (only if #app-content exists)
        const appContent = document.getElementById('app-content');
        if (appContent) {
            appContent.innerHTML = newContent;

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === page) {
                    link.classList.add('active');
                }
            });

            // Update browser history
            history.pushState({}, '', page);

            // Remove old scripts
            document.querySelectorAll('script.dynamic-script').forEach(script => script.remove());

            // Load new scripts
            newScripts.forEach(src => {
                if (!document.querySelector(`script[src="${src}"]`)) {
                    const script = document.createElement('script');
                    script.src = src;
                    script.className = 'dynamic-script';
                    document.body.appendChild(script);
                }
            });
        } else {
            console.warn('No #app-content element found. Falling back to default navigation.');
            window.location.href = page;
        }

        console.log('Page loaded:', page);
    } catch (error) {
        console.error('Error loading page:', error);
        const appContent = document.getElementById('app-content');
        if (appContent) {
            appContent.innerHTML = '<div class="alert alert-danger">Error loading page.</div>';
        } else {
            window.location.href = 'dashboard.html'; // Fallback to dashboard
        }
    }
}