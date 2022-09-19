import { useState } from "react"
import { Container, Table, Modal, Button, Form } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"
import AlertMessage from "./AlertMessage.js"

const FindEmployee = () => {
    const [employee, setEmployee] = useState([])
    const [id, setId] = useState("")
    const [alertMessage, setAlertMessage] = useState(null)

    const handleIdChange = (event) => {
        setId(event.target.value)
    }

    const handleFindEmployee = (event) => {
        event.preventDefault()
        EmployeeService.getEmployee(id)
            .then(returnedEmployee => {
                if (returnedEmployee === null) {
                    setAlertMessage("Error! Employee cannot be found. Try again with valid id!")
                    setTimeout(() => {
                        setAlertMessage(null)
                    }, 5000)
                    return
                } else {
                    setEmployee(returnedEmployee)
                    setId("")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
         <div className="d-grid gap-3">
            <AlertMessage message={alertMessage} />
            <Form onSubmit={handleFindEmployee}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>id</Form.Label>
                    <Form.Control type="text" placeholder="Enter id" value={id} onChange={handleIdChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Find</Button>
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
                    </tr>
                </tbody>
            </Table>
        </div>
        </Container>
    )
}

export default FindEmployee