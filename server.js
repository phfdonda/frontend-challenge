// CONFIG  =====================================================================

const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
app.set("view engine", "pug")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

// =============================================================================

// APP GET HOME <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.get("/", (req, res) => {
  res.render("index")
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

module.exports = app
