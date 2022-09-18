import express from "express"
import * as employeeController from "../controller/employeeController.js"
import multer from "multer"

const router = express.Router();

let upload = multer({ dest: "uploads/" })

router.route("/upload").post(upload.single("file"), employeeController.uploadDataFile)
router.route("/all").get(employeeController.getAllEmployeeData)
router.route("/clear").delete(employeeController.clearEmployeesData)
router.route("/").get(employeeController.getEmployeesData)

export default router