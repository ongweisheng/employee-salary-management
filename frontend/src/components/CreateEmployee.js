import { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"
import AlertMessage from "./AlertMessage.js"

const CreateEmployee = () => {
    const [id, setId] = useState("")
    const [login, setLogin] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")
    const [alertMessage, setAlertMessage] = useState(null)

    const handleIdChange = (event) => {
        setId(event.target.value)
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

    const handleCreateEmployee = (event) => {
        event.preventDefault()
        const employeeObject = {
            id: id,
            login: login,
            name: name,
            salary: salary,
        }
        EmployeeService.createEmployee(employeeObject)
            .then(returnedEmployee => {
                setId("")
                setLogin("")
                setName("")
                setSalary("")
                setAlertMessage("Employee has been created!")
                setTimeout(() => {
                    setAlertMessage(null)
                }, 5000)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
            <h2>Create employee</h2>
            <AlertMessage message={alertMessage} />
            <Form onSubmit={handleCreateEmployee}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>id</Form.Label>
                    <Form.Control type="text" placeholder="Enter id" value={id} onChange={handleIdChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login" value={login} onChange={handleLoginChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>salary</Form.Label>
                    <Form.Control type="text" placeholder="Enter salary" value={salary} onChange={handleSalaryChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </Container>
    )
}

export default CreateEmployee