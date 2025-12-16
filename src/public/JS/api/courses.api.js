import { putOrPost, deleteData } from "../api/api.js";

const submitCourseBtn = document.querySelector(".submit-changes-course");
const courseDeleteBtn = document.querySelectorAll(".course-delete-btn");
const addCourseBtn = document.querySelectorAll(".add-course-btn");

const submitCourseChanges = async (e) => {
  e.preventDefault();

  const changesForm = e.target.closest("form");
  const courseId = changesForm.id;
  const form = new FormData(changesForm);
  const data = Object.fromEntries(form.entries());
  const url = `api/v1/courses/${courseId}`;

  await putOrPost("put", url, data);
};

const removeCourse = async (e) => {
  const courseId =
    e.target.parentElement.parentElement.parentElement.nextElementSibling.id;
  const url = `api/v1/courses/${courseId}`;

  await deleteData(url);
};

const addNewCourse = async (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  const bootcampId = form.id;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const url = `api/v1/bootcamps/${bootcampId}/courses`;

  await putOrPost("post", url, data);
};

submitCourseBtn?.addEventListener("click", submitCourseChanges);
courseDeleteBtn?.forEach((btn) => btn.addEventListener("click", removeCourse));
addCourseBtn.forEach((btn) => btn.addEventListener("click", addNewCourse));