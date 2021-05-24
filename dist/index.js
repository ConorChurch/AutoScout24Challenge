"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const results2 = [];
var bodyParser = require('body-parser');
const app = express_1.default();
fs.createReadStream('listings.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
});
fs.createReadStream('contacts.csv')
    .pipe(csv())
    .on('data', (data) => results2.push(data))
    .on('end', () => {
});
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/home', (req, res) => {
    res.render('home', { results2, results });
});
app.get('/reuse', (req, res) => {
    res.render('home', { results2, results });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
