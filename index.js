require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const uri = process.env.DB_CONNECTION_STRING.replace(
  "PASSWORD",
  process.env.DB_PASSWORD
);

mongoose
  .connect(uri)
  .then((con) => console.log("Database connected successfully!"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on prot ${process.env.PORT}`);
});
