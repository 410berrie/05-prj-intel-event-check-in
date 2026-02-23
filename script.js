// Get all needed DOM elements
const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');
const greeting = document.getElementById('greeting');
const attendeeCountDisplay = document.getElementById('attendeeCount');
const progressBar = document.getElementById('progressBar');

//Track attendance
let count = 0;
const maxAttendees = 50; // Set a maximum number of attendees

//Team data structure
const teamData = {
    water: { name: 'Team Water Wise', attendees: [] },
    zero: { name: 'Team Net Zero', attendees: [] },
    power: { name: 'Team Renewables', attendees: [] }
};

// Load data from local storage on page load
function loadFromLocalStorage() {
    const savedCount = localStorage.getItem('attendance_count');
    const savedTeamData = localStorage.getItem('team_data');

    if (savedCount) {
        count = parseInt(savedCount);
        attendeeCountDisplay.textContent = count;
        const percentage = Math.round((count / maxAttendees) * 100);
        progressBar.style.width = percentage + "%";
    }

    if (savedTeamData) {
        const parsedData = JSON.parse(savedTeamData);
        teamData.water.attendees = parsedData.water.attendees || [];
        teamData.zero.attendees = parsedData.zero.attendees || [];
        teamData.power.attendees = parsedData.power.attendees || [];

        //Update team counters and attendee lists
        document.getElementById('waterCount').textContent = teamData.water.attendees.length;
        document.getElementById('zeroCount').textContent = teamData.zero.attendees.length;
        document.getElementById('powerCount').textContent = teamData.power.attendees.length;

        displayAttendeeList('water');
        displayAttendeeList('zero');
        displayAttendeeList('power');
    }
}

// Save data to local storage
function saveToLocalStorage() {
    localStorage.setItem('attendance_count', count);
    localStorage.setItem('team_data', JSON.stringify(teamData));
}

// Display attendee list for a team
function displayAttendeeList(team) {
    const listContainer = document.getElementById(`${team}List`);
    const attendees = teamData[team].attendees;

    listContainer.innerHTML = '';

    if (attendees.length > 0) {
        attendees.forEach(function(attendee) {
            const listItem = document.createElement('div');
            listItem.className = 'attendee-item';
            listItem.textContent = attendee;
            listContainer.appendChild(listItem);
        });
    }
}

// Show celebration when max attendance is reached
function showCelebration() {
    const celebration = document.getElementById('celebration');
    const winningTeam = getWinningTeam();

    const celebrationMessage = document.getElementById('celebrationMessage');
    celebrationMessage.textContent = `Congratulations! You've reached 50 attendees! ${winningTeam.name} is leading with ${winningTeam.count} members!`;

    celebration.style.display = 'flex';
}

// Get the team with most attendees
function getWinningTeam() {
    const teams = [
        { name: 'Team Water Wise', count: teamData.water.attendees.length },
        { name: 'Team Net Zero', count: teamData.zero.attendees.length },
        { name: 'Team Renewables', count: teamData.power.attendees.length }
    ];

    let winning = teams[0];
    for (let i = 1; i < teams.length; i++) {
        if (teams[i].count > winning.count) {
            winning = teams[i];
        }
    }

    return winning;
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    //Get form values
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    console.log(`Attendee Name: ${name}, Team: ${teamName}`);

    // Increment count
    count++;
    console.log(`Current attendance count: ${count}`);

    //Add attendee to team
    teamData[team].attendees.push(name);

    //Update attendee count display
    attendeeCountDisplay.textContent = count;

    //Update progress bar
    const percentage = Math.round((count / maxAttendees) * 100);
    progressBar.style.width = percentage + "%";
    console.log(`Attendance percentage: ${percentage}%`);

    //Update Team count
    const teamCounter = document.getElementById(`${team}Count`);
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    //Display attendee list
    displayAttendeeList(team);

    //Show welcome message
    const message = `Welcome, ${name}! You have checked in with the ${teamName} team.`;
    greeting.textContent = message;
    greeting.style.display = 'block';
    console.log(message);

    //Save to local storage
    saveToLocalStorage();

    //Check if max attendance reached
    if (count >= maxAttendees) {
        showCelebration();
    }

    //Reset form
    form.reset();
});

// Load data when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});