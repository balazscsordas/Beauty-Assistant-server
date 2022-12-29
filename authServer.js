const PORT = 8001
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

require('dotenv').config()

const saltRounds = 10;

const app = express()

app.use(express.json())

app.use(cors({
  origin: process.env.CLIENT_URL,
	credentials: true
}))

//middleware for cookies
app.use(cookieParser());

app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running on port " +PORT)
})

// Database connection

main().catch(err => console.log(err));

async function main() {
    mongoose.set("strictQuery", false);
    const dbURL = "mongodb+srv://" + process.env.DBID + ":" + process.env.DBPW + "@beautyassistantdatabase.2na2ufm.mongodb.net/BeautyAssistantDatabase";
    await mongoose.connect(dbURL);
}

// USERS definition

const usersSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    refreshToken: String
});

const User = mongoose.model('User', usersSchema);

// CLIENTS definition

const clientsSchema = new mongoose.Schema({
  name: String,
  age: String,
  mobileNumber: String,
  allergies: String,
  skinType: String,
  usedCreams: String,
  baseInformation: String,
  adminEmail: String
})

const Client = mongoose.model('Client', clientsSchema);

// Routes 

app.post("/registration", async (req, res) => {
    try {
      const { firstName, email, password } = req.body.registrationData
      const foundUser = await User.findOne({ email: email })
      if(foundUser) {
        res.status(409)
        res.json({ message: "An account is already registered with your email, please log in." })
      } else {
            const hash = await bcrypt.hash(password, saltRounds)
            if(hash) {
              const user = new User({
                firstName: firstName,
                email: email,
                password: hash,
                refreshToken: "token"
              });
              user.save(err => {
                if(err) {
                  console.log(err);
                } else {
                  res.status(200);
                  res.json({ message: "Registration was successful" });
                }
              })
            }
        }
    }
    catch(err) {
      console.log(err);
    }
  })

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email: email })
        if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
            const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
            const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET)
            await User.updateOne({ email: email }, { refreshToken: refreshToken });
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            console.log(res.cookie.jwt);
            res.json({ message: "Success", accessToken });
        }
        else {
            res.sendStatus(401)
        }
    } catch(e) {
        console.log(e)
    }
})

app.get("/refresh", (req, res) => {
    const refreshToken = req.cookies.jwt
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if(err) {
        return res.sendStatus(403)
      }
      else {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
        res.json({ accessToken: accessToken })
      }
    })
})

app.delete("/logout", async (req, res) => {
  try {
      const refreshToken = req.cookies.jwt;
      await User.updateOne({ refreshToken: refreshToken }, {refreshToken: "token" });
      res.status(200);
      res.setHeader('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
      res.json({ message: "token updated" });
  }
  catch(e) {
      console.log(e)
  }
})


// CLIENT SERVER

app.post("/api/add-new-client", verifyJWT, async (req, res) => {
  try {
    const clientData = req.body.clientData;
    const adminEmail = req.email;
    const client = new Client({
      name: clientData.name,
      age: clientData.age,
      mobileNumber: clientData.mobileNumber,
      allergies: clientData.allergies,
      skinType: clientData.skinType,
      usedCreams: clientData.usedCreams,
      baseInformation: clientData.baseInformation,
      adminEmail: adminEmail
    })
    client.save(err => {
      if(err) {
        console.log(err);
      } 
      else {
        res.status(200);
        res.json({ message: "Client has been added" });
      }
    })
  }
  catch (err) {
    console.log(err);
  }
})

app.get("/api/get-client-list", async (req, res) => {
  try {
    const adminEmail = "lacika";
    const foundClients = await Client.find({ adminEmail: adminEmail }, 'name age');
    res.status(200);
    res.json({ foundClients: foundClients });
  }
  catch (err) {
    console.log(err);
  }
})

app.get("/api/get-client-data", async (req, res) => {
  try {
    const adminEmail = "lacika";
    const foundClients = await Client.find({ adminEmail: adminEmail }, 'name age');
    res.status(200);
    res.json({ foundClients: foundClients });
  }
  catch (err) {
    console.log(err);
  }
})

app.get("/api/get-client-details/:id", async (req, res) => {
  try {
    const adminEmail = "lacika";
    const clientId = (req.params.id);
    const foundClient = await Client.findOne({ _id: clientId });
    if (foundClient) {
      res.status(200);
      res.json({ foundClient });
    }
    else {
      res.sendStatus(404);
    }
  }
  catch (err) {
    console.log(err);
  }
})

// Modify client data

app.put("/api/save-modified-client-data", verifyJWT, (req, res) => {
  const newClientData = req.body.newClientData;
  Client.updateOne({ _id: newClientData._id }, {
    name: newClientData.name,
    age: newClientData.age,
    baseInformation: newClientData.baseInformation,
    skinType: newClientData.skinType,
    allergies: newClientData.allergies,
    usedCreams: newClientData.usedCreams
  }, (err, result) => {
    if(err) {
      res.sendStatus(501)
    }
    console.log(result)
    res.sendStatus(204);
  });
})

// Delete client

app.delete("/api/delete-client", verifyJWT, (req, res) => {
    const clientId = req.body.clientId;
    Client.deleteOne({ _id: clientId }, (err, result) => {
      if (err) {
        res.sendStatus(501);
      } 
      res.sendStatus(204)
    });
})
