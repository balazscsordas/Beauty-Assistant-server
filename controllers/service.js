import Service from "../models/Service.js";

/* GET SERVICE LIST */
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

/* GET SERVICES CATEGORY LIST */
export const getCategoryList = async (req, res) => {
  try {
      const adminId = req._id
      let categoryList = ["Új kategória hozzáadása"]
      const foundServices = await Service.find({ adminId: adminId });
      foundServices.map(service => {
        if (!categoryList.includes(service.category)) {
          categoryList.push(service.category);
        }
      })
      res.status(200).json({ categoryList });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
}

/* GET SERVICE DETAILS */
export const getServiceDetails = async (req, res) => {
  try {
      const adminId = req._id;
      const serviceId = req.params.id;
      let categoryList = ["Új kategória hozzáadása"]
      let foundService = "";
      const foundServices = await Service.find({ adminId: adminId });
      foundServices.map(service => {
        if (!categoryList.includes(service.category)) {
          categoryList.push(service.category);
        }
        if (service._id == serviceId) {
          foundService = service;
        }
      })
      if (foundService && foundService.adminId === adminId) return res.status(200).json({ foundService, categoryList });
      res.status(404).json({ message: "Service doesn't exist" });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
}

/* ADD NEW SERVICE */
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

/* MODIFY SERVICE DATA */
export const modifyServiceData = async (req, res) => {
  try {
      const newServiceData = req.body.newServiceData;
      const updatedService = await Service.updateOne({ _id: newServiceData._id }, {
          category: newServiceData.category,
          name: newServiceData.name,
          price: newServiceData.price,
          time: newServiceData.time,
          description: newServiceData.description,
          steps: newServiceData.steps
        });
      res.status(200).json({ message: "Service data has been modified" });
  }
  catch (err) {
      res.status(500).json({ error: err.message });
  }
}

/* DELETE SERVICE */
export const deleteService = async (req, res) => {
  try {
      const serviceId = req.body.serviceId;
      const deletedService = await Service.deleteOne({ _id: serviceId });
      res.status(200).json({ message: "Service has been deleted" });
  }
  catch (err) {
      res.status(500).json({ error: err.message });
  }
}