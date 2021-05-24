import express from "express";
import path from "path";

const csv = require('csv-parser');
const fs = require('fs');
const results: String[] = [];
const results2: String[] = [];

var bodyParser = require('body-parser');
const app = express();


fs.createReadStream('listings.csv')
  .pipe(csv())
  .on('data', (data: any) => results.push(data))
  .on('end', () => {
});

fs.createReadStream('contacts.csv')
  .pipe(csv())
  .on('data', (data: any) => results2.push(data))
  .on('end', () => {
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/home', (req, res) => {
    res.render('home', {results2, results});
});

app.get('/reuse', (req, res) => {
    res.render('home', {results2, results});
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
