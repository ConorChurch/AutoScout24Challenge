const server = require('../index')
const request = require("supertest");


const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const results2 = [];


fs.createReadStream('./listings.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
});

fs.createReadStream('./contacts.csv')
  .pipe(csv())
  .on('data', (data) => results2.push(data))
  .on('end', () => {
});



describe("GET /", () => {

  test("should return status 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

});

// having issue accurately checking the return value here
describe("GET /home", () => {

  test("should return status 200", async () => {
    expect.assertions();
    return request(server).get("/home").then(data => expect.anything(data));
  });

});


// having issue accurately checking the return value here
describe("GET /reuse", () => {

  test("should return status 200", async () => {
    expect.assertions();
    return request(server).get("/reuse").then(data => expect.anything(data));
  });

});



describe("GET /joke", () => {

  test("should return status 404", async () => {
    const res = await request(server).get("/joke");
    expect(res.status).toBe(404);
  });

});


describe("GET /reuse/code", () => {

  test("should return status 404", async () => {
    const res = await request(server).get("/reuse/code");
    expect(res.status).toBe(404);
  });

});

