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

            });
        };
    });
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



var displayBreweryCard = function(data) {
    for(var i = 0; i < data.length; i++) {
        var breweryData = {
            breweryName: data[i].name,
            breweryStreet: data[i].street,
            breweryPhone: data[i].phone,
            breweryWebsite: data[i].website_url
        }
        console.log(breweryData);
    };

// REMOVE FOR LOOP AND MAKE IT LIKE THE WEATHER DASHBOARD

    var placeHoldEl = document.getElementById("place-hold-brewery");
    placeHoldEl.remove();
    var cardContentEl = document.getElementById("card");
    var cardTitleEl = document.createElement("p");
    cardTitleEl.setAttribute("class", "title");
    cardTitleEl.textContent = breweryData.breweryName;
    var cardSubTitleEl = document.createElement("p");
    cardSubTitleEl.setAttribute("class", "subtitle");
    cardSubTitleEl.textContent = breweryData.breweryStreet;
    cardContentEl.append(cardTitleEl, cardSubTitleEl);
    
};




























userFormEl.addEventListener("submit", formSubmitHandler);
userFormBreweryEl.addEventListener("submit", breweryFormSubmitHandler);