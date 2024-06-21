$(document).ready(function() {
    // Initialize clubs array and theme preference
    let clubs = [];
    let isThemeDark = localStorage.getItem('isThemeDark') === 'true';

    // Apply theme based on saved preference
    if (isThemeDark) {
        $('body').addClass('theme-dark');
        $('#themeToggleSwitch').prop('checked', true);
    }

    // Function to render the clubs table
    function renderTable(clubList) {
        const $tbody = $('#clubsList').empty();
        clubList.forEach((club, index) => {
            const $row = $(`
                <tr>
                    <td class="club-name" contenteditable="true">${club.name}</td>
                    <td class="club-country" contenteditable="true">${club.country}</td>
                    <td class="club-points" contenteditable="true">${club.points}</td>
                    <td><button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button></td>
                </tr>
            `);
            $tbody.append($row);
        });
    }

    // Function to update the table by re-rendering it
    function updateTable() {
        renderTable(clubs);
    }

    // Handle form submission to add a new club
    $('#addClubForm').submit(function(event) {
        event.preventDefault();
        const clubName = $('#clubName').val();
        const clubCountry = $('#clubCountry').val();
        const clubPoints = parseInt($('#clubPoints').val());
        const newClub = { name: clubName, country: clubCountry, points: clubPoints };
        clubs.push(newClub);
        updateTable();
        // Clear the form inputs after submission
        $('#clubName').val('');
        $('#clubCountry').val('');
        $('#clubPoints').val('');
    });

    // Handle delete button click to remove a club from the list
    $('#clubsList').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        clubs.splice(index, 1); // Remove the club from the array
        updateTable(); // Re-render the table
    });

    // Handle sorting by ranking points
    $('.sort').click(function() {
        const sortOrder = $(this).data('sort');
        // Sort the clubs array based on the selected order
        clubs.sort((a, b) => sortOrder === 'asc' ? a.points - b.points : b.points - a.points);
        updateTable(); // Re-render the table
    });

    // Handle search input to filter clubs
    $('#search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        // Filter the clubs array based on the search term
        const filteredClubs = clubs.filter(club => 
            club.name.toLowerCase().includes(searchTerm) ||
            club.country.toLowerCase().includes(searchTerm) ||
            club.points.toString().includes(searchTerm)
        );
        renderTable(filteredClubs); // Render the filtered table
    });

    // Handle form submission for contact form
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        const message = `
            Name: ${$('#userName').val()}\n
            Email: ${$('#userEmail').val()}\n
            Phone: ${$('#userPhone').val()}\n
            Message: ${$('#userMessage').val()}
        `;
        // Display the form submission data in a modal
        $('#exampleModal .modal-body').text(message);
        $('#exampleModal').modal('show');
        // Clear the form inputs after submission
        $('#userName').val('');
        $('#userEmail').val('');
        $('#userPhone').val('');
        $('#userMessage').val('');
    });

    // Handle theme toggle switch
    $('#themeToggleSwitch').change(function() {
        $('body').toggleClass('theme-dark'); // Toggle theme class
        isThemeDark = !isThemeDark; // Update theme preference
        localStorage.setItem('isThemeDark', isThemeDark); // Save theme preference to local storage
    });
});
