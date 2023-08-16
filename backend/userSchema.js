const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: false
    },
    subscription: {
        default: 'Trial',
        type: String,
        required: false
    },
    stripeCustomer: {
        default: 'null',
        type: String,
        required: false
    },
    calls: {
        default: 0,
        type: Number,
        required: true
    },
    Characters: [
        {   
            name: {
                type: String,
                required: true
            },
            backstory: {
                type: String,
                required: true,
            },
            traits: {
                type: String,
                required: true
            },
            voice: {
                type: String,
                required: true
            }
        }
    ]
});

// Export model
module.exports = mongoose.model("User", usersSchema);