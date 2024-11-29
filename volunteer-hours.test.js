document.body.innerHTML = `
  <form id="volunteerForm">
    <input type="text" id="charityName" />
    <input type="number" id="hoursVolunteered" />
    <input type="date" id="volunteerDate" />
    <input type="number" id="experienceRating" />
    <button type="submit"></button>
  </form>
`;

require('./volunteer-hours');

describe('Volunteer Hours Tracker Tests', () => {
  const form = document.getElementById('volunteerForm');
  const charityName = document.getElementById('charityName');
  const hoursVolunteered = document.getElementById('hoursVolunteered');
  const volunteerDate = document.getElementById('volunteerDate');
  const experienceRating = document.getElementById('experienceRating');

  test('should trigger the form submission', () => {
    const mockSubmit = jest.fn((event) => event.preventDefault());
    form.addEventListener('submit', mockSubmit);
    form.dispatchEvent(new Event('submit'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  test('should alert when fields are missing', () => {
    charityName.value = '';
    hoursVolunteered.value = '';
    volunteerDate.value = '';
    experienceRating.value = '';
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    form.dispatchEvent(new Event('submit'));
    expect(alertMock).toHaveBeenCalledWith('All fields must be filled out.');
    alertMock.mockRestore();
  });

  test('should validate invalid hours volunteered', () => {
    charityName.value = 'Charity ABC';
    hoursVolunteered.value = '-10';
    volunteerDate.value = '2024-11-27';
    experienceRating.value = '5';
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    form.dispatchEvent(new Event('submit'));
    expect(alertMock).toHaveBeenCalledWith('The number of hours volunteered must be a positive value.');
    alertMock.mockRestore();
  });

  test('should validate invalid experience rating', () => {
    charityName.value = 'Charity ABC';
    hoursVolunteered.value = '5';
    volunteerDate.value = '2024-11-27';
    experienceRating.value = '6';
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    form.dispatchEvent(new Event('submit'));
    expect(alertMock).toHaveBeenCalledWith('The experience rating must be between 1 and 5.');
    alertMock.mockRestore();
  });

  test('should log correct data', () => {
    charityName.value = 'Charity ABC';
    hoursVolunteered.value = '5';
    volunteerDate.value = '2024-11-27';
    experienceRating.value = '4';
    const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    form.dispatchEvent(new Event('submit'));
    expect(consoleMock).toHaveBeenCalledWith('Volunteer hours logged successfully:', {
      charityName: 'Charity ABC',
      hoursVolunteered: 5,
      volunteerDate: '2024-11-27',
      experienceRating: 4,
    });
    consoleMock.mockRestore();
  });
});
