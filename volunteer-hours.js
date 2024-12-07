// Load data from localStorage
function loadVolunteerData() {
  return JSON.parse(localStorage.getItem('volunteerData')) || [];
}

// Save data to localStorage
function saveVolunteerData(data) {
  localStorage.setItem('volunteerData', JSON.stringify(data));
}

// Calculate total hours
function calculateTotalHours(data) {
  return data.reduce((total, entry) => total + entry.hoursVolunteered, 0);
}

// Update the table and summary
function updateVolunteerTable() {
  const data = loadVolunteerData();
  const tableBody = document.querySelector('#volunteerTable tbody');
  const totalHoursElement = document.getElementById('totalHours');

  tableBody.innerHTML = ''; // Clear table rows
  data.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.charityName}</td>
      <td>${entry.hoursVolunteered}</td>
      <td>${entry.volunteerDate}</td>
      <td>${entry.experienceRating}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  totalHoursElement.textContent = `Total Hours Volunteered: ${calculateTotalHours(data)}`;
}

// Delete a specific log
function deleteVolunteerLog(index) {
  const data = loadVolunteerData();
  data.splice(index, 1); // Remove the entry at the index
  saveVolunteerData(data);
  updateVolunteerTable();
}

// Handle form submission
document.getElementById('volunteerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const charityName = document.getElementById('charityName').value.trim();
  const hoursVolunteered = parseInt(document.getElementById('hoursVolunteered').value, 10);
  const volunteerDate = document.getElementById('volunteerDate').value;
  const experienceRating = parseInt(document.getElementById('experienceRating').value, 10);

  // Validate inputs
  if (!charityName || !hoursVolunteered || !volunteerDate || !experienceRating) {
    alert('All fields are required!');
    return;
  }

  if (hoursVolunteered <= 0) {
    alert('Hours volunteered must be greater than 0.');
    return;
  }

  if (experienceRating < 1 || experienceRating > 5) {
    alert('Experience rating must be between 1 and 5.');
    return;
  }

  const data = loadVolunteerData();
  data.push({ charityName, hoursVolunteered, volunteerDate, experienceRating });
  saveVolunteerData(data);

  updateVolunteerTable();
  event.target.reset();
});

// Handle delete button clicks
document.getElementById('volunteerTable').addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    deleteVolunteerLog(index);
  }
});

// Initialize table on page load
document.addEventListener('DOMContentLoaded', updateVolunteerTable);

                                              