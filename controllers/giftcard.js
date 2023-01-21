import Giftcard from "../models/Giftcard.js";

/* GET GIFTCARD LIST */
export const getGiftcardList = async (req, res) => {
    try {
        const adminId = req._id;
        const foundGiftcards = await Giftcard.find({ adminId: adminId });
        res.status(200).json({ foundGiftcards });
    } catch (err) {
       res.status(500).json({ error: err.message });
       console.log(err);
    }
}

/* GET GIFTCARD DETAILS */
export const getGiftcardDetails = async (req, res) => {
    try {
        const adminId = req._id;
        const giftcardId = req.params.id;
        const foundGiftcard = await Giftcard.findById(giftcardId);
        if (foundGiftcard && foundGiftcard.adminId === adminId) return res.status(200).json({ foundGiftcard });
        res.status(404).json({ message: "Giftcard doesn't exist" });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
  }

/* ADD NEW GIFTCARD */
export const addNewGiftcard = async (req, res) => {
    try {
        const adminId = req._id;
        const giftcardData = req.body.giftcardData;
        const newGiftcard = new Giftcard({
            adminId,
            status: giftcardData.status,
            identifier: giftcardData.identifier,
            amount: giftcardData.amount,
            startDate: giftcardData.startDate,
            endDate: giftcardData.endDate,
        })
        const savedGiftcard = await newGiftcard.save();
        res.status(201).json({ message: 'Giftcard has been saved', savedGiftcard});
    } catch (err) {
       res.status(500).json({ error: err.message });
       console.log(err);
    }  
}

/* EDIT GIFTCARD */
export const editGiftcard = async (req, res) => {
    try {
        const newGiftcardData = req.body.newGiftcardData;
        const giftcardId = newGiftcardData._id;
        const updatedGiftcard = await Giftcard.updateOne({ _id: giftcardId }, {
            status: newGiftcardData.status,
            identifier: newGiftcardData.identifier,
            amount: newGiftcardData.amount,
            startDate: newGiftcardData.startDate,
            endDate: newGiftcardData.endDate,
        })
        res.status(200).json({ message: 'Giftcard has been modified' });
    } catch (err) {
       res.status(500).json({ error: err.message });
       console.log(err);
    }  
}

/* DELETE GIFTCARD */
export const deleteGiftcard = async (req, res) => {
    try {   
        const giftcardId = req.body.giftcardId;
        const deletedGiftcard = Giftcard.deleteOne({ _id: giftcardId });
        res.status(200).json({ message: 'Giftcard has been deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }  
}