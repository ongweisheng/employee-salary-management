import axios from "axios"
const baseUrl = "http://localhost:3000/users"

const getEmployees = async (minSalary, maxSalary, offset, limit, sort) => {
    const request = axios.get(`${baseUrl}?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offset}&limit=${limit}&sort=${encodeURIComponent(sort)}`)
    const response = await request
    return response.data
}

const deleteEmployee = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

const createEmployee = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
}

const getEmployee = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

const updateEmployee = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const response = await request
    return response.data
}

export default { getEmployees, deleteEmployee, createEmployee, getEmployee, updateEmployee }