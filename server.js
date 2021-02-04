// CONFIG  =====================================================================

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.set("view engine", "pug")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
const {buildForm} = require("./helper")

// =============================================================================

// APP GET HOME <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.get("/", (req, res) => {
  res.render("index",{
    locals:{
      buildForm
    }
  })
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

module.exports = app
