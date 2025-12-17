const API_URL = "";

const putOrPost = async (method, url, data) => {
  try {
    const req = await fetch(`/${url}`, {
      method: `${method}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (req.ok) {
      return true;
    } else {
      const errorData = await req.json();
      console.error("API Error:", errorData);
      return false;
    }
  } catch (err) {
    console.error(err);
    alert("Failed, There's something wrong!");
    return false;
  }
};

// delete
const deleteData = async (url) => {
  try {
    const req = await fetch(`/${url}`, {
      method: "delete",
    });

    if (req.ok) return true;
    else {
      console.log("Failed to remove the bootcamp!");
      return false;
    }
  } catch (err) {
    console.log("Failed to remove the bootcamp!");
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

    if (res.ok) return true;
    else {
      const errorData = await res.json();
      console.log(errorData.error || "Failed to upload the photo!");
      return false;
    }
  } catch (err) {
    console.log("Failed to upload the photo!");
    return;
  }
};

export { putOrPost, deleteData, uploadPhoto };
