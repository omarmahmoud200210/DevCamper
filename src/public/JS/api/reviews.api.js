import {
    putOrPost,
    deleteData,
} from "./api.js";

const submitReviewBtn = document.querySelector(".submit-review");

const submitReview = async (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const url = `api/v1/bootcamps/${e.target.id}/reviews`;

  await putOrPost("post", url, data);
};

submitReviewBtn?.addEventListener("click", submitReview);

const deleteReviewBtn = document.querySelectorAll(".delete-review-btn");

const deleteReview = async (e) => {
    const url = `api/v1/reviews/${e.target.id}`;
    await deleteData(url);
};

deleteReviewBtn?.forEach(btn => btn.addEventListener("click", deleteReview));
