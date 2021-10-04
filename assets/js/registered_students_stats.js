// get current user
const currentAdmin = JSON.parse(localStorage.getItem("current_admin"));

// check session
if (!currentAdmin) {
  window.location.assign("./../public/admin_login.html");
}

// Get existing data
const registeredStudents = JSON.parse(localStorage.getItem("user_db")) || [];

// dom reference
const pendingReportStat = document.querySelector(".pending-report-stat");
const reportHolder = document.querySelector(".registered_students");

// function that displays number of registered users
const renderRegisteredStudents = () => {
  // loading state
  pendingReportStat.innerHTML = "Loading please wait...";

  fetch("https://student-complaint-system-api.herokuapp.com/students", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((registeredStudents) => {
      if (registeredStudents.length === 0) {
        // no student
        pendingReportStat.innerHTML = `No registered Students`;
      }

      if (registeredStudents.length > 0) {
        // show numbers of students
        pendingReportStat.innerHTML = `Registered Students: ${registeredStudents.length}`;
      }

      //
      htmlHolder = "";
      for (x = 0; x < registeredStudents.length; x++) {
        htmlHolder += `
            <tr>
                <td>${x + 1}</td>
                <td>${registeredStudents[x].matricNumber || ""}</td>
                <td>${registeredStudents[x].fullname || ""}</td>
            </tr>
        `;
      }
      reportHolder.innerHTML = htmlHolder;
    });
};

renderRegisteredStudents();
