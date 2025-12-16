import User from "../models/user.model.js";
import { hashPassword } from "../config/password.js";

const renderResetPage = (req, res) => {
  res.render("reset-password", { msg: "", email: req.query.email });
};

const resetPassword = async (req, res) => {
  const { password, email } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("reset-password", { msg: "User Not Found!" });
    }

    user.password = hashedPassword;
    await user.save();
    res.redirect("/api/v1/login");
  } catch (err) {
    console.log(err);
    res.render("reset-password", { msg: "Something went wrong!" });
  }
};

export { renderResetPage, resetPassword };
