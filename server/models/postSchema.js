const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: true,
    },
    // likes:{

    // }
    image:{
        type:String,
        default:'https://image.freepik.com/vecteurs-libre/poste-instagram-fond-transparent_23-2147831438.jpg',
    },
},{
    timestamps: true
});
module.exports = mongoose.model('post', postSchema);