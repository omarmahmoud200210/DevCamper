import { putOrPost, deleteData } from "./api.js";

const submitReviewBtn = document.querySelector(".submit-review");

const submitReview = async (e) => {
  e.preventDefault();

  const button = e.target.closest("button");
  const originalBtnText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

  const form = e.target.closest("form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const url = `api/v1/bootcamps/${e.target.id}/reviews`;

  const res = await putOrPost("post", url, data);

  if (res) {
    window.location.reload();
  } else {
    button.disabled = false;
    button.innerHTML = originalBtnText;
    alert("Failed to create review.");
  }
};

submitReviewBtn?.addEventListener("click", submitReview);

const deleteReviewBtn = document.querySelectorAll(".delete-review-btn");

const deleteReview = async (e) => {
  const url = `api/v1/reviews/${e.target.id}`;

  const button = e.target.closest("button"); // The button that was clicked
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

  const deletedItem = await deleteData(url);

  if (deletedItem) {
    window.location.reload();
  }
  else {
    button.disabled = false;
    button.innerHTML = originalText;
    alert("Failed to delete review.");
  }
};

deleteReviewBtn?.forEach((btn) => btn.addEventListener("click", deleteReview));
