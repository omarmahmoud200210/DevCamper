import { putOrPost, deleteData } from "../api/api.js";

const submitCourseBtn = document.querySelectorAll(".submit-changes-course");
const courseDeleteBtn = document.querySelectorAll(".course-delete-btn");
const addCourseBtn = document.querySelectorAll(".add-course-btn");

const submitCourseChanges = async (e) => {
  e.preventDefault();

  const button = e.target.closest("button");
  const originalBtnText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  const changesForm = e.target.closest("form");
  const courseId = changesForm.id;
  const form = new FormData(changesForm);
  const data = Object.fromEntries(form.entries());
  const url = `api/v1/courses/${courseId}`;

  const success = await putOrPost("put", url, data);

  if (success) {
    window.location.reload();
  } else {
    button.disabled = false;
    button.innerHTML = originalBtnText;
    alert("Failed to update course.");
  }
};

const removeCourse = async (e) => {
  const courseId =
    e.target.parentElement.parentElement.parentElement.nextElementSibling.id;
  const url = `api/v1/courses/${courseId}`;

  const button = e.target.closest("button"); // The button that was clicked
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

  const res = await deleteData(url);

  if (res) {
    window.location.reload();
  }
  else {
    button.disabled = false;
    button.innerHTML = originalText;
    alert("Failed to delete course.");
  }
};

const addNewCourse = async (e) => {
  e.preventDefault();

  const button = e.target.closest("button");
  const originalBtnText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  const form = e.target.closest("form");
  const bootcampId = form.id;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const url = `api/v1/bootcamps/${bootcampId}/courses`;

  const success = await putOrPost("post", url, data);

  if (success) {
    window.location.reload();
  } else {
    button.disabled = false;
    button.innerHTML = originalBtnText;
    alert("Failed to add course.");
  }
};

submitCourseBtn?.forEach((btn) => btn.addEventListener("click", submitCourseChanges));
courseDeleteBtn?.forEach((btn) => btn.addEventListener("click", removeCourse));
addCourseBtn.forEach((btn) => btn.addEventListener("click", addNewCourse));
