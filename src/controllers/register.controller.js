import User from "../models/user.model.js";
import { hashPassword } from "../config/password.js";

const renderRegisterPage = (req, res) => res.render("register");

const handleRegistration = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.render("register", { msg: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.render("register", { msg: "User already exists" });
    } else {
      let hashedPassword = await hashPassword(password);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        res.redirect("/api/v1/login?success=User registered successfully");
      }
    }
  } catch (err) {
    res.render("register", {
      msg: "Something wrong with the registration process",
    });
    console.log(err);
  }
};

export { renderRegisterPage, handleRegistration };
