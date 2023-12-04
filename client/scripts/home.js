function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    password,
  };

  axios
    .post("http://188.166.87.221/home", user)
    .then(function (response) {
      location.href = "/store";  // Redirect to the store page upon successful login
    })
    .catch(function (error) {
      console.log(error);
    });
}

