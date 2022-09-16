import express from "express"
import * as employeeController from "../controller/employeeController.js"

const router = express.Router();

router.route("/upload").post(employeeController.uploadDataFile)
router.route("/").get(employeeController.getEmployeesData)

export default router