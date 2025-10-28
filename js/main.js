document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            primaryNav.classList.toggle('active');
            this.classList.toggle('active');

            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (primaryNav && primaryNav.classList.contains('active')) {
                    primaryNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            }
        });
    });

    // Header scroll effect
    const PrinterHeader = document.querySelector('.Printer-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            PrinterHeader.style.transform = 'translateY(0)';
            PrinterHeader.style.boxShadow = 'var(--box-shadow)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > PrinterHeader.offsetHeight) {
            // Scrolling down
            PrinterHeader.style.transform = `translateY(-${PrinterHeader.offsetHeight}px)`;
        } else {
            // Scrolling up
            PrinterHeader.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Search Functionality
    const searchForms = document.querySelectorAll('.search-box, .hero-search');
    searchForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = this.querySelector('input[type="text"]');
                const searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    // In a real implementation, this would redirect to search results
                    console.log(`Searching for: ${searchTerm}`);
                    // Example: window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                }
            });
        }
    });

    // Add animation to cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.action-card, .category-card, .contact-method, .tool-card');

        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.action-card, .category-card, .contact-method, .tool-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on page load
    setTimeout(animateOnScroll, 500);

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    // Style the back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--Printer-blue);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            background-color: var(--Printer-dark-blue);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .primary-nav.active {
            display: block !important;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .primary-nav.active ul {
            flex-direction: column;
            padding: 20px;
            gap: 15px;
        }

        .primary-nav.active a {
            display: block;
            padding: 12px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        @media (max-width: 768px) {
            .primary-nav {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation
    document.body.classList.add('loaded');


// Search suggestions (simulated)
    const searchInputs = document.querySelectorAll('.search-input, .product-search');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.setAttribute('placeholder', 'Try: "EliteBook 840", "OfficeJet Pro", "Envy 13"...');
        });

        input.addEventListener('blur', function() {
            this.setAttribute('placeholder', 'Search all support');
        });
    });

    // Add Printer-style loading spinner
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .Printer-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid var(--Printer-blue);
            border-radius: 50%;
            animation: Printer-spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes Printer-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
    `;
    document.head.appendChild(spinnerStyle);

    // Printer-style loading function
    function showPrinterLoading() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="Printer-spinner"></div>
            <p style="margin-top: 15px; color: var(--Printer-blue); font-weight: 500;">Loading Printer Support...</p>
        `;
        document.body.appendChild(overlay);

        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 1500);
    }

    // Add Printer logo animation on load
    const PrinterLogo = document.querySelector('.Printer-logo img');
    if (PrinterLogo) {
        PrinterLogo.style.opacity = '0';
        PrinterLogo.style.transform = 'scale(0.8)';
        PrinterLogo.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            PrinterLogo.style.opacity = '1';
            PrinterLogo.style.transform = 'scale(1)';
        }, 300);
    }

    // Add Printer-specific meta tags and structured data
    const PrinterMetaTags = `
        <meta name="description" content="Get Printer customer support for your Printer products including laptops, desktops, Printers, tablets and more. Download drivers, troubleshoot issues, and get expert help.">
        <meta name="keywords" content="Printer support, Printer drivers, Printer troubleshooting, Printer customer service, Printer warranty, Printer product registration">
        <meta name="author" content="Printer Development Company, L.P.">
        <meta property="og:title" content="Official Printer® Support | Printer® Customer Support">
        <meta property="og:description" content="Get Printer customer support for your Printer products including laptops, desktops, Printers, tablets and more.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://support.Printer.com">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Official Printer® Support | Printer® Customer Support">
        <meta name="twitter:description" content="Get Printer customer support for your Printer products including laptops, desktops, Printers, tablets and more.">
    `;

    document.head.insertAdjacentHTML('beforeend', PrinterMetaTags);
});
