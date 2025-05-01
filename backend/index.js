require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,   
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE 
});

try {
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
}
catch (err){
  console.error('Error connecting to MySQL:', err);
}


function generateRandomCode(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  return result;
}


app.post('/register', (req, res) => {
  const { teamName, phoneNum, userName } = req.body;

  connection.execute(
    'INSERT INTO teams (userName, teamName, phoneNum) VALUES (?, ?, ?)', 
    [userName, teamName, phoneNum], 
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.json({ message: 'Data inserted successfully!', id: results.insertId });
    }
  );
});

app.get('/teams', (req, res) => {
  connection.execute('SELECT * FROM teams', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching teams' });
    }
    res.json(results);
  });
});


app.post('/login', (req, res) => {
  const { id , password } = req.body;
  connection.execute('SELECT * FROM users where id = ? and password = ? ' , [id , password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching teams' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    let randomSessionId = generateRandomCode(50)
    connection.execute('INSERT INTO session (id_session , id_user) values (? , ?)' , [randomSessionId , user.id])
    res.json({...user ,sessionCode : randomSessionId})
  });
})


app.post('/verify-session' , (req , res)=>{
  const {id , sessionId} = req.body
  connection.execute('SELECT S.* , U.role from session S inner Join users U' ,[], (err , results)=>{
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error fetching teams' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const session = results[0];
    res.json(session)
  })
 
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});