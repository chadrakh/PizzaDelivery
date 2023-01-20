// Setting item titles from array
const setItemTitles = (itemType) => {
    let itemArray = [];

    const pizzaTitles = ['50/50 Special', 'Top Gun', 'Hasta La Vista', 'Home Alone', 'Jurassic Park', 'A New Hope', 'Breakfast Club', 'Temple of Doom', 'The Mask', 'The Ghostbuster', 'Neverland Special', 'The Patriot', 'Saucy With A Chance of Meatballs', 'The MacGuyver', 'Trading Places'];
    const sideTitles = ['Wedges', 'Garlic Bread', 'Chips', 'Dough Balls'];
    const drinkTitles = ['Coca Cola', 'Fanta', 'Sprite', 'Mirinda'];
    const dessertTitles = ['Apple Pie', 'Brownies', 'Chocolate Cake', 'Cookie Dough'];
    
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

// Updating item quantities on button click
const incrementQuantity = (itemReference) => {
    let quantityCounterParsed = parseInt(document.querySelector(`.quantity-${itemReference}`).innerText);

    quantityCounterParsed += 1;
    document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
}

const decrementQuantity = (itemReference) => {
    let quantityCounterParsed = parseInt(document.querySelector(`.quantity-${itemReference}`).innerText);

    if (quantityCounterParsed > 0) {
        quantityCounterParsed -= 1;
        document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
    }
}

const getBasketTally = () => {
    // loop through every quantity paragraph element and return parsed innerText to find sum
}