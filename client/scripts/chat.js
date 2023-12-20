const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const username = getCookie('user'); // Retrieve username from cookie

socket.emit("user joined", username);

function sendChat() {
  if (input.value) {
    socket.emit("chat message", { message: input.value, user: username }); // Send user with message
    input.value = "";
  }
}

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.textContent = data.user + ": " + data.message; // Adjust to display user and message
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
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
