const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect((process.env.MONGO_URI)).then(()=>console.log('MongoDB Connected Successfully')).catch(err=>console.error('MongoDB Connection Error: ',err));

//DEFINING ROUTES
app.use('/api/auth',require('./routes/auth'));
app.use('/api/links',require('./routes/links'));
app.use('/api/profile',require('./routes/profile'));

app.listen(PORT,()=>{
    console.log('Server is Running on Port ',PORT);
});