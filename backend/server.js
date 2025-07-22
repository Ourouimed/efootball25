require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./middelware/corsOption');
const matchesRouter = require('./routes/matches');
const teamsRouter = require('./routes/teams');
const drawRouter = require('./routes/draw');
const settingsRouter = require('./routes/settings')
const authRouter = require('./routes/auth')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());



app.use('/matches' , matchesRouter)
app.use('/teams' , teamsRouter)
app.use('/generate-matches' , drawRouter)
app.use('/settings' , settingsRouter)
app.use('/' , authRouter)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});