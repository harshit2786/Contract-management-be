const express = require('express');
import 'dotenv/config'
import cors from 'cors';
import createRouter from './routes/create';

const app = express();
app.use(cors())
app.use('/api',createRouter);

app.listen(3000,() => console.log("Running on port 3000"));