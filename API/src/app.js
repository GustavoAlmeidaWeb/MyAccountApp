require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const conn = require('./db/conn');
const routes = require('./routes/Router');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

conn().then(() => {
    app.listen(process.env.API_PORT, () => {
        console.log("API Online!");
    });
});