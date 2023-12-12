const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReliefCenterSchema = new Schema(
  {
    CenterName: {
      type: String,
      required: true
    },
    InCharge: {
      type: String,
      required: true
    },
    Capacity:{
      type : Number,
      required : true
    },
    Phone: {
      type: String,
      required: true 
    }, 
    Admission: {
      type: Number,
      default : 0
      // required: true
    },
    email:{
      type:String,
      required:true,
    },
    latitude:{
      type:String,
      required:true
    },
    longitude:{
      type:String,
      required:true
    },
    Address:{
      type: String,
      required: true
    }
},
  
  { timestamps: true }

);

module.exports = mongoose.model("reliefCenter", ReliefCenterSchema);
