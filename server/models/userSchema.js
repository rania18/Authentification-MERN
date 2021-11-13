const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullName:{
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{
    timestamps: true
});
module.exports = mongoose.model('user',userSchema);