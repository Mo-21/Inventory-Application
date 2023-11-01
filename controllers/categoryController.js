const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

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

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_create_get");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: category_create_post");
});

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
