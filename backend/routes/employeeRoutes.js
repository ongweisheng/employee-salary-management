import express from "express"
import * as employeeController from "../controller/employeeController.js"

const router = express.Router();

router.route("/upload").post(employeeController.uploadDataFile)

export default router