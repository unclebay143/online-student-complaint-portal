const matricNumberInput = document.querySelector("#matric-number");
const fullnameInput = document.querySelector("#full-name");
const passwordInput = document.querySelector("#pass-word");
const signUpBtn = document.querySelector("#signup-btn");
const messageTag = document.querySelector("#message");

// Get existing data
const db = JSON.parse(localStorage.getItem("user_db")) || [];

const registerNewStudent = () => {
  const formNotEmpty =
    matricNumberInput.value && fullnameInput.value && passwordInput.value
      ? true
      : false;

  if (formNotEmpty) {
    const isUserExist = db.filter(
      (user) => user.matricNumber === matricNumberInput.value
    );

    // check if user exist
    if (isUserExist.length > 0) {
      messageTag.innerHTML = "User already exist";
      messageTag.style.color = "red";
      return;
    } else {
      // new student information instance
      const newStudent = {
        matricNumber: matricNumberInput.value,
        fullname: fullnameInput.value,
        password: passwordInput.value,
      };

      fetch("https://student-complaint-system-api.herokuapp.com/register", {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          // Notify user
          messageTag.innerHTML = "Registration successful";
          messageTag.style.color = "yellow";
          //   push new student to existing database
          db.push(newStudent);
          // store updated database
          localStorage.setItem("user_db", JSON.stringify(db));

          // redirect to login page
          setTimeout(() => {
            window.location.assign("./login.html");
          }, 2000);
        })
        .catch((error) => console.log(error));
    }
  }
};

// Bind function
signUpBtn.addEventListener("click", registerNewStudent);
