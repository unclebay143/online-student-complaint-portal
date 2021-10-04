// get report database
const report_database = JSON.parse(localStorage.getItem("report_db")) || [];

// get the current report the admin is viewing
const reportToView = JSON.parse(localStorage.getItem("viewing_report")) || [];
const indexOfReport = JSON.parse(localStorage.getItem("viewing_index"));

// get current user
const currentStudent = JSON.parse(localStorage.getItem("current_student"));

const showButton = `<button onclick="sendFeedback()" class="feedback-btn">Submit</button>`;

// find the report
const viewReportDetails = () => {
  document.querySelector(".report-body").innerHTML = "Loading please wait...";

  fetch("https://student-complaint-system-api.herokuapp.com/complaint/detail", {
    method: "POST",
    body: JSON.stringify({
      reportId: reportToView,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // pull out info
      const {
        reportId,
        reporterName,
        reportType,
        reportMessage,
        reporterPhone,
        status,
        feedback,
        reportDate,
        reporterAddress,
        reporterEmail,
        reporterMatricNumber,
      } = response[0];

      // heading
      document.querySelector(
        ".report-info"
      ).innerHTML = `viewing ${reportType} complain by ${reporterName}`;

      // content
      const reportBody = `
    <h4>From:  <span class="info">${reporterName}</span></h4>
    <h4>Matric number:  <span class="info">${reporterMatricNumber}</span></h4>
    <h4>Email Address:  <span class="info">${reporterEmail}</span></h4>
    <h4>Address:  <span class="info">${reporterAddress}</span></h4>
    <h4>Phone number:  <span class="info">${reporterPhone}</span></h4>
    <h4>Report Id:  <span class="info">${reportId}</span></h4>
    <h4>Type:  <span class="info">${reportType}</span></h4>
    <h4>Status:  <span class="info">${status}</span></h4>
    <h4>Date:  <span class="info">${new Date(reportDate)}</span></h4>

    <div class="report-transaction">
        <h4>Complain Message</h4>
        <textarea readonly>${reportMessage}</textarea>
        <h4>Admin Feedback</h4>
        <input hidden value=${reportId} id="report-identifer" />
        <textarea class="admin-feedback-message" ${
          currentStudent && "readonly"
        }>${feedback || "N/A"}</textarea>
        ${currentStudent ? "" : showButton}
    </div>
`;

      // inject to div
      document.querySelector(".report-body").innerHTML = reportBody;
    });
};

const sendFeedback = () => {
  const feedbackTeaxtarea = document.querySelector(".admin-feedback-message");
  const reportId = document.querySelector("#report-identifer").value;
  const feedback = feedbackTeaxtarea.value;
  if (!feedback || feedback === "N/A") {
    feedbackTeaxtarea.style.border = "1px solid red";
    return;
  }

  fetch("https://student-complaint-system-api.herokuapp.com/complaint/edit", {
    method: "PUT",
    body: JSON.stringify({
      reportId, //backend need id to updated report
      feedback,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const btn = document.querySelector(".feedback-btn");

      // loading
      btn.innerText = "Please wait";

      setTimeout(() => {
        btn.innerText = "submitted";
      }, 2000);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
};

// 1
viewReportDetails();
