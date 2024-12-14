import mongoose from 'mongoose';

const logadminschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const AdminSignup = mongoose.model('AdminSignup', logadminschema); // Use 'AdminSignup' instead of 'Signup'
export default AdminSignup;
