import { putOrPost } from "/JS/api/api.js";

// Update Details Logic
document
  .getElementById("update-details-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Call API (You need to implement this route)
    const res = await putOrPost("put", "api/v1/account/updatedetails", data);
    if (res && res.success) {
      alert("Profile updated successfully");
      window.location.reload();
    }
  });

// Update Password Logic
document
  .getElementById("update-password-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    // Call API
    const res = await putOrPost("put", "api/v1/account/updatepassword", data);
    if (res && res.success) {
      alert("Password updated successfully");
      e.target.reset();
    }
  });
