require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./middelware/corsOption');
const matchesRouter = require('./routes/matches');
const teamsRouter = require('./routes/teams');
const drawRouter = require('./routes/draw');
const authRouter = require('./routes/auth')
const twilio = require('twilio');


const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());


// routes 
app.use('/matches' , matchesRouter)
app.use('/teams' , teamsRouter)
app.use('/generate-matches' , drawRouter)
app.use('/' , authRouter)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});