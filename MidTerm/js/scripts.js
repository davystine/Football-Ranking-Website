$(document).ready(function() {
    let clubs = [];
    let isThemeDark = false;

    // Handle form submission to add a new club
    $('#addClubForm').submit(function(event) {
        event.preventDefault();
        const clubName = $('#clubName').val();
        const clubCountry = $('#clubCountry').val();
        const clubPoints = $('#clubPoints').val();
        const newClub = { name: clubName, country: clubCountry, points: parseInt(clubPoints) };
        clubs.push(newClub);
        $('#clubName').val('');
        $('#clubCountry').val('');
        $('#clubPoints').val('');
        renderTable(); // Render the updated table
    });

    // Function to render the clubs table
    function renderTable() {
        const $tbody = $('#clubsList');
        $tbody.empty();
        clubs.forEach((club, index) => {
            const $row = $(`<tr>
                <td class="club-name" contenteditable="true">${club.name}</td>
                <td class="club-country" contenteditable="true">${club.country}</td>
                <td class="club-points" contenteditable="true">${club.points}</td>
                <td><button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button></td>
            </tr>`);
            $tbody.append($row);
        });
    }

    // Handle delete button click to remove a club from the list
    $('#clubsList').on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        clubs.splice(index, 1); // Remove the club from the array
        renderTable(); // Render the updated table
    });

    // Handle sorting by ranking points
    $('.sort').click(function() {
        const sortOrder = $(this).data('sort');
        clubs.sort((a, b) => sortOrder === 'asc' ? a.points - b.points : b.points - a.points);
        renderTable(); // Render the sorted table
    });

    // Handle search input to filter clubs
    $('#search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const filteredClubs = clubs.filter(club => 
            club.name.toLowerCase().includes(searchTerm) ||
            club.country.toLowerCase().includes(searchTerm) ||
            club.points.toString().includes(searchTerm)
        );
        renderFilteredTable(filteredClubs); // Render the filtered table
    });

    // Function to render the filtered clubs table
    function renderFilteredTable(filteredClubs) {
        const $tbody = $('#clubsList');
        $tbody.empty();
        filteredClubs.forEach((club, index) => {
            const $row = $(`<tr>
                <td class="club-name" contenteditable="true">${club.name}</td>
                <td class="club-country" contenteditable="true">${club.country}</td>
                <td class="club-points" contenteditable="true">${club.points}</td>
                <td><button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button></td>
            </tr>`);
            $tbody.append($row);
        });
    }

    // Handle theme toggle switch
    $('#themeToggleSwitch').change(function() {
        $('body').toggleClass('theme-dark'); // Toggle theme class
        isThemeDark = !isThemeDark;
    });
});
