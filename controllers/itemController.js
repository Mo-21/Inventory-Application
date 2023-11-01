const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name category price")
    .sort({ name: 1 })
    .populate("category")
    .exec();

  res.render("itemsView/item_list", {
    title: "All Items",
    item_list: allItems,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const itemDetail = await Item.findById(req.params.id)
    .populate("category")
    .exec();

  if (itemDetail === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("itemsView/item_details", {
    title: itemDetail.name,
    itemDetail: itemDetail,
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_create_get");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_create_post");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_delete_get");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_delete_post");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_update_get");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("DRAFT DATA: item_update_post");
});
