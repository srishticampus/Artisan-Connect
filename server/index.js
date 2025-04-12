const express=require('express')
const bodyParser=require('body-parser')
const db=require('./dbConnection')
const app=express()
const cors=require('cors')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/upload`));

app.use(cors())
const route=require('./routes')
app.use('/atresian_marketplace',route)

app.listen(4004,()=>{
    console.log("Server created successfully at 4004");
})