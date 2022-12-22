require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const conn = require('./db/conn');
const routes = require('./routes/Router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(helmet());

conn().then(() => {
    app.listen(process.env.API_PORT, () => {
        console.log("API Online!");
    });
})