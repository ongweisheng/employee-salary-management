import { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import EmployeeService from "../services/EmployeeService.js"

const CreateEmployee = () => {
    const [id, setId] = useState("")
    const [login, setLogin] = useState("")
    const [name, setName] = useState("")
    const [salary, setSalary] = useState("")

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

    return (
        <Container>
            <Form>
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
            </Form>
        </Container>
    )
}

export default CreateEmployee