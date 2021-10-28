// start of food element variables and functions
var userFormEl = document.getElementById("user-form");
var foodInputEl = document.getElementById("food-search");
var moreRecipes = document.getElementById("moreRecipes")
var foodResults = []
var foodResultsIndex = 0 //tracks index of the foodResults array so we can add more cards onto the page
var foodResultsCount = 3 //this tracks the amount of cards on the page



var formSubmitHandler = function(event) {
    event.preventDefault(); 

    var foodSearched = foodInputEl.value.trim();
    foodInputEl.value = "";

    console.log(foodSearched); // just for making sure user input is captured with listener
    
    var recipeApiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + foodSearched + "&app_id=cb4a3930&app_key=84e841d5e80287f37c2ce654dc65c9d0";

    fetch(recipeApiUrl) 
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {

                foodResults = data.hits
                generateCards()
                moreRecipes.classList.toggle("is-hidden")
=======
                console.log(data);
                displayRecipeCard(data);
            });
        };
    });
};

// IN THE DISPLAY CARDS A LOOP WILL BE BETTER THAN ALL THE REPEATED CODE
// need to loop through data and display different object properties at different indexes of array returned from API

var displayRecipeCard = function(data) {
  
    var placeHoldEl = document.getElementById("place-hold-rec");
    var cardContentEl = document.getElementById("card-rec");
    var cardTitleEl = document.createElement("p");
    cardTitleEl.setAttribute("class", "title");
    cardTitleEl.textContent = data.hits[0].recipe.label;
    var cardSubTitleEl = document.createElement("p");
    cardSubTitleEl.setAttribute("class", "subtitle");
    cardSubTitleEl.textContent = data.hits[0].recipe.cuisineType;
    cardContentEl.append(cardTitleEl, cardSubTitleEl);
    if(placeHoldEl) {
        placeHoldEl.remove();
    }

    // commented out below because it is still old code copied from displayBreweryCard()

    // var placeHoldTwoEl = document.getElementById("place-hold-two-rec");
    // var cardContentTwoEl = document.getElementById("card-rec-two");
    // var cardTitleTwoEl = document.createElement("p");
    // cardTitleTwoEl.setAttribute("class", "title");
    // cardTitleTwoEl.textContent = data[1].name;
    // var cardSubTitleTwoEl = document.createElement("p");
    // cardSubTitleTwoEl.setAttribute("class", "subtitle");
    // cardSubTitleTwoEl.textContent = data[1].street;
    // cardContentTwoEl.append(cardTitleTwoEl, cardSubTitleTwoEl);
    // if(placeHoldTwoEl) {
    //     placeHoldTwoEl.remove();
    // }

    // var placeHoldThreeEl = document.getElementById("place-hold-three-rec");
    // var cardContentThreeEl = document.getElementById("card-rec-three");
    // var cardTitleThreeEl = document.createElement("p");
    // cardTitleThreeEl.setAttribute("class", "title");
    // cardTitleThreeEl.textContent = data[2].name;
    // var cardSubTitleThreeEl = document.createElement("p");
    // cardSubTitleThreeEl.setAttribute("class", "subtitle");
    // cardSubTitleThreeEl.textContent = data[2].street;
    // cardContentThreeEl.append(cardTitleThreeEl, cardSubTitleThreeEl);
    // if(placeHoldThreeEl) {
    //     placeHoldThreeEl.remove();
    // }
    
};


var generateCards = function() {
    var resultsContainer = document.getElementById("recipeContainer")
    if (foodResults.length) {
        // loop over results and append HTML to results section
        for(i=foodResultsIndex; i < foodResultsCount; i++){
            //checking to make sure our index isn't higher than our array so we don't get blank cards
            if (foodResults.length-1 >= i){
                var food = foodResults[i].recipe
                //https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
                var doc = new DOMParser()
                var cardHTML = `
                <div class="column is-one-third">
                    <div class="card"
                        <div class="card-image">
                            <figure class="image middle-tile">
                                <img src="${food.image}" alt="Picture of ${food.label}">
                            </figure>
                        </div>
                    
                        <div class="card-content">
                            <p class="title">${food.label}</p>
                            <a href="${food.url}" class="button">View Recipe</a>
                        </div>
                    </div>
                </div>
                `
                var card = doc.parseFromString(cardHTML, "text/html")
                resultsContainer.appendChild(card.body.firstChild)
                foodResultsIndex++
            }
        }
        foodResultsCount+=3
    } else {
        // append HTML with no results message to results section
        resultsContainer.innerHTML = "<p class='has-text-centered'>No Results Found</p>"
    }
}





// start of brewery element variables and functions
var userFormBreweryEl = document.getElementById("user-form-brewery"); 
var cityInputEl = document.getElementById("city-search");
var breweryFilter = document.getElementById("brewery-type");

var breweryFormSubmitHandler = function(event) {
    event.preventDefault(); 

    var citySearched = cityInputEl.value.trim();
    cityInputEl.value = "";
    var typeSelected = breweryFilter.value;

    console.log(citySearched); // just for making sure user input is captured with listener
    
    var breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + citySearched + "&by_type=" + typeSelected;

    fetch(breweryApiUrl) 
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayBreweryCard(data)
            });
        };
    });
};

// IN THE DISPLAY CARDS A LOOP WILL BE BETTER THAN ALL THE REPEATED CODE
// need to loop through data and display different object properties at different indexes of array returned from API


var displayBreweryCard = function(data) {
  
    var placeHoldEl = document.getElementById("place-hold-brewery");
    var cardContentEl = document.getElementById("card");
    var cardTitleEl = document.createElement("p");
    cardTitleEl.setAttribute("class", "title");
    cardTitleEl.textContent = data[0].name;
    var cardSubTitleEl = document.createElement("p");
    cardSubTitleEl.setAttribute("class", "subtitle");
    cardSubTitleEl.textContent = data[0].street;
    cardContentEl.append(cardTitleEl, cardSubTitleEl);
    if(placeHoldEl) {
        placeHoldEl.remove();
    }

    var placeHoldTwoEl = document.getElementById("place-hold-two-brewery");
    var cardContentTwoEl = document.getElementById("card-two");
    var cardTitleTwoEl = document.createElement("p");
    cardTitleTwoEl.setAttribute("class", "title");
    cardTitleTwoEl.textContent = data[1].name;
    var cardSubTitleTwoEl = document.createElement("p");
    cardSubTitleTwoEl.setAttribute("class", "subtitle");
    cardSubTitleTwoEl.textContent = data[1].street;
    cardContentTwoEl.append(cardTitleTwoEl, cardSubTitleTwoEl);
    if(placeHoldTwoEl) {
        placeHoldTwoEl.remove();
    }

    var placeHoldThreeEl = document.getElementById("place-hold-three-brewery");
    var cardContentThreeEl = document.getElementById("card-three");
    var cardTitleThreeEl = document.createElement("p");
    cardTitleThreeEl.setAttribute("class", "title");
    cardTitleThreeEl.textContent = data[2].name;
    var cardSubTitleThreeEl = document.createElement("p");
    cardSubTitleThreeEl.setAttribute("class", "subtitle");
    cardSubTitleThreeEl.textContent = data[2].street;
    cardContentThreeEl.append(cardTitleThreeEl, cardSubTitleThreeEl);
    if(placeHoldThreeEl) {
        placeHoldThreeEl.remove();
    }
    
};



























moreRecipes.addEventListener("click", function(event) {
    event.preventDefault()
    console.log("click")
generateCards()
} )
userFormEl.addEventListener("submit", formSubmitHandler);
userFormBreweryEl.addEventListener("submit", breweryFormSubmitHandler);