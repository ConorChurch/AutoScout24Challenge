"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    res.json({ message: 'pass!' });
}));
app.get('/home', (req, res) => {
    res.status(200);
    res.render('home', { results2, results });
});
app.get('/reuse', (req, res) => {
    res.render('home', { results2, results });
});
exports.default = app;
module.exports = app;
