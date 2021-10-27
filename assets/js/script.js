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




































userFormEl.addEventListener("submit", formSubmitHandler);