const mongoose = require("mongoose");

mongoose.set('strictQuery', false)
mongoose
  .connect("mongodb+srv://vavaldasjaiwanth:12345@cluster0.ox9odc0.mongodb.net/", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }) 
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));
  
const db = mongoose.connection;

module.exports = db;
