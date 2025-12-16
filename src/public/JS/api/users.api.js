import { deleteData } from "./api.js";

const removeBtn = document.querySelectorAll(".removeUser");


const deleteUsers = async (e) => {
    e.preventDefault();
    const userId = e.target.closest("form").id;
    await deleteData(`api/v1/users/${userId}`);
}

removeBtn?.forEach(btn => btn.addEventListener("click", deleteUsers))