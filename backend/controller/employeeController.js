import Employee from "../models/employee.js"
import csvtojson from "csvtojson"

export async function uploadDataFile(req, res) {
    try {
        await csvtojson()
            .fromFile(req.file.path)
            .then(async (csvData) => {
                if (csvData.length === 0) {
                    return res.status(404).send({ message: "Empty file was uploaded" })
                }
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
                    if (parseFloat(row.salary) < 0 || isNaN(parseFloat(row.salary))) {
                        return res.status(404).send({ message: "Invalid salary in the csv file "})
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
                    let isExistingLogin = await Employee.findOne({ login: row.login })
                        .then((response) => {
                            if (response === null) {
                                return false
                            } else if (response.login === row.login && response.id !== row.id) {
                                return true
                            } else {
                                return false
                            }
                        }).catch((err) => {
                            console.log(err)
                            return res.status(404).json(err)
                        })
                    if (isExistingLogin) {
                        return res.status(404).send({ message: "Tried to overwrite existing login"})
                    }
                }
                for (let row of csvData) {
                    if (row.id.startsWith("#")) {
                        continue
                    } else {
                        await Employee.updateOne({ id: row.id }, row, { upsert: true })
                    }
                }
                return res.status(200).json({ message: "Successful upload" })
            })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export async function getAllEmployeeData(req, res) {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export async function clearEmployeesData(req, res) {
    try {
        const clearEmployees = await Employee.remove();
        return res.status(200).json(clearEmployees)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export async function getEmployeesData(req, res) {
    try {
        if (req.query.minSalary === undefined || req.query.maxSalary === undefined || req.query.offset === undefined
            || req.query.limit === undefined || req.query.sort === undefined) {
            return res.status(400).send({ message: "Missing request params" })        
        }
        const employees = await Employee.find();
        const numberOfEmployees = employees.length
        const minSalary = parseFloat(req.query.minSalary)
        if (minSalary < 0 || isNaN(minSalary)) {
            return res.status(404).send({ message: "Invalid minSalary value "})
        }
        const maxSalary = parseFloat(req.query.maxSalary)
        if (maxSalary < 0 || isNaN(maxSalary)) {
            return res.status(404).send({ message: "Invalid maxSalary value"})
        }
        const offset = parseInt(req.query.offset)
        if (isNaN(offset)) {
            return res.status(404).send({ message: "Invalid offset value"})
        }
        const limit = parseInt(req.query.limit)
        if (isNaN(limit)) {
            return res.status(404).send({ message: "Invalid offset value"})
        }
        const sortOrder = req.query.sort.charAt(0)
        const sortAttribute = req.query.sort.slice(1)
        if (sortAttribute !== "id" && sortAttribute !== "login" && sortAttribute !== "name" && sortAttribute !== "salary") {
            return res.status(400).send({ message: "Invalid sort attribute" })
        }
        const salaryFilteredEmployees = employees.filter(employee => parseFloat(employee.salary) >= minSalary 
                                                    && parseFloat(employee.salary) <= maxSalary)
        if (sortOrder === "+") {
            salaryFilteredEmployees.sort(ascendingSortByProperty(sortAttribute))
        } else if (sortOrder === "-") {
            salaryFilteredEmployees.sort(descendingSortByProperty(sortAttribute))
        } else {
            return res.status(400).send({ message: "Invalid sort order" }) 
        }
        const employeesToDisplay = (numberOfEmployees - offset) > limit ? limit : numberOfEmployees - offset
        const response = salaryFilteredEmployees.slice(offset, offset + employeesToDisplay)
        return res.status(200).json(response)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

function ascendingSortByProperty(property) {  
    return function(a,b) {  
        if (property === "salary") {
            if (parseFloat(a[property]) > parseFloat(b[property])) {
                return 1
            } else if (parseFloat(a[property]) < parseFloat(b[property])) {
                return -1
            }
            return 0
        } else {
            if (a[property] > b[property]) {
                return 1
            } else if (a[property] < b[property]) {
                return -1
            }
            return 0
        }
    }  
 }

function descendingSortByProperty(property) {  
    return function(a,b) {  
        if (property === "salary") {
            if (parseFloat(a[property]) > parseFloat(b[property])) {
                return -1
            } else if (parseFloat(a[property]) < parseFloat(b[property])) {
                return 1
            }
            return 0
        } else {
            if (a[property] > b[property]) {
                return -1
            } else if (a[property] < b[property]) {
                return 1
            }
            return 0
        }
    }  
}

export async function createEmployee(req, res) {
    try {
        const employee = await Employee.create(req.body)
        return res.status(201).json(employee)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function updateEmployee(req, res) {
    try {
        const employee = await Employee.findOneAndUpdate({ id: `${req.params.id}` }, req.body, { new: true })
        return res.status(200).json(employee)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function getEmployee(req, res) {
    try {
        const employee = await Employee.findOne({ id: `${req.params.id}` })
        return res.status(200).json(employee)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function deleteEmployee(req, res) {
    try {
        const response = await Employee.deleteOne({ id: `${req.params.id}` })
        return res.status(200).json(response)
    } catch (err) {
        return res.status(500).json(err)
    }
}