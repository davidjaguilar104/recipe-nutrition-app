// start of food element variables and functions
var userFormEl = document.getElementById("user-form");
var foodInputEl = document.getElementById("food-search");
var mealTypeSelect = document.getElementById("meal-type");
var cuisineTypeSelect = document.getElementById("cuisine-type");
var dietTypeSelect = document.getElementById("diet-type");
var healthLabelSelect = document.getElementById("health-label");
var moreRecipes = document.getElementById("moreRecipes")
var foodResults = [];
var foodResultsIndex = 0 //tracks index of the foodResults array so we can add more cards onto the page
var foodResultsCount = 3 //this tracks the amount of cards on the page



var formSubmitHandler = function(event) {
    event.preventDefault(); 

    var foodSearched = foodInputEl.value.trim();
    foodInputEl.value = "";
    
    console.log(foodSearched); // just for making sure user input is captured with listener

    var mealType = mealTypeSelect.value;
    if (!mealType) {
        var mealTypeQuery = "";
    } else {
        var mealTypeQuery = "&mealType=" + mealType;
    }

    var cuisineType = cuisineTypeSelect.value;
    if (!cuisineType) {
        var cuisineTypeQuery = "";
    } else {
        var cuisineTypeQuery = "&cuisineType=" + cuisineType;
    }

    var dietType = dietTypeSelect.value;
    if (!dietType) {
        var dietQuery = "";
    } else {
        var dietQuery = "&diet=" + dietType;
    }

    var foodRestriction = healthLabelSelect.value;
    if (!foodRestriction) {
        var healthQuery = "";
    } else {
        var healthQuery = "&health=" + foodRestriction;
    }



    var recipeApiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + foodSearched + mealTypeQuery + cuisineTypeQuery + dietQuery + healthQuery + "&app_id=cb4a3930&app_key=84e841d5e80287f37c2ce654dc65c9d0";

    fetch(recipeApiUrl) 
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {

                foodResults = data.hits
                generateCards()
                moreRecipes.classList.toggle("is-hidden")
            });
        };
    });
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
    
    var imgArray = new Array();
    imgArray[0] = new Image();
    imgArray[0].src = 'assets\images\carlos-blanco-WzPdP9pn7go-unsplash_2.jpg';
    imgArray[1] = new Image();
    imgArray[1].src = 'assets\images\drew-farwell-9RLk3ZpulUk-unsplash (1).jpg';
    imgArray[2] = new Image();
    imgArray[2].src = 'assets\images\elevate-8LlEY7DEvWo-unsplash (1).jpg';
    imgArray[3] = new Image();
    imgArray[3].src = 'assets\images\elevate-Cdq3ziSoeGY-unsplash_2.jpg';
    imgArray[4] = new Image();
    imgArray[4].src = 'assets\images\elevate-KJzrLIfq2Zo-unsplash (1).jpg';
    imgArray[5] = new Image();
    imgArray[5].src = 'assets\images\fred-moon-0yqa0rMCsYk-unsplash (1).jpg';
    imgArray[6] = new Image();
    imgArray[6].src = 'assets\images\iwona-castiello-d-antonio-PPlopyFtwFM-unsplash (1).jpg';
    imgArray[7] = new Image();
    imgArray[7].src = 'assets\images\jesse-martini-LnGUREkDuAM-unsplash (1).jpg';
    imgArray[8] = new Image();
    imgArray[8].src = 'assets\images\jim-harris-zDlusnb3G3Q-unsplash_2.jpg';    
    imgArray[9] = new Image();
    imgArray[9].src = 'assets\images\josh-olalde-5PGp5nDOKxI-unsplash_2.jpg';
    imgArray[10] = new Image();
    imgArray[10].src = 'assets\images\katherine-conrad-QL3SaEwio_k-unsplash (1).jpg';
    imgArray[11] = new Image();
    imgArray[11].src = 'assets\images\kevin-kristhian-29zMpabSkXo-unsplash (1).jpg';
    imgArray[12] = new Image();
    imgArray[12].src = 'assets\images\louis-hansel-WCm4dFvZnMM-unsplash_1.jpg';
    imgArray[13] = new Image();
    imgArray[13].src = 'assets\images\marco-montero-pisani-5qTxX7nicco-unsplash_2.jpg';
    imgArray[14] = new Image();
    imgArray[14].src = 'assets\images\martin-knize-DQpHtE5WY-U-unsplash.jpg';
    imgArray[15] = new Image();
    imgArray[15].src = 'assets\images\meritt-thomas-2UsNF4Az-Ko-unsplash_1.jpg';
    imgArray[16] = new Image();
    imgArray[16].src = 'assets\images\meritt-thomas-OGTEP0LyYNk-unsplash (1).jpg';
    imgArray[17] = new Image();
    imgArray[17].src = 'assets\images\meritt-thomas-OGTEP0LyYNk-unsplash_1.jpg';
    imgArray[18] = new Image();
    imgArray[18].src = 'assets\images\miguel-angel-cardona-jr-yFHJga68toQ-unsplash_2.jpg';
    imgArray[19] = new Image();
    imgArray[19].src = 'assets\images\nick-hillier-xBXF9pr6LQo-unsplash_1.jpg';
    imgArray[20] = new Image();
    imgArray[20].src = 'assets\images\roberta-keiko-kitahara-santana-RfL3l-I1zhc-unsplash (1).jpg';


};



























moreRecipes.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(foodResultsIndex, foodResultsCount);
generateCards();
});
userFormEl.addEventListener("submit", formSubmitHandler);
userFormBreweryEl.addEventListener("submit", breweryFormSubmitHandler);