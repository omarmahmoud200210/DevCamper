import User from "../models/user.model.js";

const renderForgetPasswordPage = (req, res) => {
  res.render("forgot-password", { msg: "" });
};

const authenticateUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .render("forgot-password", { msg: "The User Not Found" });
    }

    user.getResetPasswordToken();
    await user.save();

    return res.redirect(`/api/v1/reset-password?token=${user.resetPasswordToken}`);
  } catch (err) {
    return res
      .status(500)
      .render("forgot-password", { msg: "Something went wrong" });
  }
};

export { renderForgetPasswordPage, authenticateUser };
