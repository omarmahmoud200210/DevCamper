const result =
  (model, populate, populate2 = "") =>
  async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = [
      "select",
      "sort",
      "page",
      "limit",
      "skip",
      "name",
      "zipcode",
      "distance",
      "rating",
      "budget",
    ];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in)/g,
      (match) => `$${match}`
    );

    if (populate2 !== "") {
      query = model
        .find(JSON.parse(queryStr))
        .populate(populate)
        .populate(populate2);
    } else {
      query = model.find(JSON.parse(queryStr)).populate(populate);
    }

    // Select
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",").join(" ");
      query = query.sort(sortFields);
    } else query = query.sort("createdAt");

    // name
    if (req.query.name) {
      query = query.find({ name: { $regex: req.query.name, $options: "i" } });
    }

    // zipcode and distance
    if (req.query.zipcode && req.query.distance) {
      const { zipcode, distance } = req.query;

      const loc = await geo.geocode(zipcode);
      const lat = loc[0].latitude;
      const lng = loc[0].longitude;

      const radius = distance / 3963;

      query = query.find({
        location: {
          $geoWithin: { $centerSphere: [[lng, lat], radius] },
        },
      });
    }

    // rating and budget
    if (req.query.rating) {
      query = query.find({ averageRating: { $gte: req.query.rating } });
    }

    if (req.query.budget) {
      query = query.find({ averageCost: { $lte: req.query.budget } });
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 4;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(query.getFilter());

    query = query.skip(skip).limit(limit);

    const bootcamps = await query;

    // Handle Pagination
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
        total,
      };
    }

    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
        total,
      };
    }

    const totalPages = Math.ceil(total / limit);

    res.results = {
      success: true,
      bootcamps,
      totalPages,
      pagination,
      page,
      name: req.query.name,
      zipcode: req.query.zipcode,
      distance: req.query.distance,
      rating: req.query.rating,
      budget: req.query.budget,
      user: req.user,
    };

    next();
  };

export default result;
