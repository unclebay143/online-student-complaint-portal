const matric_number = document.querySelector("#user-matric");
const loginBtn = document.querySelector("#login-btn");
const pass = document.querySelector("#user-password");
const messageTag = document.querySelector("#message");

// Get existing data
const db = JSON.parse(localStorage.getItem("user_db")) || [];

const loginUser = () => {
  fetch("https://student-complaint-system-api.herokuapp.com/login", {
    method: "POST",
    body: JSON.stringify({
      matricNumber: matric_number.value,
      password: pass.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        localStorage.setItem("current_student", JSON.stringify(response[0]));
        window.location.assign("./../public/dashboard.html");
      } else {
        messageTag.innerHTML = "User not found";
        messageTag.style.color = "red";
      }
    })
    .catch((error) => {
      messageTag.innerHTML = "something went wrong";
      messageTag.style.color = "red";
    });
};

// Bind
loginBtn.addEventListener("click", loginUser);
