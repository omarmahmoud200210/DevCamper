import { putOrPost, deleteData, uploadPhoto } from "../api/api.js";

const submitChangesBtn = document.querySelectorAll(".submit-changes");
const removeBtn = document.querySelectorAll(".removeBtn");
const addBootcampBtn = document.querySelector(".post-btn-bootcamp");

const submitBootcampsChanges = async (e) => {
  e.preventDefault();

  const button = e.target.closest("button"); // The button that was clicked
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  const changesForm = e.target.closest("form");
  const bootcampId = changesForm.id;
  const form = new FormData(changesForm);
  const data = Object.fromEntries(form.entries());
  const url = `api/v1/bootcamps/${bootcampId}`;

  const success = await putOrPost("put", url, data);

  if (success) {
    window.location.reload();
  } else {
    button.disabled = false;
    button.innerHTML = originalText;
    alert("Failed to update bootcamp.");
  }
};

const removeBootcamp = async (e) => {
  const bootcampId = e.target.parentElement.parentElement.parentElement.id;
  const url = `api/v1/bootcamps/${bootcampId}`;
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
    alert("Failed to remove bootcamp.");
  }
};

const addNewBootcamp = async (e) => {
  e.preventDefault();

  // Disable button to prevent multiple submissions
  const button = e.target.closest("button");
  button.disabled = true;

  const originalBtnText = button.innerHTML;
  button.innerHTML =
    '<i class="fas fa-spinner fa-spin mr-2"></i> Creating...';

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

  try {
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

      if (file && file.size > 0) {
        button.innerHTML =
          '<i class="fas fa-spinner fa-spin mr-2"></i> Uploading Photo...';
        await uploadPhoto(formData, photoURL);
      }

      // window.location.reload();
    } else {
      alert(result.error || "Failed to create bootcamp");
      button.disabled = false;
      button.innerHTML = originalBtnText;
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
    button.disabled = false;
    button.innerHTML = originalBtnText;
  }
};

removeBtn?.forEach((btn) => btn.addEventListener("click", removeBootcamp));
submitChangesBtn?.forEach((btn) => btn.addEventListener("click", submitBootcampsChanges));
addBootcampBtn?.addEventListener("click", addNewBootcamp);
