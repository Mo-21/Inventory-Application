const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const [numItems, numCats] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Sameh Mall",
    item_count: numItems,
    category_count: numCats,
  });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCats = await Category.find({}).sort({ name: 1 }).exec();
  res.render("catViews/category_list", {
    title: "Categories",
    category_list: allCats,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [catDetails, allItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, "name in_stock"),
  ]);

  if (catDetails === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("catViews/cat_details", {
    title: catDetails.name,
    catDetails: catDetails,
    category_items: allItems,
  });
});

//To display the form to create
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("catViews/category_form", { title: "Create New Category?" });
});

//To handle new entries
exports.category_create_post = [
  body("name")
    .trim() //to remove whitespace
    .isLength({ min: 1 })
    .escape() //to remove html elements
    .withMessage("Name is a required field")
    .isAlphanumeric()
    .withMessage("Please write in English"),
  body("description")
    .trim()
    .isLength({ max: 100 })
    .escape()
    .withMessage("Max 100 chars allowed in description"),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    // There are errors. Render form again with sanitized values/errors messages.
    if (!errors.isEmpty()) {
      res.render("catViews/category_form", {
        title: "Create New Category?",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_delete_get");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_delete_post");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_update_get");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_update_post");
});
