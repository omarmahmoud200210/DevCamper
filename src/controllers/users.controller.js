import User from "../models/user.model.js";

const renderUsers = async (req, res) => {
    const users = await User.find();
    res.render("usersDashboard", { currentUser: req.user, users });
}

const deleteUsers = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();
    return res.status(200).json({ success: true, message: "User deleted successfully" });
}


export { renderUsers, deleteUsers }