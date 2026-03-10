function initializeNavigation() {
    // Prevent default navigation for navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                loadPage(href);
            }
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname.split('/').pop() || 'index.html');
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

        // Update content
        const appContent = document.getElementById('app-content');
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

        console.log('Page loaded:', page);
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('app-content').innerHTML = '<div class="alert alert-danger">Error loading page.</div>';
    }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    // Load current page if navigated directly
    loadPage(window.location.pathname.split('/').pop() || 'index.html');
});
