const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const connect = require("./configs/db")

var albumController = require("./controllers/album.controller")
var allcontroller = require("./controllers/alldata.controller")

app.use(express.json())
app.use("/all",allcontroller)
app.use("/album", albumController)


const port = 2345

app.listen(port, async function() {
    await connect()
    console.log(`Server running on ${port}`);
})