const API_URL = "";

const putOrPost = async (method, url, data) => {
  try {
    const req = await fetch(`/${url}`, {
      method: `${method}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (req.ok) window.location.reload();
    else {
      const errorData = await req.json();
      console.error("API Error:", errorData);
      alert(errorData.error || "Failed to save the changes!!");
      return;
    }
  } catch (err) {
    alert("Failed, There's something wrong!");
    return;
  }
};

// delete
const deleteData = async (url) => {
  try {
    const req = await fetch(`/${url}`, {
      method: "delete",
    });

    if (req.ok) window.location.reload();
    else {
      alert("Failed to remove the bootcamp!");
      return;
    }
  } catch (err) {
    alert("Failed to remove the bootcamp!");
    return;
  }
};

// upload photo
const uploadPhoto = async (formData, url) => {
  try {
    const res = await fetch(`/${url}`, {
      method: "put",
      body: formData,
    });

    if (res.ok) window.location.reload();
    else {
      const errorData = await res.json();
      console.error("Upload Error:", errorData);
      alert(errorData.error || "Failed to upload the photo!");
      return;
    }
  } catch (err) {
    alert("Failed to upload the photo!");
    return;
  }
};

export { putOrPost, deleteData, uploadPhoto };
