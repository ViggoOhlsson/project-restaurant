const CustomerModel = require("./models/CustomerModel")

const utils = {
    checkIfCustomerExists: async (email) => {
        try {
            return !!await CustomerModel.findOne({email: email})
        } catch (err) {
            return err
        }
    }
}

module.exports = utils