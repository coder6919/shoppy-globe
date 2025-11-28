const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product.model");

dotenv.config();

const seedProducts = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  
  // Map API data to your Schema
  const products = data.products.map(item => ({
    title: item.title,
    price: item.price,
    description: item.description,
    stock: item.stock,
    thumbnail: item.thumbnail
  }));

  // Wipes old data and inserts new
  await Product.deleteMany({}); 
  await Product.insertMany(products);
  console.log("✅ Database Seeded!");
  process.exit();
};

seedProducts();