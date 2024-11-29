// Validate form on submit
document.getElementById("donation-form").addEventListener("submit", function (e) {
    validate(e); 
});

// Main validation function
function validate(e) {
    hideErrors();
    if (formHasErrors()) {
        e.preventDefault();
    } else {
        alert("Thank you for your donation!");
    }
}

// Hide all error messages
function hideErrors() {
    let errorFields = document.getElementsByClassName("donation-error");
    for (let i = 0; i < errorFields.length; i++) {
        errorFields[i].style.display = "none"; 
    }
}

// Show specific error for a form field
function showError(formField, errorId, message) {
    document.getElementById(errorId).innerText = message; 
    document.getElementById(errorId).style.display = "block";
    document.getElementById(formField).focus();
}

// Check if any form field has errors
function formHasErrors() {
    let errorFlag = false;

    // Charity Name validation
    let charityName = document.getElementById("charity-name").value.trim();
    if (charityName === "") {
        showError("charity-name", "charity-name-error", "* Charity name is required.");
        errorFlag = true;
    }

    // Donation Amount validation
    let donationAmount = parseFloat(document.getElementById("donation-amount").value);
    if (isNaN(donationAmount) || donationAmount <= 0) {
        showError("donation-amount", "donation-amount-error", "* Donation amount must be a valid positive number.");
        errorFlag = true;
    }

    // Date of Donation validation
    let donationDate = document.getElementById("donation-date").value.trim();
    if (donationDate === "") {
        showError("donation-date", "donation-date-error", "* Date of donation is required.");
        errorFlag = true;
    }

    return errorFlag; // Return true if there are errors, false if no errors
}
