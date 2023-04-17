const express  = require("express")
const pg = require("pg")
const app =  express()
const {Pool} = pg;

const pool = new Pool({
    host: "localhost",
    user: "susanamunoz",
    database: "diurno",
    password:"",
    port:5432
})

app.listen(4000)

app.get("/api/v1/personas", async (req,res)=>{
 const resultado = await pool.query("select  * from personas");
 res.json(resultado.rows)
})

app.delete("/api/v1/personas/:id", async (req,res)=>{
    const {id} =  req.params
    await pool.query("delete from personas where id=$1",[id]);
    
    const resultado = await pool.query("select  * from personas");
    res.json(resultado.rows)
   })