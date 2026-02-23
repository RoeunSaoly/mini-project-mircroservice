const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/users')
//     .then(()=>console.log("Connected to MongoDB"))
//     .catch(err=>console.error("MongoDb connection error:",err));
mongoose.connect('mongodb://mongo:27017/users')
    .then(()=>console.log("Connected to MongoDB"))
    .catch(err=>console.error("MongoDb connection error:",err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

const User = mongoose.model('User', userSchema);


app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

app.post('/users',async (req,res)=>{
    const {name, email} = req.body;
    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).send(user);
    }catch(error){
        console.error("Error creating user:",error);
        res.status(500).send({error:"Internal server error"});
    }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`User service listening on port ${port}`)
})
