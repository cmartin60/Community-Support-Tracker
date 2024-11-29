// Attach an event listener to the form submission
document.getElementById('volunteerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve form input values
    const charityName = document.getElementById('charityName').value.trim();
    const hoursVolunteered = parseInt(document.getElementById('hoursVolunteered').value, 10);
    const volunteerDate = document.getElementById('volunteerDate').value;
    const experienceRating = parseInt(document.getElementById('experienceRating').value, 10);
  
    // Validate inputs
    if (!charityName || !hoursVolunteered || !volunteerDate || !experienceRating) {
      alert('All fields must be filled out.');
      return;
    }
  
    if (hoursVolunteered <= 0) {
      alert('Hours volunteered must be a positive number.');
      return;
    }
  
    if (experienceRating < 1 || experienceRating > 5) {
      alert('Experience rating must be between 1 and 5.');
      return;
    }
  
    // Create a temporary data object to store form inputs
    const volunteerLog = {
      charityName,
      hoursVolunteered,
      volunteerDate,
      experienceRating,
    };
  
    // Log the object to the console (can be replaced with data storage in future stages)
    console.log('Volunteer Hours Logged:', volunteerLog);
  
    // Notify the user of successful submission
    alert('Volunteer hours logged successfully!');
  });
  