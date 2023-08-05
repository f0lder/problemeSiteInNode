var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

mongoose
    .connect(
        process.env.MONGODB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const probSchema = new mongoose.Schema({
    Nr: Number,
    Grup_de_criterii: String,
    Criteriu: String,
    Sumar: String,
    Descriere: String,
    Nota: Number,
    Neaplicabil: String,
    Observatii: String,
    Comentarii: String,
    Audior: String,
    Imagini: String
});

const prob = mongoose.model('list', probSchema);

async function getItems() {

    const Items = await prob.find({});
    return Items;
}



router.get('/col', function (req, res, next) {
    res.render('col', { title: 'Express', vect: docs });  
});




module.exports = router;
