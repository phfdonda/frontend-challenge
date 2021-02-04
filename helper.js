const fs = require("fs")
const jsonPath = __dirname + "/public/data/fields.json"
const jsonText = fs.readFileSync(jsonPath)
const defaultText = JSON.parse(jsonText)
const request_fields = defaultText._embedded.request_fields
const user_fields = defaultText._embedded.user_fields

function buildForm(){
  const options = []
  const container = document.querySelector('#container')
  // h3#title
  //ul#form
  //li#form-item

}

module.exports = buildForm