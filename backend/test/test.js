import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"

chai.use(chaiHttp)
chai.should()

let testEmployeeId;

describe("Employees", () => {
    describe("POST/", () => {
        it("Create employee successful", (done) => {
            const employee = {
                id: "e0001",
                login: "test",
                name: "test",
                salary: "0"
            }
            chai.request(app)
                .post("/users")
                .send(employee)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("id")
                    assert.equal(res.body.id, "e0001")
                    testEmployeeId = res.body.id
                    res.body.should.have.property("login")
                    assert.equal(res.body.login, "test")
                    res.body.should.have.property("name")
                    assert.equal(res.body.name, "test")
                    res.body.should.have.property("salary")
                    assert.equal(res.body.salary, "0")
                    done()
                })
        })
    })

    describe("PUT/:id", () => {
        it("Update employee successful", (done) => {
            const updateEmployee = {
                login: "test2",
                name: "test2",
                salary: "10"
            }
            chai.request(app)
                .put(`/users/${testEmployeeId}`)
                .send(updateEmployee)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("id")
                    assert.equal(res.body.id, "e0001")
                    res.body.should.have.property("login")
                    assert.equal(res.body.login, "test2")
                    res.body.should.have.property("name")
                    assert.equal(res.body.name, "test2")
                    res.body.should.have.property("salary")
                    assert.equal(res.body.salary, "10")
                    done()
                })
        })
    })

    describe("GET/:id", () => {
        it("Get employee successful", (done) => {
            chai.request(app)
                .get(`/users/${testEmployeeId}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("id")
                    assert.equal(res.body.id, "e0001")
                    res.body.should.have.property("login")
                    assert.equal(res.body.login, "test2")
                    res.body.should.have.property("name")
                    assert.equal(res.body.name, "test2")
                    res.body.should.have.property("salary")
                    assert.equal(res.body.salary, "10")
                    done()
                })
        })
    })

    describe("DELETE/:id", () => {
        it("Delete employee successful", (done) => {
            chai.request(app)
                .delete(`/users/${testEmployeeId}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    assert.equal(res.body.acknowledged, true)
                    assert.equal(res.body.deletedCount, 1)
                    done()
                })
        })
    })
})