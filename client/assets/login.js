const serverUrl = "https://diarysite.onrender.com";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.get("username"),
      password: form.get("password"),
    }),
  };

  console.log(options);
  const response = await fetch(
    `${serverUrl}/users/login`,
    options
  );
  const data = await response.json();
  console.log(data);

  if (response.status == 200) {
    localStorage.setItem("token", data.token.token);
    console.log(" working: hit line 24");
    window.location.assign("board.html");
  } else {
    alert("Invalid username or password");

  }
});
