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

/* ADD NEW GIFTCARD */
export const addNewGiftcard = async (req, res) => {
    try {
        const adminId = req._id;
        const giftcardData = req.body.giftcardData;
        const newGiftcard = new Giftcard({
            adminId,
            identifier,
            amount,
            startDate,
            endDate,
        })
        const savedGiftcard = await newGiftcard.save();
        res.status(200).json({ message: 'Giftcard has been saved', savedGiftcard });
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
            newGiftcardData
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