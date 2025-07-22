const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
    },
    links: [{
        title: {type: String, required: true, trim: true},
        url: {type: String, required: true, trim: true},
    }],
}, {timestamps: true});

module.exports=mongoose.model('User',userSchema);