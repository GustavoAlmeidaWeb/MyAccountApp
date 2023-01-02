require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const conn = require('./db/conn');
const routes = require('./routes/Router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: process.env.CORS_URL }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api', routes);
app.use(helmet());

conn().then(() => {
    app.listen(process.env.API_PORT, () => {
        console.log("API Online!");
    });
});