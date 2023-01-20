const pizzaTitles = ['50/50 Special', 'Top Gun', 'Hasta La Vista', 'Home Alone', 'Jurassic Park', 'A New Hope', 'Breakfast Club', 'Temple of Doom', 'The Mask', 'The Ghostbuster', 'Neverland Special', 'The Patriot', 'Saucy With A Chance of Meatballs', 'The MacGuyver', 'Trading Places'];
const sideTitles = ['Wedges - £2.99', 'Garlic Bread - £1.99', 'Chips - £1.99', 'Dough Balls - £2.50'];
const drinkTitles = ['Coca Cola - £1.99', 'Fanta - £1.99', 'Sprite - £1.99', 'Mirinda - £1.99'];
const dessertTitles = ['Apple Pie - £0.99', 'Brownies - £1.50', 'Chocolate Cake - £1.99', 'Cookie Dough - £3.50'];

const itemArray = ["Wedges", "Garlic Bread", "Chips", "Dough Balls", "Coca Cola", "Fanta", "Sprite", "Mirinda", "Apple Pie", "Brownies", "Chocolate Cake", "Cookie Dough"]
    
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

    // Checking if details have been chosen before allowing increment
    
    let item = document.querySelector(`.title-${itemReference}`).innerText;
    let price;

    if (itemReference.includes("pizza")) {
        let size;
        let half1;
        let half2;

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
                basketItems.push([item, size, price, half1, half2]);

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
                basketItems.push([item, size, price]);

                // Basket tally is updated for every successful call of the update function
                updateBasketTally("increment");
            }
        }

    } else if (itemArray.some(x => item.includes(x))) {
        quantityCounterParsed += 1;
        document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
        let indexOf = item.indexOf("£");
        let itemPrice = parseFloat(item.substring(indexOf + 1));
        
        basketTotal += itemPrice;
        updateBasketTotal(basketTotal);
    }
}

const decrementQuantity = (itemReference, isHalfAndHalf) => {
    let quantityCounter = document.querySelector(`.quantity-${itemReference}`).innerText;
    let quantityCounterParsed = parseInt(quantityCounter);

    // Checking if details have been chosen before allowing increment
    
    let item = document.querySelector(`.title-${itemReference}`).innerText;
    let price;

    if (itemReference.includes("pizza")) {
        let size;
        let half1;
        let half2;
        let removeItem;
        let removeSize;
        let removePrice;

        size = document.getElementById(`size-${itemReference}`).value;
        half1 = document.getElementById("topping1").value;
        half2 = document.getElementById("topping2").value;

        if (quantityCounterParsed == 0) {
            alert("Minimum value (0) reached.")
        } else {
            if (isHalfAndHalf) {
                // If a detail of the 50/50 pizza hasn't been chosen, alert the user to select all choices
                if(half1 === "default" || half2 === "default" || size === "default") {
                    alert("Please select the size and toppings.");
                } else {
                    quantityCounterParsed -= 1;
                    document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
    
                    price = getPrice(size);
                    //console.log([item, size, price, half1, half2]);
    
                    removeItem = item;
                    removeSize = size;
                    removePrice = price;
                    let removeHalf1 = half1;
                    let removeHalf2 = half2;
    
                    // Basket tally is updated for every successful call of the update function
                    updateBasketTally("decrement");
                }   
    
            } else {
                if (size === "default") {
                    alert("Please select the size.");
                } else {
                    quantityCounterParsed -= 1;
                    document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
    
                    price = getPrice(size);
                    //console.log([item, size, price]);
    
                    removeItem = item;
                    removeSize = size;
                    removePrice = price;
    
                    // Basket tally is updated for every successful call of the update function
                    updateBasketTally("decrement");
                }
            }
        }

    } else if (itemArray.some(x => item.includes(x))) {
        quantityCounterParsed -= 1;
        document.querySelector(`.quantity-${itemReference}`).innerText = quantityCounterParsed;
        let indexOf = item.indexOf("£");
        let itemPrice = parseFloat(item.substring(indexOf + 1));
        
        basketTotal -= itemPrice;
        updateBasketTotal(basketTotal);
    }
}

const updateBasketTotal = (basketTotal) => {
    document.querySelector(".basketTotal").innerText = `£${parseFloat(basketTotal).toFixed(2)}`;
}

const updateBasketItems = (updateType) => {
    
    if (updateType == "increment") {
        // Calculating sum using basketItems array
        for (let i = 0; i < basketItems.length; i++) {
                let currentItem = basketItems[i];
                let currentPrice = currentItem[2];
                console.log(currentItem);
                console.log(currentPrice);
                console.log(basketTotal);
                basketTotal += currentPrice;
        }

    } else if (updateType = "decrement") {
        // Removing items from the basket array
        // for (let i = 0; i < basketItems.length; i++) {
            // let itemToRemove = basketItems[i];
            // console.log(basketItems.indexOf(itemToRemove));
        // }
    }

    updateBasketTotal(basketTotal);
}