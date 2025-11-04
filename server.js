const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/otakuuniversity', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Student model
const Student = mongoose.model('Student', {
  name: String,
  email: String,
  course: String,
});

// POST endpoint for registration
app.post('/api/register', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send({ message: 'Registration successful!' });
});

// ✅ GET endpoint for dashboard (add this here)
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});


// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
