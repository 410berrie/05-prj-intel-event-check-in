// Get all needed DOM elements
const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

//Track attendance
let conunt = 0;
const maxAttendees = 50; // Set a maximum number of attendees

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    //Get form values
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    console.log(`Attendee Name: ${name}, Team: ${teamName}`);

    // Increment count
    conunt++;
    console.log(`Current attendance count: ${conunt}`);

    //Update progress bar
    const percentage = Math.round((conunt / maxAttendees) * 100) + "%";
    console.log(`Attendance percentage: ${percentage}`);

    //Update Team count
    const teamCounter = document.getElementById(`${team}Count`);
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    //Show welcome message
    const message = `Welcome, ${name}! You have checked in with the ${teamName} team.`;
    console.og(message);

    //Reset form
    form.reset();
});