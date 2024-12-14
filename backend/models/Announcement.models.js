import mongoose from 'mongoose';

const Announcementschema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const Announcement = mongoose.model('anounce', Announcementschema);
export default Announcement;
