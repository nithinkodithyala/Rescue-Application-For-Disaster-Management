const ReliefCenter = require("../models/reliefCenter");
const ReliefSupply = require("../models/reliefSupply")

module.exports = {

  addReliefCenter: async (req, res) => {
    const { CenterName, Address, InCharge,email, Capacity, latitude, longitude, Phone, Admission } = req.body;
    try {
      const result = await ReliefCenter.create({
        CenterName,
        InCharge,
        Phone,
        Capacity,
        Admission,
        email,
        latitude,
        longitude,
        Address
      });
      console.log(result);
      res.status(201).json({ message: "Relief Center added with success" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getReliefCenter: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id vanno");
    try {
      const userdata = await ReliefCenter.find({ InCharge: req.params.id });
      console.log(userdata);
      res.status(200).json(userdata)

    } catch (error) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  },

  addadmission: async (req, res) => {
    const id = req.params.id;
    const { Admission } = req.body;
    console.log(Admission)

    try {
      const userdata = await ReliefCenter.findByIdAndUpdate(id, {
        $set: {
          Admission: Admission
        }
      });
      res.status(200).json(userdata)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getAllReliefCenter: async (req, res) => {

    try {
      const user = await ReliefCenter.find()
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }

  },


  addReliefSupplyRequest: async (req, res) => {
    const { CenterName, Phone, ItemName, Quantity, Status, AcceptedBy, Delivered, Requester } = req.body;
    try {
      const result = await ReliefSupply.create({
        CenterName,
        Phone,
        ItemName,
        Quantity,
        Status,
        AcceptedBy,
        Delivered,
        Requester
      });
      res.status(201).json({ message: "Relief Supply Request Sent" });
    } catch (error) {
      console.log(error.message);
    }
  },
  confirmDelivery: async (req, res) => {
    const id = req.params.id;

    try {
      const userdata = await ReliefSupply.findByIdAndUpdate(id, {
        $set: {
          Status : 'delivered'
        }
      });
      res.status(200).json(userdata)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getAllReliefSupplyReqeuest: async (req, res) => {

    try {
      const user = await ReliefSupply.find({ Status: 'pending' })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getReliefSupplyReqeuestbyCreator: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await ReliefSupply.find({ Requester: id })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getReliefSupplyReqeuestAccepted: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await ReliefSupply.find({ Status: 'accepted', AcceptedBy: id })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },


















}


