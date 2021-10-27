var userFormEl = document.getElementById("user-form");
var foodInputEl = document.getElementById("food-search");

var formSubmitHandler = function(event) {
    event.preventDefault(); 

    var foodSearched = foodInputEl.value.trim();

    console.log(foodSearched);
    
}




































userFormEl.addEventListener("submit", formSubmitHandler);