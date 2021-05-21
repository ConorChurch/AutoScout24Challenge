"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import html from 'web-ui.html';
//import * as csvParse from 'csv-parser';
//var myParser:csvParse.CsvParser = csvParse({delimiter: ','}, function(data: any, err: any) {
//	console.log(data);
//}) as csvParse.CsvParser;
const app = express_1.default();
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const results2 = [];
fs.createReadStream('listings.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    //    console.log(results);
});
fs.createReadStream('contacts.csv')
    .pipe(csv())
    .on('data', (data) => results2.push(data))
    .on('end', () => {
    //    console.log(results);
});
function averageSellerPrice() {
    var privatePrice = 0;
    var dealerPrice = 0;
    var otherPrice = 0;
    var totalPrivate = 0;
    var totalDealer = 0;
    var totalOther = 0;
    for (let i in results) {
        var price = +Object.values(results[i])[2];
        if (Object.values(results[i])[4] == "private") {
            privatePrice += price;
            totalPrivate++;
        }
        else if (Object.values(results[i])[4] == "dealer") {
            dealerPrice += price;
            totalDealer++;
        }
        else if (Object.values(results[i])[4] == "other") {
            otherPrice += price;
            totalOther++;
        }
    }
    const test = [privatePrice / totalPrivate, dealerPrice / totalDealer, otherPrice / totalOther];
    return test;
}
function distributionOfCarsByMake() {
    var totalNumberOfCars = 0;
    var map2 = new Map();
    for (let i in results) {
        totalNumberOfCars++;
        if (map2.has(Object.values(results[i])[1]) == false) {
            map2.set(Object.values(results[i])[1], 1);
            //console.log(Object.values(results[i])[1]);
        }
        else if (map2.has(Object.values(results[i])[1])) {
            map2.set(Object.values(results[i])[1], map2.get(Object.values(results[i])[1]) + 1);
        }
    }
    var array = [];
    for (let entry of map2.entries()) {
        array.push({
            name: entry[0],
            value: (entry[1] / totalNumberOfCars) * 100
        });
    }
    var sorted = array.sort(function (a, b) {
        return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);
    });
    return sorted;
}
function averagePriceOfContactedListings() {
    var totalNumberOfListings = 0;
    var map2 = new Map();
    var map3 = new Map();
    for (let i in results2) {
        totalNumberOfListings++;
        if (map2.has(Object.values(results2[i])[0]) == false) {
            map2.set(Object.values(results2[i])[0], 1);
        }
        else if (map2.has(Object.values(results2[i])[0])) {
            map2.set(Object.values(results2[i])[0], map2.get(Object.values(results2[i])[0]) + 1);
        }
    }
    var array = [];
    var totalPriceOfThirty = 0;
    for (let entry of map2.entries()) {
        array.push({
            name: entry[0],
            value: entry[1]
        });
    }
    var totalContacts = 0;
    var numberOfListingsInThirtyPercent = 0;
    var sorted = array.sort(function (a, b) {
        return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);
    });
    var array2 = [];
    for (let i in sorted) {
        if (totalContacts < totalNumberOfListings * 0.3) {
            array2.push({
                name: Object.values(sorted[i])[0],
                value: Object.values(sorted[i])[1]
            });
            totalContacts += Object.values(sorted[i])[1];
            numberOfListingsInThirtyPercent++;
        }
    }
    for (let i in results) {
        if (map3.has(Object.values(results[i])[0]) == false) {
            map3.set(Object.values(results[i])[0], Object.values(results[i])[2]);
            //	console.log(Object.values(results[i])[2]);
        }
    }
    for (let i in array2) {
        if (map3.has(Object.values(array2[i])[0])) {
            totalPriceOfThirty += +map3.get(Object.values(array2[i])[0]);
        }
    }
    //Need to round result before sending back
    return (totalPriceOfThirty / numberOfListingsInThirtyPercent).toString();
}
function top5listingsPerMonth() {
}
app.get('/', (req, res) => {
    // res.send(averageSellerPrice());
    //   res.send(distributionOfCarsByMake());
    res.send(averagePriceOfContactedListings());
});
//app.get('/display', (req: any, res) => {
//	res.render("web-ui");
//});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
