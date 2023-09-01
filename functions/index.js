const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const firebase = admin.initializeApp();

const app = express();
app.use(cors());

app.get("/bird", async (request, response) => {
  const snapshot = await firebase.firestore().collection("birds").get();
  const birds = snapshot.docs.map(document => document.data());
  response.send(birds);
});

exports.api = onRequest(app);
