// Pine Valley Tree Services - Contact Form Handling
// This is a demonstration script. In production, forms would submit to a backend API.

document.addEventListener('DOMContentLoaded', function() {
    // Quote Request Form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
    }

    // Firewood Order Form
    const firewoodForm = document.getElementById('firewoodForm');
    if (firewoodForm) {
        firewoodForm.addEventListener('submit', handleFirewoodSubmit);
    }
});

function handleQuoteSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('quote-name').value,
        email: document.getElementById('quote-email').value,
        phone: document.getElementById('quote-phone').value,
        address: document.getElementById('quote-address').value,
        service: document.getElementById('quote-service').value,
        message: document.getElementById('quote-message').value
    };

    // In production, this would send to a backend API
    console.log('Quote Request:', formData);

    // Show success message
    showSuccessMessage('Thank you for your quote request! We\'ll contact you within 24 hours.');

    // Reset form
    e.target.reset();
}

function handleFirewoodSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('fw-name').value,
        email: document.getElementById('fw-email').value,
        phone: document.getElementById('fw-phone').value,
        address: document.getElementById('fw-address').value,
        woodType: document.getElementById('fw-wood-type').value,
        quantity: document.getElementById('fw-quantity').value,
        delivery: document.getElementById('fw-delivery').value,
        notes: document.getElementById('fw-notes').value
    };

    // In production, this would send to a backend API
    console.log('Firewood Order:', formData);

    // Show success message
    showSuccessMessage('Thank you for your firewood order! We\'ll contact you to confirm delivery details.');

    // Reset form
    e.target.reset();
}

function showSuccessMessage(message) {
    // Create success message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4a7c2c;
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 500px;
            text-align: center;
            animation: slideDown 0.3s ease;
        ">
            <p style="margin: 0; font-weight: 600;">${message}</p>
        </div>
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(messageDiv);

    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
