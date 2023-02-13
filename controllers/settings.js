import Salon from "../models/Salon.js";

/* GET SALON DATA */
export const getSalonData = async (req, res) => {
    try {
        const adminId = req._id
        const salonData = await Salon.findOne({ adminId: adminId });
        res.status(200).json({ salonData });
      }
      catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
}

/* SAVE SALON DATA */
export const addFirstSalonData = async (req, res) => {
  try {
      const firstSalonData = req.body.firstData;
      const adminId = req._id
      const newSalon = new Salon({
        name: firstSalonData.name,
        professions: firstSalonData.professions,
        city: firstSalonData.city,
        address: firstSalonData.address,
        adminId
      });
      const savedSalon = await newSalon.save();
      res.status(200).json({ message: "Salon data has been added" });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
}

/* SAVE SALON DATA */
export const saveSalonData = async (req, res) => {
  try {
      const newSalonData = req.body.newData;
      const adminId = req._id
      const updatedSalonData = await Salon.updateOne({ adminId: adminId }, {
        name: newSalonData.name,
        professions: newSalonData.professions,
        city: newSalonData.city,
        address: newSalonData.address,
        adminId
      });
    res.status(200).json({ message: "Salon data has been modified" });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
}

/* SAVE OPENING HOURS SALON DATA */
export const saveOpeningHoursData = async (req, res) => {
  try {
      const newOpeningHours = req.body.newOpeningHours;
      const adminId = req._id
      const updatedSalonData = await Salon.updateOne({ adminId: adminId }, {
        name: newOpeningHours.name,
        professions: newOpeningHours.professions,
        city: newOpeningHours.city,
        address: newOpeningHours.address,
        adminId
      });
    res.status(200).json({ message: "Opening hours data have been modified" });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
}