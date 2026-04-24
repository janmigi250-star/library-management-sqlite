import express from "express";
import { db } from "./config/db.js";
import cors from "cors";

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://127.0.0.1:5500',
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type']
}))


app.post('/api/books',(req,res)=>{
    const { name, description, author, price, imageSrc } = req.body;
    if(!name || !description || !author || !price || !imageSrc){
      console.log('all fields are riquired');
      return res.status(400).json('all fields are riquired')
    }

    const query = `INSERT INTO books (name, description, author, price, imageSrc) VALUES(?,?,?,?)`
    db.run(query,[name, description, author, price, imageSrc],(err)=>{
      if(err){
        return console.log('error in creating book',err);
        
      }
      return res.status(201).json({message:'book created susseccfull'})
    })

}) 






app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
