import Service from "../models/Service.js";

export const getServiceList = async (req, res) => {
    try {
        const adminId = req._id
        const foundServices = await Service.find({ adminId: adminId });
        res.status(200).json({ foundServices });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
}

export const addNewService = async (req, res) => {
    try {
        const serviceData = req.body.serviceData;
        const adminId = req._id;
        const service = new Service({
          name: serviceData.name,
          category: serviceData.category,
          price: serviceData.price,
          time: serviceData.time,
          description: serviceData.description,
          steps: serviceData.steps,
          adminId,
        })
        const savedService = await service.save();
        res.status(200).json({ message: "Service has been added" });
      }
    catch (err) {
        res.status(500).json({ error: err.message });
      }
}