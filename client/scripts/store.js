const store = document.getElementById("store");
const bag = document.getElementById("bag");

store.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    const item = e.target.parentElement;
    const itemName = item.textContent.trim();

    addToCookie(itemName);

    e.target.remove(); // Fjern knap

    store.removeChild(item);
    bag.appendChild(item);
  }
});

function addToCookie(itemName) {
  const existingItems = getCookie("bagItems") || "";
  if (!existingItems.split(",").includes(itemName)) {
    document.cookie =
      "bagItems=" + existingItems + (existingItems ? "," : "") + itemName;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function checkout() {
  axios
  .post("http://localhost:3000/store/checkout", {bag: document.cookie})
  .then(function (response) {})
  .catch(function (error) {});
}

document.getElementById("logoutButton").addEventListener("click", function() {
  axios.get("http://localhost:3000/logout")
    .then(function(response) {
      // Redirect to home or login page after logout
      window.location.href = "/";
    })
    .catch(function(error) {
      console.error("Logout failed:", error);
    });
});


// Extra ting (behøves ikke):

// // Populate bag from cookie on page load
// const savedItems = getCookie("bagItems");
// if (savedItems) {
//   savedItems.split(",").forEach((itemName) => {
//     if (itemName) {
//       moveItemToBag(itemName);
//     }
//   });
// }

// function moveItemToBag(itemName) {
//   const store = document.getElementById("store");
//   const bag = document.getElementById("bag");

//   Array.from(store.children).forEach((li) => {
//     if (li.textContent.includes(itemName)) {
//       const button = li.querySelector("button");
//       if (button) button.remove(); // Remove the button

//       store.removeChild(li);
//       bag.appendChild(li);
//     }
//   });
// }
