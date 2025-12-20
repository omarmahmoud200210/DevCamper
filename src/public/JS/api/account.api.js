import { putOrPost } from "../api/api.js";

// Update Details Logic
document
  .getElementById("update-details-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const button = e.target.closest("button"); // The button that was clicked
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

    const res = await putOrPost("put", "api/v1/account/updatedetails", data);
    if (res) {
      window.location.reload();
    }
    else {
      button.disabled = false;
      button.innerHTML = originalText;
      alert("Failed to update profile.");
    }
  });

// Update Password Logic
document
  .getElementById("update-password-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const button = e.target.closest("button"); // The button that was clicked
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    // Call API
    const res = await putOrPost("put", "api/v1/account/updatepassword", data);
    if (res) {
      window.location.reload();
    }
    else {
      button.disabled = false;
      button.innerHTML = originalText;
      alert("Failed to update password.");
    }
  });
