const {Types, model, Schema} = require("mongoose")

const CustomerSchema = Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    phone: {type:Number, required: true}
})

const CustomerModel = model("customers", CustomerSchema)
module.exports = CustomerModel