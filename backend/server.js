const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

