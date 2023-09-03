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

app.get("/bird/:id", async (request, response) => {
  const snapshot = await firebase.firestore().collection("birds").doc(request.params.id).get();
  response.send(snapshot.data());
});

app.get("/and-more", async (request, response) => {
  const snapshot = await firebase.firestore().collection("andmore").get();
  const andmore = snapshot.docs.map(document => document.data());
  response.send(andmore);
});

app.get("/and-more/:id", async (request, response) => {
  const snapshot = await firebase.firestore().collection("andmore").doc(request.params.id).get();
  response.send(snapshot.data());
});

exports.api = onRequest(app);
