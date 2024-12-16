'use strict';

// Select all blog items and modals
const blogItems = document.querySelectorAll('.blog-item');
const modals = document.querySelectorAll('.modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Function to open the modal
blogItems.forEach(item => {
    const modalId = item.getAttribute('data-modal');
    if (modalId) {
        item.addEventListener('click', () => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            } else {
                console.error(`No modal found with ID: ${modalId}`);
            }
        });
    } else {
        console.error('No data-modal attribute on blog-item:', item);
    }
});

// Function to close the modal
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
