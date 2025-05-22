document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const logo = document.querySelector('.flex-shrink-0 img');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (!mobileMenu.classList.contains('hidden')) {
            logo.classList.add('h-12');
        } else {
            logo.classList.remove('h-12');
        }
    });
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                logo.classList.remove('h-12');
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function () {
            if (this.textContent.trim() === 'Book Free Call') {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerOffset = 80;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (this.textContent.trim() === 'View All Projects') {
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                    const headerOffset = 80;
                    const elementPosition = portfolioSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stats-count')) {
                    animateValue(entry.target, 0, parseInt(entry.target.dataset.target), 2000);
                }
            }
        });
    });
    document.querySelectorAll('.stats-count').forEach(el => observer.observe(el));
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.querySelector('div').textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Initialize EmailJS (Replace 'YOUR_PUBLIC_KEY' with your actual public key)
        emailjs.init('gcULbDlD5aK8ODPg3');

        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Send the email using EmailJS
        emailjs.send('service_9zk5y8k', 'template_o0q7gpv', {
            from_name: data.name,
            from_email: data.email,
            message: data.message
        }).then(response => {
            console.log('Email sent successfully:', response);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full';
            successMessage.textContent = 'Message sent successfully!';
            document.body.appendChild(successMessage);

            // Slide in success message
            setTimeout(() => {
                successMessage.style.transform = 'translateX(0)';
            }, 100);

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.transform = 'translateX(100%)';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);

            // Reset form
            document.getElementById('contactForm').reset();
        }).catch(error => {
            console.error('Email sending failed:', error);

            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
            errorMessage.textContent = 'Failed to send message. Please try again.';
            document.body.appendChild(errorMessage);

            setTimeout(() => errorMessage.remove(), 3000);
            this.reset();
        }, (error) => {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please try again.');
        });
    });
});