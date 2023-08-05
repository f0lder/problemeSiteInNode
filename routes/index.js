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

    const Items = await prob.find();
    return Items;
}

async function countByCriteria(c){
    const Items = await prob.countDocuments({Grup_de_criterii:c});
    return Items;
}

async function getDistinctCrit(){
    const Items = await prob.distinct("Grup_de_criterii");
    return Items;
}

async function getItemsBy(c){
    const Items = await prob.find({"Grup_de_criterii":c});
    return Items;
}
router.get('/', function (req, res, next) {

    getItems().then(function (docs) {
        res.render('index', { title: 'Express', vect: docs });

        docs.forEach(e =>{
            router.get("/id=" + e._id, function(req,res,next){
                res.render("prob",{"v": e});
            })
        })
    });
});

router.get('/col', function (req, res, next) {
    let newList = [];
    
        getDistinctCrit().then(function(list){
            list.forEach(e =>{
                e = e.replace(/ /g, "");
                e = e.replace(/[^a-zA-Z0-9 ]/g, '');
                newList.push(e);
            });

            console.log(newList);

            res.render('col',{list:newList});
            
            list.forEach(e =>{
                
                getItemsBy(e).then(function(docs){
                    e = e.replace(/ /g, "");
                    e = e.replace(/[^a-zA-Z0-9 ]/g, '');
                    router.get("/cat=" + e, function(req,res,next){
                        res.render("cat",{"vect": docs,"cat":e});
                    })
                });
            })
        });
});


module.exports = router;
