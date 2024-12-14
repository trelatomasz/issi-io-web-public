'use strict'

console.info('Yeah!! Milligram is amazing.')


function addMovie() {

    const score = document.getElementById('scoreField').value;
    const title = document.getElementById('titleField').value;
    const genre = document.getElementById('genreField').value;
    const year = document.getElementById('yearField').value;

    var movie = {
        'title': title,
        'score': score,
        'genre': genre,
        'year': year
    };
    console.log("Adding movie " + JSON.stringify(movie));


    const tableBody = document.querySelector('#moviesTable tbody');
    var rowsCount = tableBody.querySelectorAll("tr").length;
    const newRow = document.createElement('tr');
    newRow.id = "movidId-" + rowsCount;
    const checkboxCell = document.createElement('td');
    let checkboxForNewMovie = document.createElement("input");
    checkboxForNewMovie.type = "checkbox"
    checkboxCell.appendChild(checkboxForNewMovie)

    newRow.appendChild(checkboxCell);
    const titleCell = document.createElement('td');
    titleCell.textContent = movie['title'];
    newRow.appendChild(titleCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = movie['score'];
    newRow.appendChild(scoreCell);

    const genreCell = document.createElement('td');
    genreCell.textContent = movie['genre'];
    newRow.appendChild(genreCell);

    const yearCell = document.createElement('td');
    yearCell.textContent = movie['year'];
    newRow.appendChild(yearCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
}




function removeMovies(){
    var checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked");
    for (let i = 0; i < checkedBoxes.length ; i++) {

        document.getElementById("moviesTable").removeChild(checkedBoxes[i].parentNode.parentNode)
    }
}