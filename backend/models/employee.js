import mongoose from "mongoose"

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    salary: {
        type: Float64Array,
        required: true
    },
})

export default mongoose.model("Employee", employeeSchema)