import Client from "../models/Client.js";

/* GET CLIENT LIST */
export const getClientList = async (req, res) => {
    try {
        const adminId = req._id;
        const foundClients = await Client.find({ adminId: adminId }, 'name age');
        res.status(200).json({ foundClients });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/* GET CLIENT DETAILS */
export const getClientDetails = async (req, res) => {
    try {
        const adminId = req._id;
        const clientId = req.params.id;
        const foundClient = await Client.findById(clientId);
        if (foundClient && foundClient.adminId === adminId) return res.status(200).json({ foundClient });
        res.status(404).json({ message: "Client doesn't exist" });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/* ADD NEW CLIENT */
export const addNewClient = async (req, res) => {
    try {
        const clientData = req.body.clientData;
        const adminId = req._id;
        const client = new Client({
          name: clientData.name,
          age: clientData.age,
          mobileNumber: clientData.mobileNumber,
          allergies: clientData.allergies,
          skinType: clientData.skinType,
          usedCreams: clientData.usedCreams,
          baseInformation: clientData.baseInformation,
          adminId,
        })
        const savedClient = await client.save();
        res.status(201).json({ message: "Client has been added" });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/* MODIFY CLIENT DATA */
export const modifyClientData = async (req, res) => {
    try {
        const newClientData = req.body.newClientData;
        const updatedClient = await Client.updateOne({ _id: newClientData._id }, {
            name: newClientData.name,
            age: newClientData.age,
            baseInformation: newClientData.baseInformation,
            skinType: newClientData.skinType,
            allergies: newClientData.allergies,
            usedCreams: newClientData.usedCreams
          });
        res.status(200).json({ message: "Client data has been modified" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* DELETE CLIENT */

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.body.clientId;
        const deletedClient = await Client.deleteOne({ _id: clientId });
        res.status(200).json({ message: "Client has been deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}