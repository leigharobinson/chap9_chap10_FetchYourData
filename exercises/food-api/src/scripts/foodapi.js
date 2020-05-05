console.log("did it work?")

let star = "Make it happen";

// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })
    const foodFactory = (foodEntries) => {
        return `
        <div class="container">
        <h1>Name: ${foodEntries.name}</h1>
        <p>Category: ${foodEntries.category}</p>
        <p>Ethnicity: ${foodEntries.ethnicity}</p>
        <p>Barcode: ${foodEntries.barcode}</p>
        <p>Ingredients: ${foodEntries.ingredients}</p>
        <p>Origins: ${foodEntries.origins}</p>
        <p>Calories: ${foodEntries.calories}</p>
        <p>Fat: ${foodEntries.fat}</p>
        <p>Sugar: ${foodEntries.sugar}</p>
        </div>
        `
    };

    function addFoodToDom(foodEntry) {
        foodList = document.querySelector(".foodList");
        foodList.innerHTML += foodEntry;
    };


    fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach (food => {
            console.log(food);
        
            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food["barcode"]}.json`)
            .then(response => response.json())
            .then(productInfo => {
                if (productInfo.product.ingredients_text) {
                food.ingredients = productInfo.product.ingredients_text
                } else {
                food.ingredients = "no ingredients listed";
                } 
                if (productInfo.product.origins) {
                    food.origins = productInfo.product.origins;
                } else {
                    food.origins = "no country of origin listed";
                }
                if (productInfo.product.nutriments.fat_serving) {
                    food.fat = productInfo.product.nutriments.fat_serving 
                } else {
                    food.fat = "no fat per serving listed" ;
                }
                if (productInfo.product.nutriments.sugars_serving) {
                    food.sugar = productInfo.product.nutriments.sugars_serving;
                } else {
                    food.sugar = "no sugar listed";
                }
                if (productInfo.product.nutriscore_data) {
                    food.calories = productInfo.product.nutriscore_data.energy;
                } else {
                    food.calories = "no calories listed";
                }
        

            //creates the HTML representation of food items
            const foodAsHTML = foodFactory(food)
            //adds the HTML representation of food items to DOM
            addFoodToDom(foodAsHTML)

            })
        })
    })
