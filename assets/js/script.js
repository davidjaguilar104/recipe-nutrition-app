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
var savedRecipes = [];

var savedRecipes = [];


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
    var resultsContainer = document.getElementById("recipeContainer");

    fetch(recipeApiUrl) 
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                foodResults = data.hits
                resultsContainer.innerHTML = "";
                moreRecipes.classList.toggle("is-hidden");
                generateCards()
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
                            <a href="${food.url}" class="button recipe-link">View Recipe</a>
                            <button id="save-btn" class="button save-btn">Save Recipe</button>
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
        var noResultsEl = document.createElement("p");
        noResultsEl.setAttribute("class", "is-size-1");
        noResultsEl.textContent = "No results found. Try again.";
        resultsContainer.appendChild(noResultsEl);
        moreRecipes.classList.toggle("is-hidden");
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
                breweryContainer.innerHTML = "";
                moreDrinks.classList.toggle("is-hidden")
                breweryResults = data;
                displayBreweryCard();
            });
        };
    });
};

// IN THE DISPLAY CARDS A LOOP WILL BE BETTER THAN ALL THE REPEATED CODE
// need to loop through data and display different object properties at different indexes of array returned from API

var breweryResults = [];
var breweryResultsIndex = 0 //tracks index of the breweryResults array so we can add more cards onto the page
var breweryResultsCount = 3 //this tracks the amount of cards on the page

var displayBreweryCard = function() {
    

    var breweryContainer = document.getElementById("breweryContainer");
    // breweryContainer.innerHTML = "";
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
                    <div class="card"
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
        var noResultsEl = document.createElement("p");
        noResultsEl.setAttribute("class", "is-size-1");
        noResultsEl.textContent = "No results found. Try again.";
        breweryContainer.appendChild(noResultsEl);
        moreDrinks.classList.toggle("is-hidden");
    }
    
};



var modal = document.getElementById("saved-recipe-modal");
var modalBtn = document.getElementById("saved-recipes");
var closeModal = document.getElementsByClassName("close")[0];
var recipeUl = document.getElementById("saved-recipe-list");


var updateRecipeList = function() {
    recipeUl.innerHTML = "";
    for (var i = 0; i < savedRecipes.length; i++) {

        var listItem = document.createElement("li");
        listItem.innerHTML = "<a href=" + savedRecipes[i].website + ">" + savedRecipes[i].recipe; + "</a>";
        recipeUl.appendChild(listItem);
    }
}


modalBtn.onclick = function() {
    modal.style.display = "block";
};

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
};

var saveRecipeHandler = function() {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    updateRecipeList();
};

var loadRecipes = function() {
    var loadedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    if (!loadedRecipes) {
        return false;
    } else {
    savedRecipes = loadedRecipes;
    };
    updateRecipeList();
};

loadRecipes();

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "save-btn") {
        var savedRecipe = event.target.parentNode.innerHTML;
        var title = savedRecipe.substring(
            savedRecipe.indexOf(">") + 1,
            savedRecipe.lastIndexOf("</p>")
        );
        var link = savedRecipe.substring(
            savedRecipe.indexOf('href="') + 6,
            savedRecipe.lastIndexOf('" class="button recipe')
        )
        var clickedRecipe = {
            recipe: title,
            website: link
        }
        savedRecipes.push(clickedRecipe);
        saveRecipeHandler();
    }

});


modalBtn.onclick = function() {
    modal.style.display = "block";
    updateRecipeList();
};

closeModal.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
};

var saveRecipeHandler = function() {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
};

var loadRecipes = function() {
    var loadedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    if (!loadedRecipes) {
        return false;
    } else {
    savedRecipes = loadedRecipes;
    };
};

loadRecipes();

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "save-btn") {
        var savedRecipe = event.target.parentNode.innerHTML;
        var title = savedRecipe.substring(
            savedRecipe.indexOf(">") + 1,
            savedRecipe.lastIndexOf("</p>")
        );
        var link = savedRecipe.substring(
            savedRecipe.indexOf('href="') + 6,
            savedRecipe.lastIndexOf('" class="button recipe')
        )
        var clickedRecipe = {
            recipe: title,
            website: link
        }
        savedRecipes.push(clickedRecipe);
        saveRecipeHandler();
    }

});

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