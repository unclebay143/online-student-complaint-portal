//  get current admin login
const currentAdmin = JSON.parse(localStorage.getItem("current_admin")) || [];

const adminDatabase = [
  {
    adminId: "admin",
    password: "admin",
  },
  {
    adminId: "admin1",
    password: "admin",
  },
  {
    adminId: "admin2",
    password: "admin",
  },
  {
    adminId: "supervisor",
    password: "supervisor",
  },
];

// dom
const adminIdInput = document.querySelector("#admin_id");
const adminPasswordInput = document.querySelector("#admin_password");
const messageTag = document.querySelector(".message");
const loginBtn = document.querySelector(".admin-login-btn");

// admin login function
const loginAdmin = () => {
  const isAdminValid = adminDatabase.filter((admin) => {
    // check if user details exist
    const findAdmin =
      admin.adminId === adminIdInput.value &&
      admin.password == adminPasswordInput.value;
    //
    if (findAdmin) {
      // store admin to local storage
      localStorage.setItem("current_admin", JSON.stringify(admin));
      return admin;
    }
  });

  //
  if (isAdminValid.length > 0) {
    messageTag.innerHTML = "Login Successful";
    messageTag.style.color = "green";
    //redirect to admin dashboard
    window.location.assign("./../public/admin_dashboard.html");
  } else {
    messageTag.innerHTML = "User not found";
    messageTag.style.color = "red";
  }
};

loginBtn.addEventListener("click", loginAdmin);
