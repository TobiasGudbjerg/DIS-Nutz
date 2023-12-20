const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");

let username = getCookie("user");
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
