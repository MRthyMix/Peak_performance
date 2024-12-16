'use strict';

const btn = document.querySelector('.search-food-bar')


fetch("https://calorieninjas.p.rapidapi.com/v1/nutrition?query=Steak%20and%20Baked%20Potato", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "ce19d0164fmsh3d383efc0e85ce5p16dcb1jsnb1a4a3c79541",
        "x-rapidapi-host": "calorieninjas.p.rapidapi.com"
    }
})
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });