const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  // Get all cats, which we can use for adding to our item.
  const [allCats] = await Promise.all([Category.find().exec()]);

  res.render("itemsView/item_form", {
    title: "Create New Item?",
    cats: allCats,
  });
});

exports.item_create_post = [
  //We need to convert the category to array to access it
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  //Validating data
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name is a required field")
    .escape(),
  body("description")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Max 100 chars allowed in description")
    .escape(),
  body("category", "A Category Must Be Added")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price")
    .trim()
    .isLength({ max: 3 })
    .withMessage("The price can maximum be two figures")
    .isLength({ min: 2 })
    .withMessage("The price cannot be empty")
    .escape(),
  body("in_stock")
    .trim()
    .isNumeric({ max: 10000 })
    .withMessage("The price can maximum be two figures")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      in_stock: req.body.in_stock,
    });

    if (!errors.isEmpty()) {
      const allCats = await Promise.all([Category.find().exec()]);

      res.render("itemsView/item_form", {
        title: "Create New Item?",
        item: item,
        cats: allCats,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

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
