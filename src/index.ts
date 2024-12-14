import express from "express";
import 'dotenv/config'
import cors from 'cors';
import createRouter from './routes/crud';
import expressWs from "express-ws";
import wsRouter from "./routes/websocket"

const app = express();
expressWs(app);
app.use(cors());
app.use('/api',createRouter);
app.use('/ws',wsRouter);

app.get('/hello', (req,res) => {
    res.send("Hello World")
})

app.listen(process.env.PORT,() => console.log(`Running on port ${process.env.PORT}`));