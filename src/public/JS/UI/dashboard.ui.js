const coursesSection = document.querySelectorAll(".courses");
const editSection = document.querySelectorAll(".edit");
const editBtn = document.querySelectorAll(".editBtn");
const courseBtn = document.querySelectorAll(".courseBtn");
const courseEditBtn = document.querySelectorAll(".course-edit-btn");
const addCourseBtn = document.querySelectorAll(".display-course-form");
const cancelCourseBtn = document.querySelectorAll(".cancel-changes");
const cancelBtn = document.querySelectorAll(".cancelBtn");
const addCourseForm = document.querySelectorAll(".course-form-add");
const editCourseSec = document.querySelectorAll(".course-form");
const ratingSpan = document.getElementById("rating-display");
const ratingValue = document.getElementById("rating");

const toggleSection = (section, id, section2) => {
  section.forEach((section, index) => {
    if (section.id === id) section.classList.toggle("hidden");

    if (section2[index].id === id) {
      if (!section2[index].classList.contains("hidden")) {
        section2[index].classList.add("hidden");
      }
    }
  });
};

const handleCourseButton = (e) => {
  const bootcampId = e.target.parentElement.parentElement.parentElement.id;
  toggleSection(coursesSection, bootcampId, editSection);
};

const handleEditButton = (e) => {
  const bootcampId = e.target.parentElement.parentElement.parentElement.id;
  toggleSection(editSection, bootcampId, coursesSection);
};

editBtn.forEach((btn) => btn.addEventListener("click", handleEditButton));
courseBtn.forEach((btn) => btn.addEventListener("click", handleCourseButton));

const handleCancelBootcampSection = (e) => {
  const form = e.target.closest("tr");
  if (form) form.classList.add("hidden");
};

const handleCourseEditButton = (e) => {
  const button = e.target.closest(".course-edit-btn");
  if (!button) return;
  const form = document.querySelector(`.course-form[id="${button.id}"]`);
  if (form) form.classList.toggle("hidden");
};

const handelCancelCourseSection = (e) => {
  const form = e.target.closest("form");
  if (form) form.classList.add("hidden");
};

const handleAddCourse = (e) => {
  const button = e.target.closest(".display-course-form");
  if (!button) return;
  const form = document.querySelector(`.course-form-add[id="${button.id}"]`);
  if (form) form.classList.toggle("hidden");
};

addCourseBtn.forEach((btn) => btn.addEventListener("click", handleAddCourse));

courseEditBtn.forEach((btn) =>
  btn.addEventListener("click", handleCourseEditButton)
);

cancelBtn?.forEach((btn) =>
  btn.addEventListener("click", handleCancelBootcampSection)
);
cancelCourseBtn?.forEach((btn) =>
  btn.addEventListener("click", handelCancelCourseSection)
);

const displayRating = (e) => (ratingSpan.textContent = e.target.value);
ratingValue?.addEventListener("change", displayRating);

const reviewContent = document.getElementById("reviewModal");
const openModalButton = document.querySelectorAll(".open-modal");
const closeModalButton = document.getElementById("closeModalBtn");

const displayReviewContent = (e) => {
  const title = document.querySelectorAll(".title-review");
  const content = document.querySelectorAll(".review-text");
  let modalTitle = document.getElementById("modalTitle");
  let modalContent = document.getElementById("modalContent");

  title.forEach((item, index) => {
    if (item.textContent === e.target.textContent) {
      modalTitle.textContent = item.textContent;
      modalContent.textContent = content[index].textContent;
    }
  });

  reviewContent.classList.remove("hidden");
};
const hideReviewContent = () => reviewContent.classList.add("hidden");

openModalButton.forEach((btn) =>
  btn.addEventListener("click", displayReviewContent)
);

closeModalButton?.addEventListener("click", hideReviewContent);
