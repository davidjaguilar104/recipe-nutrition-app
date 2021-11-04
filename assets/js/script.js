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
                    <div class="card">
                    <figure class="image is-4by3" id="card">
                    <img src="newImage" alt="">
                    </figure>
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

    function getImgArray() {

    var imgArray = newArray();

    imgArray[0] = 'assets/images/image1.jpg';
    imgArray[1] = 'assets/images/image2.jpg';
    imgArray[2] = 'assets/images/image3.jpg';
    imgArray[3] = 'assets/images/image4.jpg';
    imgArray[4] = 'assets/images/image5.jpg';
    imgArray[5] = 'assets/images/image6.jpg';
    imgArray[6] = 'assets/images/image7.jpg';
    imgArray[7] = 'assets/images/image8.jpg';
    imgArray[8] = 'assets/images/image9.jpg';    
    imgArray[9] = 'assets/images/image10.jpg';
    imgArray[10] = 'assets/images/image11.jpg';
    imgArray[11] = 'assets/images/image12.jpg';
    imgArray[12] = 'assets/images/image13.jpg';
    imgArray[13] = 'assets/images/image14.jpg';
    imgArray[14] = 'assets/images/image15.jpg';
    imgArray[15] = 'assets/images/image16.jpg';
    imgArray[16] = 'assets/images/image17.jpg';
    imgArray[17] = 'assets/images/image18.jpg';
    imgArray[18] = 'assets/images/image19.jpg';
    imgArray[19] = 'assets/images/image20.jpg';
    imgArray[20] = 'assets/images/image21.jpg';
    
    var arrayLength = imgArray.length;
    var newArray = [];
    
    for (var i = 0; i < arrayLength; i++) {
        newArray[i] = new Image();
        newArray[i].src = imgArray[i];

    }

    function getRandomNum(min, max) {
        imgNo = Math.floor(Math.random() * (max - min + 1)) + min;
        return newArray[imgNo];

    }

    var newImage = getRandomNum(0, newArray.length - 1);

    document.card.appendChild(newImage);

  


};


getImgArray();



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