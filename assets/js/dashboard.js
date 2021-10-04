// get current user
const currentUser = JSON.parse(localStorage.getItem("current_student"));

// check session
if (currentUser) {
  const userFullNameHolder = document.querySelector(".user-name-holder");
  const userFullName = currentUser.fullname;
  userFullNameHolder.innerHTML = userFullName;
} else {
  window.location.assign("./../public/login.html");
}
