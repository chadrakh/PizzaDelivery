const pizzaTitles = ['50/50 Special', 'Top Gun', 'Hasta La Vista', 'Home Alone', 'Jurassic Park', 'A New Hope', 'Breakfast Club', 'Temple of Doom', 'The Mask', 'The Ghostbuster', 'Neverland Special', 'The Patriot', 'Saucy With A Chance of Meatballs', 'The MacGuyver', 'Trading Places'];
const sideTitles = ['Wedges', 'Garlic Bread', 'Chips', 'Dough Balls'];
const drinkTitles = ['Coca Cola', 'Fanta', 'Sprite', 'Mirinda'];
const dessertTitles = ['Apple Pie', 'Brownies', 'Chocolate Cake', 'Cookie Dough'];
    
let basketItems = [];
let basketTotal = 0;

// Setting item titles from array
const setItemTitles = (itemType) => {
    let itemArray = [];
    
    switch (itemType) {
        case "pizza":
            itemArray = pizzaTitles;
            break;
        case "side":
            itemArray = sideTitles;
            break;
        case "drink":
            itemArray = drinkTitles;
            break;
        case "dessert":
            itemArray = dessertTitles;
            break;
    }

    for (let itemReference = 1; itemReference <= itemArray.length; itemReference++) {
        let arrayIndex = itemReference - 1;

        document.querySelector(`.title-${itemType}${itemReference}`).innerText = itemArray[arrayIndex];
    }

}

setItemTitles("pizza");
setItemTitles("side");
setItemTitles("drink");
setItemTitles("dessert");

// Validating postcode format using regex pattern
const validatePostcode = () => {
    const inputPostcode = document.querySelector(".postcode").value;

    const regex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/g;
    let postcodeCheck = inputPostcode.match(regex);

    if (postcodeCheck === null) {
        document.querySelector(".invalidPostcode").classList.remove("hide");
        document.querySelector(".postcode").classList.add("invalidInput");
        //alert("Please enter a valid UK postcode.");
    } else {
        document.querySelector(".invalidPostcode").classList.add("hide");
        document.querySelector(".postcode").classList.remove("invalidInput");
    }

    // if successful, clear textbox and navigate return street name
}

const updateBasketTally = (updateType) => {
    let itemList = document.querySelectorAll(".quantityCount");
    let basketTally = 0;

    // loop through every quantity paragraph element and return parsed innerText to find sum
    for (let index = 0; index < itemList.length; index++) {
        basketTally += parseInt(itemList[index].innerText);
    }

    //console.log(basketTally);
    document.querySelector(".basketTally").innerText = basketTally;
    updateBasketItems(updateType);
}

// Switch-case to get price depending on size
const getPrice = (size) => {
    let price;

    switch(size) {
        case ("small"):
            price = 9.99;
            break;
        case ("medium"):
            price = 12.99;
            break;
        case ("large"):
            price = 15.99;
            break;
        case ("x-large"):
            price = 19.99;
            break;
        default:
            price = null;
            break;
    }

    return price;
}

// Updating item quantities on button click
const incrementQuantity = (itemReference, isHalfAndHalf) => {
    let quantityCounter = document.querySelector(`.quantity-${itemReference}`).innerText;
    let quantityCounterParsed = parseInt(quantityCounter);
    let addedItem = [];

    // Checking if details have been chosen before allowing increment
    let size;
    let half1;
    let half2;
    let item = document.querySelector(`.title-${itemReference}`).innerText;
    let price;

    if (itemReference.includes("pizza")) {
        size = document.getElementById(`size-${itemReference}`).value;
        half1 = document.getElementById("topping1").value;
        half2 = document.getElementById("topping2").value;

        if (isHalfAndHalf) {
            // If a detail of the 50/50 pizza hasn't been chosen, alert the user to select all choices
            if(half1 === "default" || half2 === "default" || size === "default") {
                alert("Please select the size and toppings.");
            } else {
                quantityCounterParsed += 1;
                document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;

                price = getPrice(size);
                addedItem.push([item, size, price, half1, half2]);

                // Basket tally is updated for every successful call of the update function
                updateBasketTally("increment");
            }   

        } else {
            if (size === "default") {
                alert("Please select the size.");
            } else {
                quantityCounterParsed += 1;
                document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;

                price = getPrice(size);
                addedItem.push([item, size, price]);

                // Basket tally is updated for every successful call of the update function
                updateBasketTally("increment");
            }
        }

        if (addedItem.length > 0) {
            basketItems.push(addedItem);
        }
    }
}

const decrementQuantity = (itemReference, isHalfAndHalf) => {
    let quantityCounter = document.querySelector(`.quantity-${itemReference}`).innerText;
    let quantityCounterParsed = parseInt(quantityCounter);

    // Checking if details have been chosen before allowing increment
    let size;
    let half1;
    let half2;
    let item = document.querySelector(`.title-${itemReference}`).innerText;

    if (itemReference.includes("pizza")) {
        size = document.getElementById(`size-${itemReference}`).value;
        half1 = document.getElementById("topping1").value;
        half2 = document.getElementById("topping2").value;

        if (itemReference === "pizza1") {
            if (isHalfAndHalf) {
                
                // If a detail of the 50/50 pizza hasn't been chosen, alert the user to select all choices
                if(half1 === "default" || half2 === "default" || size === "default") {
                    alert("Please select the size and toppings of the pizza you wish to remove.");
                } else {
                    if (quantityCounterParsed == 0) {
                        alert("Minimum quantity reached.");
                    } else {
                        quantityCounterParsed -= 1;
                        document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
                        // Basket tally is updated for every successful call of the update function
                        updateBasketTally("decrement");
                    }
                }   
            }

        } else {
            if (size === "default") {
                alert("Please select the size of the pizza you wish to remove.");
            } else {
                if (quantityCounterParsed == 0) {
                    alert("Minimum quantity reached.");
                } else {
                    quantityCounterParsed -= 1;
                    document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
                    // Basket tally is updated for every successful call of the update function
                    updateBasketTally("decrement");
                }
            }  
        }

        
    }

    
}


const updateBasketItems = (updateType) => {
    console.log("basketItems 2D Array", basketItems);
    
    if (updateType == "increment") {
        // Calculating sum using basketItems array
        for (let index = 0; index < basketItems.length; index++) {
            basketTotal += basketItems[index][index][2];
        }

        //console.log(document.querySelector(".basketTotal").innerText)
    } else if (updateType = "decrement") {
        // write code to remove item from basket

    } else {
        console.error("Invalid update type passed into updateBasketItems method.");
    }

    console.log("basketTotal", basketTotal);
    document.querySelector(".basketTotal").innerText = `£${basketTotal.toFixed(2)}`;
}