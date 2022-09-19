import { useState } from "react"
import { Container, Table, Button, Form, Row, Col, Modal } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"

const EmployeesDashboard = () => {
    const [employees, setEmployees] = useState([])
    const [minSalary, setMinSalary] = useState("")
    const [maxSalary, setMaxSalary] = useState("")
    const [sort, setSort] = useState("")
    const [offset, setOffset] = useState(0)
    const limit = 30
    const [show, setShow] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("")

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

    const handleClose = () => setShow(false)
    const handleShow = (event) => {
        setSelectedEmployeeId(event.target.id)
        setShow(true)
    }
    const handleDeleteEmployee = (event) => {
        const employeeToBeDeleted = event.target.id
        EmployeeService.deleteEmployee(employeeToBeDeleted)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== employeeToBeDeleted))
                setShow(false)
                setSelectedEmployeeId("")
            })
            .catch((err) => {
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
        <Container>
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
                            <td className="deleteButton">
                                <Button variant="danger" id={employee.id} onClick={handleShow}>delete</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
            <Button variant="primary" onClick={handlePreviousPage}>Previous page</Button>{" "}
            <Button variant="primary" onClick={handleNextPage}>Next page</Button>
            <Modal className="deleteModal" show={show} onHide={handleClose} keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedEmployeeId}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                     <Button variant="danger" id={selectedEmployeeId} onClick={handleDeleteEmployee}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
        
    )
}

export default EmployeesDashboard