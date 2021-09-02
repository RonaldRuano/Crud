const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bdConfig = require('./configurations/bd');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: bdConfig.host,
    user: bdConfig.user,
    password: bdConfig.password,
    database: bdConfig.database
});

//Leer todos los estudiantes
app.get("/Leerestudiantes", (req, res) => {
    console.log("get lista estudiantes");
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Buscar un estudiante
app.get("/Leerestudiantes/:id", (req, res) => {
    console.log("get estudiante");
    mysqlConnection.query('Select * from estudiante where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear estudiante
app.post("/Crearestudiantes", (req, res) => {
    console.log("crear estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (nombre, apellido, edad, grado) values (?,?,?,?)',
        [est.Nombre, est.Apellido, est.Edad, est.Grado], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Actualizar estudiante
app.put("/Actualizarestudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set nombre = ?, apellido = ?, edad = ?, grado=? where id = ?',
        [est.Nombre, est.Apellido, est.Edad, est.Grado, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar estudinate
app.delete("/Eliminarestudiantes/:id", (req, res) => {
    console.log("update estudiante ");
    mysqlConnection.query('delete from estudiante where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

app.listen(process.env.PORT ||3000);