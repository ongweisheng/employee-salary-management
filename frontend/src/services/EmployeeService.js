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

export default { getEmployees, deleteEmployee }