import { useState } from "react"
import { Container, Table, Button, Form, Row, Col, Modal } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"
import AlertMessage from "./AlertMessage.js"

const EmployeesDashboard = () => {
    const [employees, setEmployees] = useState([])
    const [minSalary, setMinSalary] = useState("")
    const [maxSalary, setMaxSalary] = useState("")
    const [sort, setSort] = useState("")
    const [offset, setOffset] = useState(0)
    const limit = 30
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
    const [login, setLogin] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [alertMessage, setAlertMessage] = useState(null)
    const [updateAlertMessage, setUpdateAlertMessage] = useState(null)

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
                setAlertMessage(err.response.data.message)
                setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
                console.log(err)
            })
    }

    const handleCloseDelete = () => setShowDelete(false)
    const handleShowDelete = (event) => {
        setSelectedEmployeeId(event.target.id)
        setShowDelete(true)
    }
    const handleDeleteEmployee = (event) => {
        const employeeToBeDeleted = event.target.id
        EmployeeService.deleteEmployee(employeeToBeDeleted)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== employeeToBeDeleted))
                setShowDelete(false)
                setSelectedEmployeeId("")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleLoginChange = (event) => {
        setLogin(event.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSalaryChange = (event) => {
        setSalary(event.target.value)
    }


    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = (event) => {
        setSelectedEmployeeId(event.target.id)
        setShowUpdate(true)
    }
    const handleUpdateEmployee = (event) => {
        const employeeToBeUpdated = event.target.id
        if (isNaN(parseFloat(salary)) || isNaN(parseFloat(salary)) < 0) {
            setUpdateAlertMessage("Error! Invalid salary")
            setTimeout(() => {
                setUpdateAlertMessage(null)
            }, 3000)
            setLogin("")
            setName("")
            setSalary("")
            return
        }
        const employeeObject = {
            login: login,
            name: name,
            salary: salary
        }
        EmployeeService.updateEmployee(employeeToBeUpdated, employeeObject)
            .then((returnedEmployee) => {
                setEmployees(employees.map(employee => employee.id === employeeToBeUpdated ? returnedEmployee : employee))
                setShowUpdate(false)
                setSelectedEmployeeId("")
                setLogin("")
                setName("")
                setSalary("")
            })
            .catch((err) => {
                setUpdateAlertMessage("Error while updating. Login has to be unique! Check your input fields again!")
                setTimeout(() => {
                    setUpdateAlertMessage(null)
                }, 3000)
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
        <AlertMessage message={alertMessage} />
        <div className="d-grid gap-3">
            <h2>Employees Dashboard</h2>
            <Form onSubmit={handleGetEmployees}>
                <Row>
                    <Col>
                        <Form.Label>Min Salary</Form.Label>
                        <Form.Control placeholder="min salary" onChange={handleMinSalaryChange} />
                    </Col>
                    <Col>
                        <Form.Label>Max Salary</Form.Label>
                        <Form.Control placeholder="max salary" onChange={handleMaxSalaryChange} />
                    </Col>
                    <Col>
                        <Form.Label>Sort Method (Example: +id, -salary)</Form.Label>
                        <Form.Control placeholder="+/- for sort order" onChange={handleSortChange} />
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
                            <td className="buttons">
                                <Button class="mx-auto" variant="danger" id={employee.id} onClick={handleShowDelete}>delete</Button>{" "}
                                <Button variant="primary" id={employee.id} onClick={handleShowUpdate}>update</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
            <Button variant="primary" onClick={handlePreviousPage}>Previous page</Button>{" "}
            <Button variant="primary" onClick={handleNextPage}>Next page</Button>
            <Modal className="deleteModal" show={showDelete} onHide={handleCloseDelete} keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {selectedEmployeeId}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>Close</Button>
                     <Button variant="danger" id={selectedEmployeeId} onClick={handleDeleteEmployee}>Delete</Button>
                </Modal.Footer>
            </Modal>
            <Modal className="updateModal" show={showUpdate} onHide={handleCloseUpdate} keyboard={false} animation={false}>
                <AlertMessage message={updateAlertMessage} />
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Updated login</Form.Label>
                            <Form.Control type="text" placeholder="Enter updated login" value={login} onChange={handleLoginChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Updated name</Form.Label>
                            <Form.Control type="text" placeholder="Enter updated name" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Updated salary</Form.Label>
                            <Form.Control type="text" placeholder="Enter updated salary" value={salary} onChange={handleSalaryChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                     <Button variant="primary" id={selectedEmployeeId} onClick={handleUpdateEmployee}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Container>
        
    )
}

export default EmployeesDashboard