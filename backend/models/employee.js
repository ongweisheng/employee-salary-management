import mongoose from "mongoose"

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    salary: {
        type: Schema.Types.Decimal128,
        required: true
    },
})

export default mongoose.model("Employee", employeeSchema)