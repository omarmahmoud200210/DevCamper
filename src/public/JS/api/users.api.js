import { deleteData } from "./api.js";

const removeBtn = document.querySelectorAll(".removeUser");

const deleteUsers = async (e) => {
  e.preventDefault();
  const userId = e.target.closest("form").id;

  const button = e.target.closest("button"); // The button that was clicked
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

  const res = await deleteData(`api/v1/users/${userId}`);

  if (res) {
    window.location.reload();
  }
  else {
    button.disabled = false;
    button.innerHTML = originalText;
    alert("Failed to delete user.");
  }
};

removeBtn?.forEach((btn) => btn.addEventListener("click", deleteUsers));
