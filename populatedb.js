#! /usr/bin/env node

console.log(
  'This script populates some test items and cats to database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const categoryDetail = { name: name, description: description };

  const category = new Category(categoryDetail);

  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category) {
  const itemDetail = {
    name: name,
    description: description,
    category: category,
  };

  const item = new Item(itemDetail);
  await item.save();
  items[index] = item;
  console.log(`Added items: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "Fruits",
      "Fresh fruits, each with its own unique flavor and texture."
    ),
    categoryCreate(
      1,
      "Vegetables",
      "Vibrant vegetables, perfect for adding color and flavor."
    ),
    categoryCreate(
      2,
      "Dairy",
      "From creamy milk and butter to a variety of cheeses."
    ),
    categoryCreate(
      3,
      "Bakery",
      "It is all about baked goods that provide comfort and convenience."
    ),
  ]);

  await createItems();
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      0,
      "Banana",
      "Sweet and creamy bananas, a great source of potassium and energy.",
      categories[0]
    ),
    itemCreate(
      1,
      "Strawberries",
      " and juicy red strawberries, versatile for desserts, salads, or snacking.",
      categories[0]
    ),
    itemCreate(
      2,
      "Broccoli",
      "Nutrient-rich green florets, great for steaming, roasting, or adding to salads.",
      categories[1]
    ),
    itemCreate(
      3,
      "Butter",
      "Smooth and creamy unsalted butter, essential for baking and cooking.",
      categories[2]
    ),
    itemCreate(
      4,
      "Yogurt",
      "Thick and creamy plain Greek yogurt, high in protein and perfect for breakfast.",
      categories[2]
    ),
    itemCreate(
      5,
      "Bagels",
      "Chewy and delicious plain bagels, ideal for breakfast or making sandwiches.",
      categories[3]
    ),
    itemCreate(
      6,
      "Muffins (Blueberry)",
      "Moist and flavorful blueberry muffins, great for a quick breakfast or snack.",
      categories[3]
    ),
  ]);
}
