const { validate, hideErrors, showError, formHasErrors } = require('./donationForm');

describe('Donation Form Validation Tests', () => {
    beforeEach(() => {
        // Set up the DOM for the form
        document.body.innerHTML = `
            <form id="donation-form">
                <input type="text" id="charity-name" />
                <span id="charity-name-error" class="donation-error"></span>
                <input type="number" id="donation-amount" />
                <span id="donation-amount-error" class="donation-error"></span>
                <input type="date" id="donation-date" />
                <span id="donation-date-error" class="donation-error"></span>
                <input type="text" id="donor-comment" />
            </form>
        `;

        // Attach the form submission event listener
        document.getElementById("donation-form").addEventListener("submit", function (e) {
            validate(e);
        });
    });

    test('validate function prevents submission on errors', () => {
        const mockEvent = { preventDefault: jest.fn() };
        validate(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test('formHasErrors detects empty fields correctly', () => {
        expect(formHasErrors()).toBe(true); // All fields are empty

        // Populate form fields
        document.getElementById('charity-name').value = 'Helping Hands';
        document.getElementById('donation-amount').value = '50';
        document.getElementById('donation-date').value = '2024-11-28';

        expect(formHasErrors()).toBe(false); // No errors after filling fields
    });

    test('hideErrors clears all error messages', () => {
        const errorField = document.getElementById('charity-name-error');
        errorField.style.display = 'block';
        hideErrors();
        expect(errorField.style.display).toBe('none');
    });

    test('showError displays the correct error message', () => {
        showError('charity-name', 'charity-name-error', '* Charity name is required.');
        const errorField = document.getElementById('charity-name-error');
        expect(errorField.innerText).toBe('* Charity name is required.');
        expect(errorField.style.display).toBe('block');
    });
});
