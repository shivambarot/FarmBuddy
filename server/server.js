const express = require("express");
const app = express();
const cors = require("cors");

const cartRoute = require("./routes/cartRoute");
const commissionRoute = require("./routes/commissionRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const taxRoute = require("./routes/taxRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({limit: '50mb'}));

// app.use(require("./routes/record"));

app.use("/cart", cartRoute);
app.use("/commission", commissionRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);
app.use("/tax", taxRoute);
app.use("/user", userRoute);


// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});