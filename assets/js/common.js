const hamburger = document.querySelector(".hamburger");
const toggleMenu = () => {
  const nav = document.querySelector(".side-menu");
  nav.classList.toggle("open");
};

hamburger.addEventListener("click", toggleMenu);

const logout = () => {
  const stillWantToLogout = confirm("Are you sure?");
  if (stillWantToLogout) {
    localStorage.removeItem("current_student");
    window.location.reload();
  }
};

const adminLogout = () => {
  const stillWantToLogout = confirm("Are you sure?");
  if (stillWantToLogout) {
    localStorage.removeItem("current_admin");
    window.location.reload();
  }
};

// view report body
const viewReport = (reportId, reportIndex) => {
  // store the report id in local storage
  localStorage.setItem("viewing_report", JSON.stringify(reportId));

  localStorage.setItem("viewing_index", JSON.stringify(reportIndex || 0));
  // redirect to the report view page
  window.location.assign("./view_report.html");
};
