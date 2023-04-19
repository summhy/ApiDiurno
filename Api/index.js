const express  = require("express")
const pg = require("pg")
const app =  express()
const {Pool} = pg;
app.use(express.json());

const pool = new Pool({
    host: "localhost",
    user: "susanamunoz",
    database: "diurno",
    password:"",
    port:5432
})

app.listen(4000)

app.get("/api/v1/personas", async (req,res)=>{
 const resultado = await pool.query("select  * from personas order by id");
 res.json(resultado.rows)
})

app.delete("/api/v1/personas/:id", async (req,res)=>{
    try{
        const {id} =  req.params
        const resultado = await pool.query("delete from personas where id=$1 RETURNING id",[id]);
        if(resultado.rows){
             res.status(200).json({id:resultado.rows[0].id})
        }else{
            res.status(404).json({error:"Registro no Existe"})
        }   
    }catch(e){
        res.status(500).json({error:e})
    }
    
    
   })

app.post("/api/v1/personas",async(req,res)=>
{
    const {nombre,apellido} = req.body;
    const resultado =  await pool.query("insert into personas (nombre, apellido) values($1,$2) RETURNING id",[nombre,apellido]);
    console.log(resultado),
    res.json({})
    
})

app.put("/api/v1/personas/:id",async(req,res)=>
{
    const {id, nombre,apellido} = req.body;
    const resultado =  await pool.query("update personas set nombre =$1, apellido=$2 where id=$3",[nombre,apellido,id]);
    console.log(resultado),
    res.json({})
    
})