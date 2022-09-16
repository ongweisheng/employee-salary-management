import Employee from "../models/employee.js"
import csvtojson from "csvtojson"

export async function uploadDataFile(req, res) {
    console.log(req.file.path)
    csvtojson()
        .fromFile(req.file.path)
        .then((csvData) => {
            console.log(csvData);
            Employee.insertMany(csvData).then(() => {
                console.log("Data inserted")
                res.json({ success: "success" })
            }).catch((err) => {
                console.log(err)
            })
        })
}

export async function getEmployeesData(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    } catch (err) {
        res.status(500).json(err)
    }
}