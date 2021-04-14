const express = require('express');
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_UR || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function (e) { console.error(e); });


var schema = mongoose.Schema({
    date: Date,
    name: { type: String, default: "Anonimo" }
});

var Visitor = mongoose.model("Visitor", schema);


app.get('/', (req, res) => {
    Visitor.create({ date: new Date(), name: req.query.name }, function (err) {
        if (err) return console.error(err);
    });
    res.send("<h1>El visitante fue almacenado con éxito</h1>");
});

app.listen(3000, () => console.log('Listen on port 3000!')); 