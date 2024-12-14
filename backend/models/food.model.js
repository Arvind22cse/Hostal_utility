import mongoose from 'mongoose';

const Foodschema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true
    },
    time: {
        type: Date,  
        required: true
    },
    img: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Food = mongoose.model('food', Foodschema);
export default Food;
