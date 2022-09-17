import Employee from "../models/employee.js"
import csvtojson from "csvtojson"

export async function uploadDataFile(req, res) {
    try {
        await csvtojson().fromFile(req.file.path)
                        .then((csvData) => {
                            Employee.insertMany(csvData)
                                .then(() => {
                                    res.status(201).json({ success: "success" })
                                })
                                .catch((err) => {
                                    console.log(err)
                                    res.status(404).json(err)
                                })
                        })
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getEmployeesData(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function clearEmployeesData(req, res) {
    try {
        const clearEmployees = await Employee.remove();
        res.status(200).json(clearEmployees)
    } catch (err) {
        res.status(500).json(err)
    }
}