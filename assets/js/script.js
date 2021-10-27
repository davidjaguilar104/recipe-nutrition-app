var userFormEl = document.getElementById("user-form");
var foodInputEl = document.getElementById("food-search");

var formSubmitHandler = function(event) {
    event.preventDefault(); 

    var foodSearched = foodInputEl.value.trim();
    foodInputEl.value = "";

    console.log(foodSearched); // just for making sure user input is captured with listener
    
}




































userFormEl.addEventListener("submit", formSubmitHandler);