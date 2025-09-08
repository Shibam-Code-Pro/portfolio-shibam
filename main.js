// Main JavaScript file for Portfolio Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    initializeBackToTop();
    initializeContactForm();
    initializeAnimations();
});

// Initialize mobile navigation toggle
function initializeNavigation() {
    const navToggle = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navCollapse.classList.contains('show')) {
                navToggle.click();
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize back to top button functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize contact form validation and submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Add real-time validation
    nameField.addEventListener('blur', function() {
        validateName(this);
    });
    
    emailField.addEventListener('blur', function() {
        validateEmail(this);
    });
    
    subjectField.addEventListener('blur', function() {
        validateSubject(this);
    });
    
    messageField.addEventListener('blur', function() {
        validateMessage(this);
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateContactForm();
        
        if (isValid) {
            submitContactForm();
        }
    });
}

// Validate name field
function validateName(field) {
    const value = field.value.trim();
    
    if (value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        showFieldError(field, 'Name can only contain letters and spaces');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Validate email field
function validateEmail(field) {
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Validate subject field
function validateSubject(field) {
    const value = field.value.trim();
    
    if (value.length < 5) {
        showFieldError(field, 'Subject must be at least 5 characters long');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Validate message field
function validateMessage(field) {
    const value = field.value.trim();
    
    if (value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

// Show field error state
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

// Show field success state
function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = '';
    }
}

// Validate entire contact form
function validateContactForm() {
    const nameValid = validateName(document.getElementById('name'));
    const emailValid = validateEmail(document.getElementById('email'));
    const subjectValid = validateSubject(document.getElementById('subject'));
    const messageValid = validateMessage(document.getElementById('message'));
    
    return nameValid && emailValid && subjectValid && messageValid;
}

// Submit contact form (simulation)
function submitContactForm() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(function() {
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Remove validation classes
        const fields = document.querySelectorAll('#contactForm .form-control');
        fields.forEach(function(field) {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Show success message
        showSuccessMessage();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Show success message after form submission
function showSuccessMessage() {
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
    successAlert.innerHTML = `
        <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(successAlert);
    
    // Auto-remove alert after 5 seconds
    setTimeout(function() {
        if (successAlert.parentNode) {
            successAlert.remove();
        }
    }, 5000);
}

// Initialize scroll animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .education-item');
    
    // Add fade-in class to elements
    animatedElements.forEach(function(element) {
        element.classList.add('fade-in');
    });
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Initial check
    checkAnimations();
}

// Check which elements should be animated
function checkAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    animatedElements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events for better performance
window.addEventListener('scroll', debounce(function() {
    updateActiveNavLink();
    checkAnimations();
}, 10));
