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

  // Disable button to prevent multiple submissions
  addBootcampBtn.disabled = true;

  const originalBtnText = addBootcampBtn.innerHTML;
  addBootcampBtn.innerHTML =
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
        addBootcampBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin mr-2"></i> Uploading Photo...';
        await uploadPhoto(formData, photoURL);
      }

      window.location.reload();
    } else {
      alert(result.error || "Failed to create bootcamp");
      addBootcampBtn.disabled = false;
      addBootcampBtn.innerHTML = originalBtnText;
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
    addBootcampBtn.disabled = false;
    addBootcampBtn.innerHTML = originalBtnText;
  }
};

removeBtn?.forEach((btn) => btn.addEventListener("click", removeBootcamp));
submitChangesBtn?.addEventListener("click", submitBootcampsChanges);
addBootcampBtn?.addEventListener("click", addNewBootcamp);
