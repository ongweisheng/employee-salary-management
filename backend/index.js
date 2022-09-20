import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import "dotenv/config"
import employeeRoutes from "./routes/employeeRoutes.js"

const uri = process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URL
    : process.env.DB_URL

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
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        descript: "this is just health check"
    })
})

app.use("/users", employeeRoutes)

app.listen(port, () => {
    console.log("Server started on port: ", port)
})

export default app