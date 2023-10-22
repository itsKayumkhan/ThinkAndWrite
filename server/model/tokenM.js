import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        require:true
    }
})

const Token = new mongoose.model("token", tokenSchema);

export default Token;