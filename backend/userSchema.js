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
            }
        }
    ]
});

// Export model
module.exports = mongoose.model("User", usersSchema);