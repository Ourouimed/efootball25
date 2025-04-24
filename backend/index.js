const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());  

const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',     
  database: 'efootball'  
});


app.post('/register', (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  connection.execute('INSERT INTO users (userId, teamName, phoneNum) VALUES (?, ?, ?)', 
    [userName, teamName, phoneNum], 
    (err) => {
      if (err) {
        return res.status(500).send('Error inserting data: Team Li khtarity deja kayna');
      }
      res.send('Data inserted successfully!');
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
