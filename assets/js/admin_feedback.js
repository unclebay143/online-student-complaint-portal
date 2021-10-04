//  admin change report status
const updateStatus = (reportId) => {
  const reportStatus = document.querySelector(`.status-dropdown${reportId}`);
  //check if the user made a selection
  const selectionIsBlank =
    !reportStatus.options[reportStatus.selectedIndex].value;
  // if no selection
  if (selectionIsBlank) {
    return;
  }
  // change the status of the report to the selected status
  newStatus = reportStatus.options[reportStatus.selectedIndex].value;

  fetch("https://student-complaint-system-api.herokuapp.com/complaint/edit", {
    method: "PUT",
    body: JSON.stringify({
      reportId, //backend need id to updated report
      status: newStatus,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // reload to update the ui
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
};

// // view report body
// const viewReport = (reportId) => {
//   // store the report id in local storage
//   localStorage.setItem("viewing_report", JSON.stringify(reportId));
//   // redirect to the report view page
//   window.location.assign("./view_report.html");
// };
