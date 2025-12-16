import Bootcamp from "../models/bootcamp.model.js";

const renderLandingPage = async (req, res) => {
     const bootcamps = await Bootcamp.find().limit(3).populate("courses");
    res.render("index", { user: req.user, bootcamps });
}

export { renderLandingPage };