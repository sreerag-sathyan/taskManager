const mongoose = require('mongoose')

const Schema = mongoose.Schema


const taskSchema = new Schema({
    name: {
        type: "String",
        required: ["true",'Task should have a name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const taskModel =  mongoose.model('Task', taskSchema)

module.exports = taskModel