document.getElementById('volunteerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Retrieve input values from the form
  const charityName = document.getElementById('charityName').value.trim();
  const hoursVolunteered = parseInt(document.getElementById('hoursVolunteered').value, 10);
  const volunteerDate = document.getElementById('volunteerDate').value;
  const experienceRating = parseInt(document.getElementById('experienceRating').value, 10);

  // Validate form inputs
  if (!charityName || !hoursVolunteered || !volunteerDate || !experienceRating) {
    alert('All fields must be filled out.');
    return;
  }

  if (hoursVolunteered <= 0) {
    alert('The number of hours volunteered must be a positive value.');
    return;
  }

  if (experienceRating < 1 || experienceRating > 5) {
    alert('The experience rating must be between 1 and 5.');
    return;
  }

  // Create a temporary object to store data
  const volunteerLog = {
    charityName,
    hoursVolunteered,
    volunteerDate,
    experienceRating,
  };

  console.log('Volunteer hours logged successfully:', volunteerLog);
  alert('Your volunteer hours have been logged successfully!');
});
