var express = require("express");

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/persona', {useNewUrlParser: true});
const esquema = new mongoose.Schema({
        nombre: {type:String, required:[true,'campo requerido'],maxlength:20,unique:true}
    },{timestamps:true})
const PER = mongoose.model('per', esquema);

var app = express();

app.get('/', function(req, res) {
    PER.find()
        .then(datos =>{
            if (datos.length===0){
                res.json({mensaje:"No Existen Datos"})
            } else {
                res.json({datos})
            }
        })
        .catch(err => res.json({error:err}))
})

app.get('/nuevo/:nombre', function(req, res) {
    const per = new PER
    per.nombre = req.params.nombre;
    per.save()
        .then(newper => {res.json(newper)})
        .catch(err => res.json({error:err}))
})
app.get('/remove/:nombre', function(req, res) {
    PER.deleteOne({nombre:req.params.nombre})
        .then(res.json({mensaje:"Dato Eliminado"}))
        .catch(err => res.json({error:err}))
})
app.get('/:nombre', function(req, res) {
    PER.findOne({nombre:req.params.nombre})
    .then(datos =>{(
        console.log(datos))
        if (datos === null){
            res.json({mensaje:"No Existe Dato"})
        } else {
            res.json({datos})
        }
    })
    .catch(err => res.json({error:err}))
})

app.listen(8000, function() {
    console.log("listening on port 8000");
}) 