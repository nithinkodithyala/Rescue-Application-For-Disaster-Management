const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReliefSupplySchema = new Schema(
    {
        CenterName: {
            type: String,
            required: false,
        },
        Phone: {
            type: String,
            required: false,
        },
        ItemName:{
            type: String,
            required: false
        },
        Quantity:{
            type: String,
            required: false
        },
        Status : {
            type : String,
            required : false,
            default : "pending"
        },
        AcceptedBy : {
            type: String,
            required : false,
            default : null
        },
        DeliveryContact :{
            type: String,
            required : false,
        },
        Requester :{
            type : String,
            required : false
        }

    },

    { timestamps: true }

);

module.exports = mongoose.model("ReliefSupply", ReliefSupplySchema);
