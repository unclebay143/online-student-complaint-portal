// get current user
const currentUser = JSON.parse(localStorage.getItem("current_student"));

// check session
if (!currentUser) {
  window.location.assign("./../public/login.html");
}

// dom reference
const userFullNameHolder = document.querySelector(".user-name-holder");
const pendingReportStat = document.querySelector(".pending-report-stat");
const reportHolder = document.querySelector(".reports-made");

// greet current user
const userFullName = currentUser.fullname;
userFullNameHolder.innerHTML = `${userFullName}'s Reports`;

// render report to the ui
function render() {
  // loading state
  pendingReportStat.innerHTML = "Loading please wait...";

  fetch(
    "https://student-complaint-system-api.herokuapp.com/student/complaint",
    {
      method: "POST",
      body: JSON.stringify({
        matricNumber: currentUser.matricNumber,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        //
        pendingReportStat.innerHTML = `Numbers of complains: ${response.length}`;
      } else if (response.length === 0) {
        pendingReportStat.innerHTML = "You don't have any pending report yet";
      }
      //
      htmlHolder = "";
      for (x = 0; x < response.length; x++) {
        const {
          reportId,
          reporterName,
          reportType,
          reportMessage,
          reporterPhone,
          status,
          feedback,
        } = response[x];

        //
        htmlHolder += `
            <tr onClick="viewReport('${reportId}')">
                <td>${reportId || ""}</td>
                <td>${reporterName || ""}</td>
                <td>${reportMessage.slice(0, 50) || ""}...</td>
                <td>${reportType || ""}</td>
                <td>${reporterPhone || ""}</td>
                <td>${feedback || "N/A"}</td>
                <td>${status || ""}</td>
            </tr>
        `;
      }
      reportHolder.innerHTML = htmlHolder;
    })
    .catch((error) => {
      console.log(error);
    });
}

render();
