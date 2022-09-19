import { useState } from "react"
import { Table, Button, Form, Row, Col } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"

const EmployeesDashboard = () => {
    const [employees, setEmployees] = useState([])
    const [minSalary, setMinSalary] = useState("")
    const [maxSalary, setMaxSalary] = useState("")
    const [sort, setSort] = useState("")
    const [offset, setOffset] = useState(0)
    const limit = 30

    const handleMinSalaryChange = (event) => {
        setMinSalary(event.target.value)
      }

    const handleMaxSalaryChange = (event) => {
        setMaxSalary(event.target.value)
    }

    const handleSortChange = (event) => {
        setSort(event.target.value)
    }

    const handleGetEmployees = (event) => {
        event.preventDefault()
        EmployeeService.getEmployees(minSalary, maxSalary, offset, limit, sort)
            .then(returnedData => {
                setEmployees(returnedData)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handlePreviousPage = () => {
        EmployeeService.getEmployees(minSalary, maxSalary, offset - 30, limit, sort)
            .then(returnedData => {
                setEmployees(returnedData)
                setOffset(offset-+ 30)
            }).catch((err) => {
                console.log(err)
            })
    }


    const handleNextPage = () => {
        EmployeeService.getEmployees(minSalary, maxSalary, offset + 30, limit, sort)
            .then(returnedData => {
                setEmployees(returnedData)
                setOffset(offset + 30)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
        <div className="d-grid gap-3">
            <h2>Employees Dashboard</h2>
            <Form onSubmit={handleGetEmployees}>
                <Row>
                    <Col>
                        <Form.Control placeholder="min salary" onChange={handleMinSalaryChange} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="max salary" onChange={handleMaxSalaryChange} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="sort method" onChange={handleSortChange} />
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Filter</Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>login</th>
                        <th>name</th>
                        <th>salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => 
                        <tr key={employee.id}>
                            <td>
                                {employee.id}
                            </td>
                            <td>
                                {employee.login}
                            </td>
                            <td>
                                {employee.name}
                            </td>
                            <td>
                                {employee.salary}
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
            <Button variant="primary" onClick={handlePreviousPage}>Previous page</Button>{" "}
            <Button variant="primary" onClick={handleNextPage}>Next page</Button>
        </>
        
    )
}

export default EmployeesDashboard