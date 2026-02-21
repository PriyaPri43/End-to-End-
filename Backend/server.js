const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "https://end-to-end-tau.vercel.app/",
  })
);

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// DB connect
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () =>
        console.log(`Server running on ${process.env.PORT}`)
  );
});