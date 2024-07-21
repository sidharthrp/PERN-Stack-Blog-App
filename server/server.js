import express from "express";
import pg from "pg";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database: "Blog",
    password: "Airhead9",
    port:5432
});
db.connect();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));


    
app.get('/api', async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM blog ORDER BY id ASC");
        const data = result.rows;
        res.json(data);
        
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Error querying the database');
    }
  });

app.post('/api/write', async(req,res)=> {
    console.log(req.body);
    const { title, author, content } = req.body;
    const date = new Date().toDateString();
    console.log(date)
    console.log(title)
    try{
    await db.query("INSERT INTO blog(title,author,content,date) VALUES($1,$2,$3,$4)",[title,author,content,date])
    }catch(error){
        console.error("Error inserting");
    }
})

app.get(`/api/:id`, async(req,res)=>{
    const id=parseInt(req.params.id);
    console.log("id ="+id);
    try {
        const result = await db.query("SELECT * FROM blog WHERE id=$1",[id]);
        const data = result.rows;
        console.log(data[0]);
        res.json(data[0]);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('Error querying the database');
    }
})

app.post('/api/:id/delete', async(req,res)=>{
    const id=parseInt(req.params.id);
    console.log("id="+id);
    await db.query("DELETE FROM blog WHERE id=$1",[id]);
})

app.post('/api/:id/edit', async(req,res)=>{
    const id=parseInt(req.params.id);
    const { title, author, content } = req.body;
    console.log("id="+id);
    const date = new Date().toDateString();
    console.log(title + author + content+ date)
    await db.query("UPDATE blog SET title=$1, author=$2, content=$3, date=$4 WHERE id=$5",[title, author, content, date, id]);
})


app.listen(port, (req,res) => {
    console.log(`Listening to port ${port}`);
})