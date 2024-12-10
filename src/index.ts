const express = require('express');
import 'dotenv/config'

const app = express();

app.listen(3000,() => console.log("Running on port 3000"));