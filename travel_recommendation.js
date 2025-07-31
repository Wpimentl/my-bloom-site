document.addEventListener("DOMContentLoaded", () => { // Line 1
  // All your existing JavaScript goes here...



let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let query = document.getElementById("searchInput"); // Changed ID to match HTML
let resultsContainer = document.getElementById("resultsContainer"); // Changed ID to match HTML
let dropdown = document.getElementById("dropdown"); // Changed mydiv to a clearer name
let close = document.getElementById("close-btn"); // Added a new variable for the close button

// Function to clear the search input and results dropdown
const clearSearch = () => {
    query.value = "";
    resultsContainer.innerHTML = ""; // Clear the results
    dropdown.style.display = "none";
    console.log("Clearing");
};

clearbtn.addEventListener("click", clearSearch);

const showResult = (name, img, info) => {
    dropdown.style.display = "block";
    resultsContainer.innerHTML = `
        <h2 class="title">${name}</h2>
        <img class="search-img" src="${img}" alt="${name}">
        <p class="description">${info}</p>
    `;
};

const showResults = (results) => {
    dropdown.style.display = "block";
    resultsContainer.innerHTML = ""; // Clear previous results before adding new ones
    
    // If there are results, loop through them and add them to the page
    if (results.length > 0) {
        results.forEach(result => {
            resultsContainer.innerHTML += `
                <div class="result-item">
                    <h2 class="title">${result.name}</h2>
                    <img class="search-img" src="${result.imageUrl}" alt="${result.name}">
                    <p class="description">${result.description}</p>
                </div>
            `;
        });
    } else {
        // If no results, show the not found message
        searchError();
    }
};


const closeDropdown = () => {
    dropdown.style.display = "none";
    query.value = "";
    resultsContainer.innerHTML = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
    dropdown.style.display = "block";
    resultsContainer.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

fetch("travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
        const search = () => {
            let searchQuery = query.value.toLowerCase();
            let foundResults = []; // Use an array to collect all matching results

            // Check countries
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchQuery)) {
                        foundResults.push(city);
                    }
                });
            });

            // Check temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(searchQuery)) {
                    foundResults.push(temple);
                }
            });

            // Check beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(searchQuery)) {
                    foundResults.push(beach);
                }
            });

            showResults(foundResults); // Pass all results to the display function
        };

        searchbtn.addEventListener("click", search);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        alert("Failed to load travel recommendations. Please try again later.");
    });


}); 