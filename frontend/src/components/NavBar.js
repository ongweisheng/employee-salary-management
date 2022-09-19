import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
    return (
        <>
            <Navbar collapseOnSelect expands="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="./"><h1>Employee Salary Management</h1></Navbar.Brand>
                    <Navbar.Toggle arioa-controls="responseive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="./">Dashboard</Nav.Link>
                            <Nav.Link href="./">Create</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar