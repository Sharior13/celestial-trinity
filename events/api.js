// routes/api/posts.js
const express = require("express");
const app = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Confession = require("../models/confession.js");
const { myUsername, myPassword } = process.env;

const rateLimit = {};

function rateLimitMiddleware(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!rateLimit[ip]) {
    rateLimit[ip] = Date.now();
    return next();
  }

  const timeDifference = Date.now() - rateLimit[ip];
  if (timeDifference < 30000) {
    return res.redirect("/static/err401");
  }

  rateLimit[ip] = Date.now();
  next();
}

app.post("/submit", rateLimitMiddleware, (req, res) => {
  const { confession, nickname } = req.body;

  if (!confession) {
    return res.status(400).json({ error: "Confession text is required" });
  }

  const newConfession = new Confession({
    confession: confession,
    nickname: nickname,
  });

  newConfession
    .save()
    .then((confession) => {
      res.redirect(
        "/api/submitted?confession=" +
          encodeURIComponent(JSON.stringify(confession)),
      ); // Redirect to the /submitted route with the confession data
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while saving the confession" });
    });
});

app.get("/submitted", (req, res) => {
  // Retrieve the confession data from the query string
  const confession = JSON.parse(decodeURIComponent(req.query.confession));

  res.render("submission", { confession: confession }); // Render the submitted template with the confession data
});

app.get("/submitted", (req, res) => {
  res.render("submission", { confessions: confessions });
});

app.post("/deleteconf", (req, res) => {
  const confessionId = req.body.objectId; // Get the confession ID from the URL parameter

  // Find and delete the confession by ID
  Confession.findByIdAndDelete(confessionId)
    .then(() => {
      res.redirect("/static/deleted");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/static/err400");
    });
});
app.post("/delete/:id", async (req, res) => {
  try {
    const confessionId = req.params.id;

    // Find the confession in the Confession collection and delete it
    const confession = await Confession.findByIdAndDelete(confessionId);

    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    res.redirect("/panel/cred123456/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = app;
