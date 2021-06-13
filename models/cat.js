const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    user: String,
    url: String
});

const CatModel = module.exports = mongoose.model('cats', CatSchema);