// get current user
const currentAdmin = JSON.parse(localStorage.getItem("current_admin"));

// check session
if (!currentAdmin) {
  window.location.assign("./../public/admin_login.html");
}

// dom reference
const currentAdminNameTag = document.querySelector(".admin-name-holder");
const pendingReportStat = document.querySelector(".pending-report-stat");
const reportHolder = document.querySelector(".received-reports");

// greet current user
const currentAdminId = currentAdmin.adminId;
currentAdminNameTag.innerHTML = currentAdminId;

// render report to the ui
function render() {
  // loading state
  pendingReportStat.innerHTML = "Loading please wait...";

  fetch("https://student-complaint-system-api.herokuapp.com/complaint/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length > 0) {
        // show numbers of reports
        pendingReportStat.innerHTML = `Numbers of reports: ${response.length}`;
      } else if (response.length === 0) {
        // no report yet
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
        } = response[x];

        htmlHolder += `
      <tr>
        <td onClick="viewReport('${reportId}', '${x}')">${reportId || ""}</td>
        <td onClick="viewReport('${reportId}', '${x}')">${reporterName}</td>
        <td onClick="viewReport('${reportId}', '${x}')">${
          reportMessage.slice(0, 50) || ""
        }...</td>
        <td onClick="viewReport('${reportId}', '${x}')">${reportType || ""}</td>
        <td onClick="viewReport('${reportId}', '${x}')">${
          reporterPhone || ""
        }</td>
        <td onClick="viewReport('${reportId}', '${x}')">${status || ""}</td>
        <td>
          <select class="status-dropdown${reportId}" onchange="updateStatus('${reportId}')">
            <option></option>
            <option>Pending</option>
            <option>In progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>
        </td>
      </tr>
    `;
      }
      reportHolder.innerHTML = htmlHolder;
    });
}

render();
