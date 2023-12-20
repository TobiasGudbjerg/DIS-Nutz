const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let username = getCookie("user");
console.log("Username from cookie:", username); // Add this line to debug
if (!username) username = "Anonymous";


socket.emit("user joined", username);

function sendChat() {
  if (input.value) {
    socket.emit("chat message", username + ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById("logoutButton").addEventListener("click", function() {
  axios.get("/logout")
    .then(function(response) {
      window.location.href = "/";
    })
    .catch(function(error) {
      console.error("Logout failed:", error);
    });
});