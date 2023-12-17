const order = document.getElementById("order");
const bag1 = document.getElementById("bag1");

order.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    const item = e.target.parentElement;
    const itemName = item.textContent.trim();

    // Send a request to add the item to the user's bagItems
    axios.post('/addItemToBag', { item: itemName })
      .then(function (response) {
        console.log("Item added to bag");
        moveItemToBagUI(itemName);
      })
      .catch(function (error) {
        console.error("Error adding item to bag:", error);
      });
  }
});

function moveItemToBagUI(itemName) {
  const storeItems = Array.from(store.children);
  const itemToMove = storeItems.find(li => li.textContent.trim() === itemName);
  
  if (itemToMove) {
    const button = itemToMove.querySelector("button");
    if (button) button.remove();
    store.removeChild(itemToMove);
    bag.appendChild(itemToMove);
  }
}

function clearBagUI() {
  while (bag.firstChild) {
    bag.removeChild(bag.firstChild);
  }
}


function checkout() {
  axios.post("/store/checkout")
    .then(function (response) {
      console.log("Checkout successful");
      alert("Checkout successful!");
      clearBagUI();
    })
    .catch(function (error) {
      console.error("Checkout error:", error);
    });
}



function loadBagItemsFromServer() {
  axios.get('/getBagItems')
    .then(function (response) {
      response.data.forEach(itemName => {
        moveItemToBagUI(itemName);
      });
    })
    .catch(function (error) {
      console.error("Error loading bag items:", error);
    });
}

loadBagItemsFromServer();

document.getElementById("logoutButton").addEventListener("click", function() {
  axios.get("/logout")
    .then(function(response) {
      window.location.href = "/";
    })
    .catch(function(error) {
      console.error("Logout failed:", error);
    });
});
