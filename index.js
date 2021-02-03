const app = require("./server.js")


app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port 3000")
})
