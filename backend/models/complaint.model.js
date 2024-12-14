import mongoose from 'mongoose';

const Complaintschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roomno: {
        type: String,
        required: true
    },
    comp:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

const  Complaint = mongoose.model('complaint', Complaintschema); 
export default  Complaint;
