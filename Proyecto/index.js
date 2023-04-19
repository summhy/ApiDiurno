const express = require('express')
const hbs = require('hbs')
//const pg = require('pg')
var methodOverride = require('method-override')
const app = express()
//const {Pool} = pg;
app.set('view engine', 'hbs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));

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
    const resultado = await fetch("http://localhost:4000/api/v1/personas");
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
    if(resultado.status==200){
        const datos = await fetch("http://localhost:4000/api/v1/personas");
        const data = await datos.json();
        res.render("mantenedor", {"personas":data});
    }else{
        res.render("error", {"error":"Problemas al Eliminar registro"});
    }

});

app.post("/mantenedor", async(req,res)=>{
    try{
        const {nombre,apellido}=req.body;
    const resultado = await fetch("http://localhost:4000/api/v1/personas",{
        method:"POST",
        body:JSON.stringify({nombre, apellido}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const datos = await fetch("http://localhost:4000/api/v1/personas");
    const data = await datos.json();
    res.render("mantenedor", {"personas":data}); 
    }catch(e){
        res.render("error", {"error":"Problemas al Insertar registro"});
    }
   

});

app.put("/mantenedor/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {nombre,apellido}=req.body;
    const resultado = await fetch(`http://localhost:4000/api/v1/personas/${id}`,{
        method:"PUT",
        body:JSON.stringify({id, nombre, apellido}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const datos = await fetch(`http://localhost:4000/api/v1/personas/`);
    const data = await datos.json();
    res.render("mantenedor", {"personas":data}); 
    }catch(e){
        res.render("error", {"error":"Problemas al Modificar registro"});
    }
   

});


app.listen(3000);