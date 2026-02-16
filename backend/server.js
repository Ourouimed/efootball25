import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// routes imports
import corsOptions from './middelware/corsOption.js';
import matchesRouter from './routes/matches.js';
import teamsRouter from './routes/teams.js';
import drawRouter from './routes/draw.js';
import settingsRouter from './routes/settings.js'
import authRouter from './routes/auth.js'

// dotenv config
config()
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


// configure routes
app.use('/matches' , matchesRouter)
app.use('/teams' , teamsRouter)
app.use('/generate-matches' , drawRouter)
app.use('/settings' , settingsRouter)
app.use('/' , authRouter)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});