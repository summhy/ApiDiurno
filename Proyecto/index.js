const express = require('express')
const hbs = require('hbs')
//const pg = require('pg')
var methodOverride = require('method-override')
const app = express()
//const {Pool} = pg;
app.set('view engine', 'hbs')

app.use(methodOverride("_method", { methods: ["GET"] }))

/* 
const pool = new Pool({
    host: "localhost",
    user: "susanamunoz",
    database: "diurno",
    password:"",
    port:5432
}) */

app.get("/",async(req,res)=>{
    //const resultado = await pool.query("select  * from personas");
    //console.log(resultado.rows);
    const resultado = await fetch("https://localhost:4000/api/v1/personas");
    const data = await resultado.json();
    res.render("index", {"personas":data});
});


app.get("/mantenedor",async(req,res)=>{
    //const resultado = await pool.query("select  * from personas");
    //console.log(resultado.rows);
    const resultado = await fetch("http://localhost:4000/api/v1/personas");
    const data = await resultado.json();
    res.render("mantenedor", {"personas":data});
});


app.delete("/mantenedor/:id",async(req,res)=>{
    console.log("método eliminar")
    const {id} = req.params
    const resultado = await fetch("http://localhost:4000/api/v1/personas/"+id,
    {method: 'DELETE'});
    const data = await resultado.json();
    res.render("mantenedor", {"personas":data});
});


app.listen(3000);