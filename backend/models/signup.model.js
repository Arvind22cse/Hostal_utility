import mongoose from 'mongoose'
const Signupschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
},
{
    timestamps:true
}
);
const Signup=mongoose.model('Signup',Signupschema)
export default Signup;