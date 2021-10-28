// start of food element variables and functions
var userFormEl = document.getElementById("user-form");
var foodInputEl = document.getElementById("food-search");

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
                console.log(data);
                displayRecipeCard(data);
            });
        };
    });
};

// IN THE DISPLAY CARDS A LOOP WILL BE BETTER THAN ALL THE REPEATED CODE

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




























userFormEl.addEventListener("submit", formSubmitHandler);
userFormBreweryEl.addEventListener("submit", breweryFormSubmitHandler);