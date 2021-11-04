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
var moreDrinks = document.getElementById("moreDrinks");

var breweryFormSubmitHandler = function(event) {
    event.preventDefault(); 

    var citySearched = cityInputEl.value.trim();
    cityInputEl.value = "";
    var typeSelected = breweryFilter.value;

    console.log(citySearched); // just for making sure user input is captured with listener
    
    var breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + citySearched + "&by_type=" + typeSelected;

    if(!typeSelected) {
        
        breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + citySearched;
    };

    fetch(breweryApiUrl) 
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                moreDrinks.classList.toggle("is-hidden")
                breweryResults = data;
                displayBreweryCard();
            });
        };
    });
};


var breweryResults = [];
var breweryResultsIndex = 0 //tracks index of the breweryResults array so we can add more cards onto the page
var breweryResultsCount = 3 //this tracks the amount of cards on the page

var displayBreweryCard = function() {
    

    var breweryContainer = document.getElementById("breweryContainer")
    if (breweryResults.length) {
        // loop over results and append HTML to results section
        for(i=breweryResultsIndex; i < breweryResultsCount; i++){
            //checking to make sure our index isn't higher than our array so we don't get blank cards
            if (breweryResults.length-1 >= i){
                var brewery = breweryResults[i]
                console.log(brewery)
                //https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
                var doc = new DOMParser()
                var cardHTML = `
                <div class="column is-one-third">
                    <div class="card" id="drink-card">
                        <div class="card-content">
                            <p class="title">${brewery.name}</p>
                            <p class="sub-title">${brewery.street}</p>
                            <p class="sub-title">${brewery.city}</p>
                            <p class="sub-title">${brewery.state}</p>
                            <p class="sub-title">${brewery.postal_code}</p>
                            <a href="${brewery.website_url}" class="button">View Website</a>
                        </div>
                    </div>
                </div>
                `
                var card = doc.parseFromString(cardHTML, "text/html");
                breweryContainer.appendChild(card.body.firstChild);
                breweryResultsIndex++;
            }
        }
        breweryResultsCount+=3
    } else {
        // append HTML with no results message to results section
        breweryContainer.innerHTML = "<p class='has-text-centered'>No Results Found</p>"
    }

    
    function nextImage() {
        var imageCard = document.getElementById("breweryContainer");
        var imgArray = new Array(20);
    imgArray[0] = new Image();
    imgArray[0].src = 'assets/images/carlos-blanco-WzPdP9pn7go-unsplash_2.jpg';
    imgArray[1] = new Image();
    imgArray[1].src = 'assets/images/drew-farwell-9RLk3ZpulUk-unsplash (1).jpg';
    imgArray[2] = new Image();
    imgArray[2].src = 'assets/images/elevate-8LlEY7DEvWo-unsplash (1).jpg';
    imgArray[3] = new Image();
    imgArray[3].src = 'assets/images/elevate-Cdq3ziSoeGY-unsplash_2.jpg';
    imgArray[4] = new Image();
    imgArray[4].src = 'assets/images/elevate-KJzrLIfq2Zo-unsplash (1).jpg';
    imgArray[5] = new Image();
    imgArray[5].src = 'assets/images/fred-moon-0yqa0rMCsYk-unsplash (1).jpg';
    imgArray[6] = new Image();
    imgArray[6].src = 'assets/images/iwona-castiello-d-antonio-PPlopyFtwFM-unsplash (1).jpg';
    imgArray[7] = new Image();
    imgArray[7].src = 'assets/images/jesse-martini-LnGUREkDuAM-unsplash (1).jpg';
    imgArray[8] = new Image();
    imgArray[8].src = 'assets/images/jim-harris-zDlusnb3G3Q-unsplash_2.jpg';    
    imgArray[9] = new Image();
    imgArray[9].src = 'assets/images/josh-olalde-5PGp5nDOKxI-unsplash_2.jpg';
    imgArray[10] = new Image();
    imgArray[10].src = 'assets/images/katherine-conrad-QL3SaEwio_k-unsplash (1).jpg';
    imgArray[11] = new Image();
    imgArray[11].src = 'assets/images/kevin-kristhian-29zMpabSkXo-unsplash (1).jpg';
    imgArray[12] = new Image();
    imgArray[12].src = 'assets/images/louis-hansel-WCm4dFvZnMM-unsplash_1.jpg';
    imgArray[13] = new Image();
    imgArray[13].src = 'assets/images/marco-montero-pisani-5qTxX7nicco-unsplash_2.jpg';
    imgArray[14] = new Image();
    imgArray[14].src = 'assets/images/martin-knize-DQpHtE5WY-U-unsplash.jpg';
    imgArray[15] = new Image();
    imgArray[15].src = 'assets/images/meritt-thomas-2UsNF4Az-Ko-unsplash_1.jpg';
    imgArray[16] = new Image();
    imgArray[16].src = 'assets/images/meritt-thomas-OGTEP0LyYNk-unsplash (1).jpg';
    imgArray[17] = new Image();
    imgArray[17].src = 'assets/images/meritt-thomas-OGTEP0LyYNk-unsplash_1.jpg';
    imgArray[18] = new Image();
    imgArray[18].src = 'assets/images/miguel-angel-cardona-jr-yFHJga68toQ-unsplash_2.jpg';
    imgArray[19] = new Image();
    imgArray[19].src = 'assets/images/nick-hillier-xBXF9pr6LQo-unsplash_1.jpg';
    imgArray[20] = new Image();
    imgArray[20].src = 'assets/images/roberta-keiko-kitahara-santana-RfL3l-I1zhc-unsplash (1).jpg';
       
    for(var i = 0; i < imgArray.length; i++) {
            drinkCard.appendChild(imgArray[i]);
        }
        
        if(imgArray[i].src == img.src) {
                
            if(i === imgArray.length) {
                document.getElementById("picture").src = imgArray[0].src;
                break;
            }
            document.getElementById("picture").src = imgArray[i+1].src;
            break;

            document.getElementById('picture').append(imgArray);
        }

        console.log(drinkCard);
    }

nextImage();

};






moreRecipes.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(foodResultsIndex, foodResultsCount);
generateCards();
});

moreDrinks.addEventListener("click", function(event){
    event.preventDefault();
    console.log(breweryResultsIndex, breweryResultsCount);
    displayBreweryCard();
});

userFormEl.addEventListener("submit", formSubmitHandler);
userFormBreweryEl.addEventListener("submit", breweryFormSubmitHandler);