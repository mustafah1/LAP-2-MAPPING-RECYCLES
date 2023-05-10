const serverUrl = "https://diarysite.onrender.com";

document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
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
      `${serverUrl}/users/register`,
      options
    );
    const data = await response.json();

    if (response.status == 201) {
      window.location.assign("login.html");
    } else {
      alert("Please try a different username or password");
    }
  });
