// CONFIG  =====================================================================

const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
app.set("view engine", "pug")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
const jsonPath = __dirname + "/public/data/fields.json"
const jsonText = fs.readFileSync(jsonPath)
const defaultText = JSON.parse(jsonText)
const request_fields = defaultText._embedded.request_fields
const user_fields = defaultText._embedded.user_fields
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
