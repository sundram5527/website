// Backend: Express server (index.js) // install express mongoose
//backend vercel hosting link: websitebackend-4fuvgt33x-sundram-kumars-projects-6a3481a2.vercel.app
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sundramkumar9896:n36Bjfty4rCH0wPl@cluster1.udcppv5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

app.get('/api/contact',async(req,res) =>{
    try{
    const contact = await Contact.find();
    res.json(contact);
    }
    catch(err){
     console.error(err);
     res.status(500).json({message: "Failed to send message"});
    }
});


// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    console.log("post request received")
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save message' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));