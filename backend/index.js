const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());



app.use(express.json()); 

app.get('/register', (req, res) => {
  console.log(req.body)
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
