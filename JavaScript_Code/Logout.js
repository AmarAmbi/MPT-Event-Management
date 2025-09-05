try{  document.addEventListener("DOMContentLoaded", function () {
      const logoutBtn = document.getElementById("logoutBtn");
      const popup = document.getElementById("popup");

      logoutBtn.addEventListener("click", function (e) {
          e.preventDefault(); // Stop normal navigation

          // Clear login flag (if you're using localStorage to manage login)
          localStorage.setItem("isLoggedIn", "false");

          // Show popup message
          popup.textContent = "Logout Successfully";
          popup.style.display = "block";

          // Hide popup and redirect after 2 seconds
          setTimeout(() => {
              popup.style.display = "none";
              window.location.href = "Login.html";
          }, 1000);
      });
  });
} catch (error) {
  console.error('An error occurred:', error);
}
