// get current user
const currentUser = JSON.parse(localStorage.getItem("current_student"));

// check session
if (!currentUser) {
  window.location.assign("./../public/login.html");
}

// get report database
const report_db = JSON.parse(localStorage.getItem("report_db")) || [];

// report form inputs
const reporterName = document.querySelector("#reporter-name");
const reporterEmail = document.querySelector("#reporter-email");
const reporterPhone = document.querySelector("#reporter-num");
const reporterAddress = document.querySelector("#reporter-address");
const reportType = document.querySelector("#report-type");
const reportMessage = document.querySelector("#report-message");
const reportSubmitBtn = document.querySelector("#report-submit-btn");

// prefill information
reporterName.value = currentUser.fullname;
const reporterMatricNumber = currentUser.matricNumber;

// report submission function
const submitReport = () => {
  reportSubmitBtn.innerHTML = "Submitting...";
  // generate unique id for report
  const uniqueReportId = `${Date.now()
    .toString()
    .slice(-4)}-${reporterMatricNumber.slice(-4)}`;

  const newReport = {
    reporterMatricNumber,
    reportMessage: reportMessage.value,
    reporterName: reporterName.value,
    reporterEmail: reporterEmail.value,
    reporterAddress: reporterAddress.value,
    reporterPhone: reporterPhone.value,
    reportType: reportType.options[reportType.selectedIndex].value,
    status: "pending",
    feedback: null,
    reportDate: Date.now(),
    reportId: uniqueReportId,
  };

  fetch("https://student-complaint-system-api.herokuapp.com/complaint/add", {
    method: "POST",
    body: JSON.stringify(newReport),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.statusCode === 200) {
        window.location.assign("./success.html");
      } else {
        reportSubmitBtn.innerHTML = "Try again";
      }
    })
    .catch((error) => console.log(error));
};

// bind function to button
reportSubmitBtn.addEventListener("click", submitReport);
