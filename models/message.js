const mongoose = require("mongoose");
    
    const messageSchema = new mongoose.Schema({
        userId: String,
        messages: Number
    })
    
    module.exports = mongoose.model("messages", messageSchema);