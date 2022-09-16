import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"

const uri = process.env.DB_URL

mongoose.connect(uri)
    .then((connections) => {
        console.log(`Database connection succeeded! Database name: ${connections.connections[0].name}`)
    }).catch((err) => {
        console.log(err)
        throw new Error("Database connection failed")
    })

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        descript: "this is just health check"
    })
})

app.listen(port, () => {
    console.log("Server started on port: ", port)
})

export default app