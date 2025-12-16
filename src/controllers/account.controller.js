import User from "../models/user.model.js";
import Bootcamps from "../models/bootcamp.model.js";
import asyncHandler from "../middleware/async.js";
import { hashPassword, verifyPassword } from "../config/password.js";

const renderManageAccount = asyncHandler(async (req, res) => {
  let bootcampsCount = 0;
  const user = req.user;

  if (user.role === "publisher") {
    bootcampsCount = await Bootcamps.countDocuments({ user: user._id });
  }

  return res.render("manageAccount", {
    user,
    bootcampsCount,
  });
});

const updateAccount = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, data: updatedUser });
});

const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user) {
        return res.status(404).json({ msg: "User Not Found" });
    }

    const checkPassword = await verifyPassword(currentPassword, user.password);

    if (checkPassword) {
        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();
        
        return res.status(200).json({ success: true, data: user });
    }

    return res.status(400).json({ msg: "Current password is incorrect" });
});

export { renderManageAccount, updateAccount, updatePassword };
