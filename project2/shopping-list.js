//Styling through dom manipulation rather than html file style codes:

const contentStyling = document.querySelector(contentStyling)


// Adding a new feature to have the shopping list persist via local storage

const ul = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");

//New function to load items from local storage
function loadItems() {
    const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
    items.forEach(item => {
        addItemToDOM(item);
    });
}

//New function to save items to local storage
function saveItems(items) {
    localStorage.setItem("shoppingList", JSON.stringify(items));
}


//new seperate function to add items to the DOM

function addItemToDOM(item) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");

    li.appendChild(span);
    li.appendChild(deleteButton);
    span.textContent = item;

    deleteButton.textContent = "Delete";
    deleteButton.style.color = "red";
    deleteButton.addEventListener("click", function() {
        ul.removeChild(li);
        const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
        const index = items.indexOf(item);
        if (index !== -1) {
            items.splice(index, 1);
            saveItems(items);
        }
    });

    ul.appendChild(li);
}

// updated button click handler function
function buttonClicked() {
    let currentValue = input.value;
    addItemToDOM(currentValue);

    const items = JSON.parse(localStorage.getItem("shoppingList")) || [];
    items.push(currentValue);
    saveItems(items);

    input.value = "";
    input.focus();
}

//event listensers for button clicks and enter key being pressed.
button.addEventListener("click", buttonClicked);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        buttonClicked();
    }
})

//load items from local storage when the page is loaded.
window.addEventListener("load", loadItems);