import Employee from "../models/employee.js"
import csvtojson from "csvtojson"

export async function uploadDataFile(req, res) {
    try {
        await csvtojson()
            .fromFile(req.file.path)
            .then((csvData) => {
                let idMap = new Map()
                let loginMap = new Map()
                for (let row of csvData) {
                    if (row.id.startsWith("#")) {
                        continue
                    }
                    if (row.id === undefined || row.login === undefined || row.name === undefined
                        || row.salary === undefined) {
                        return res.status(404).send({ message: "Incomplete fields in csv file" })        
                    }
                    if (idMap.has(row.id)) {
                        return res.status(404).send({ message: "Unsuccessful upload due to duplicate id" })
                    } else {
                        idMap.set(row.id, 0)
                    }
                    if (loginMap.has(row.login)) {
                        return res.status(404).send({ message: "Unsuccessful upload due to duplicate login" })
                    } else {
                        loginMap.set(row.login, 0)
                    }
                }
                for (let row of csvData) {
                    if (row.id.startsWith("#")) {
                        continue
                    } else {
                        Employee.updateOne({ id: row.id }, row, { upsert: true })
                            .catch((err) => {
                                console.log(err)
                                return res.status(404).json(err)
                            })
                    }
                }
                return res.status(201).json({ message: "successful upload" })
            })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function getEmployeesData(req, res) {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function clearEmployeesData(req, res) {
    try {
        const clearEmployees = await Employee.remove();
        return res.status(200).json(clearEmployees)
    } catch (err) {
        return res.status(500).json(err)
    }
}