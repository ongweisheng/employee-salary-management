import axios from "axios"
const baseUrl = "http://localhost:3000/users"

const getEmployees = (minSalary, maxSalary, offset, limit, sort) => {
    const request = axios.get(`${baseUrl}?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offset}&limit=${limit}&sort=${encodeURIComponent(sort)}`)
    return request.then(response => response.data)
}

export default { getEmployees }