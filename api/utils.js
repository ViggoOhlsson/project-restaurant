const CustomerModel = require("./models/CustomerModel")

const utils = {
    customerExists: async (email) => {
        try {
            let customer = await CustomerModel.findOne({email: email})
            if (customer) {
                return customer
            } else {
                return false
            }
        } catch (err) {
            return err
        }
    }
}

module.exports = utils