const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const username = getCookie('user') || 'Anonymous';

socket.emit("user joined", username);

function sendChat() {
  const userCookie = getCookie('user');
  if (input.value) {
    // Include the cookie with the message
    socket.emit("chat message", { message: input.value, user: userCookie });
    input.value = "";
  }
}

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.textContent = data.user + ": " + data.message;
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

// Helper function to get cookie by name
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

