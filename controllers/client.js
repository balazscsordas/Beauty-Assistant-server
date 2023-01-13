import Client from "../models/Client.js";
import User from "../models/User.js";

/* GET CLIENT LIST */
export const getClientList = async (req, res) => {
    try {
        const adminId = req._id;
        const foundClients = await Client.find({ adminId: adminId }, 'name age');
        const clientOptionNames = await User.findOne({ _id: adminId }, 'clientOptionNames');
        const clientOptionNamesWithoutId = clientOptionNames.clientOptionNames;
        res.status(200).json({ foundClients, clientOptionNamesWithoutId });
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

/* ADD OPTION NAMES */
export const addOptionNames = async (req, res) => {
  try {
      const newClientOptionNames = req.body.newClientOptionNames;
      const adminId = req._id;
      const updatedUser = await User.updateOne({ _id: adminId }, {
        clientOptionNames: newClientOptionNames
      });
      res.status(201).json({ newClientOptionNames, message: "Option names have been changed" });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
}

/* ADD NEW CLIENT */
export const addNewClient = async (req, res) => {
    try {
        const clientData = req.body.clientData;
        const capitalizedClientName = clientData.name.charAt(0).toUpperCase() + string.slice(1);
        const adminId = req._id;
        const client = new Client({
          name: capitalizedClientName,
          age: clientData.age,
          email: clientData.email,
          mobileNumber: clientData.mobileNumber,
          option1Content: clientData.option1Content,
          option2Content: clientData.option2Content,
          option3Content: clientData.option3Content,
          option4Content: clientData.option4Content,
          option5Content: clientData.option5Content,
          adminId,
        })
        const savedClient = await client.save();
        res.status(201).json({ message: "Client has been added" });
      }
      catch (err) {
        console.log(err.message);
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