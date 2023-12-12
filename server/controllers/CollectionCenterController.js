const CollectionCenter = require("../models/CollectionCenter");

const ReliefSupply = require("../models/reliefSupply")

module.exports = {

  addReliefCenter: async (req, res) => {
    const { CenterName, InCharge, Phone, Address } = req.body;
    try {
      const result = await CollectionCenter.create({
        CenterName,
        InCharge,
        Phone,
        Address
      });
      res.status(201).json({ message: "Collection added with success" });

    } catch (error) {
      console.log(error.message);
    }
  },


  getAllReliefCenter: async (req, res) => {
    try {
      const user = await CollectionCenter.find()
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }

  },
  AcceptDelivery: async (req, res) => {
    const id = req.params.id;
    const { AcceptedBy } = req.body;
    console.log('accept' + AcceptedBy)

    try {
      const data = await ReliefSupply.findByIdAndUpdate(id, {
        $set: {
          Status: 'accepted',
          AcceptedBy
        }
      });
      res.status(200).json(data)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  DispatchItem: async (req, res) => {
    const id = req.params.id;
    const { DeliveryContact } = req.body;

    try {
      const data = await ReliefSupply.findByIdAndUpdate(id, {
        $set: {
          Status: 'dispatched',
          DeliveryContact
        }
      });
      res.status(200).json(data)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getCollectionCenter: async (req, res) => {
    const id = req.params.id;
    console.log(id, "id vanno");
    try {
      const userdata = await CollectionCenter.find({ InCharge: req.params.id });
      console.log(userdata);
      res.status(200).json(userdata)

    }
    catch (error) {
      return res.status(401).json({
        message: 'Get Req Failed'
      });
    }
  },

}


