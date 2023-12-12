const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionCenterSchema = new Schema(
  {
    CenterName: {
      type: String,
      required: true,
    },
    InCharge: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true, 
      unique: true,
    },
    Address:{
      type: String,
      required: true
    }
},
  
  { timestamps: true }

);

module.exports = mongoose.model("collectionCenter", CollectionCenterSchema);
