import { putOrPost, deleteData, uploadPhoto } from "../api/api.js";

const submitChangesBtn = document.querySelector(".submit-changes");
const removeBtn = document.querySelectorAll(".removeBtn");
const addBootcampBtn = document.querySelector(".post-btn-bootcamp");

const submitBootcampsChanges = async (e) => {
  e.preventDefault();

  const changesForm = e.target.closest("form");
  const bootcampId = changesForm.id;
  const form = new FormData(changesForm);
  const data = Object.fromEntries(form.entries());
  const url = `api/v1/bootcamps/${bootcampId}`;

  await putOrPost("put", url, data);
};

const removeBootcamp = async (e) => {
  const bootcampId = e.target.parentElement.parentElement.parentElement.id;
  const url = `api/v1/bootcamps/${bootcampId}`;

  await deleteData(url);
};

const addNewBootcamp = async (e) => {
  e.preventDefault();
  const form = document.getElementById("add-bootcamp-form");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Handle careers array explicitly
  data.careers = formData.getAll("careers");

  // Handle Booleans
  const file = formData.get("file");
  data.housing = !!formData.get("housing");
  data.jobAssistance = !!formData.get("jobAssistance");
  data.jobGuarantee = !!formData.get("jobGuarantee");
  data.acceptGi = !!formData.get("acceptGi");
  delete data.photo;

  const res = await fetch("/api/v1/bootcamps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    const newBootcampId = result.data._id;
    const photoURL = `api/v1/bootcamps/${newBootcampId}/photo`;

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      await uploadPhoto(formData, photoURL);
    }

  }
};

removeBtn?.forEach((btn) => btn.addEventListener("click", removeBootcamp));
submitChangesBtn?.addEventListener("click", submitBootcampsChanges);
addBootcampBtn?.addEventListener("click", addNewBootcamp);
