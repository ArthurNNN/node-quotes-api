const { response, json } = require("express");

const express = require("express");
const app = express();

const quotes = require("./quotes.json");

app.use(express.json())

app.get('/', function (request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});


// GET
app.get("/quotes/:id", function (request, response) {
  let id = parseInt(request.params.id);
  response.json(quotes.filter(item => item.id === id));
});

// POST
app.post("/quotes", (request, response) => {
  var quote = request.body;
  let nextId = Math.max(...quotes.map(item => item.id)) + 1;
  quotes.push({ ...quote, "id": nextId });
  response.send(quotes);
});

// PUT
app.put("/quotes/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let index = quotes.findIndex(item => item.id === id);
  var quote = request.body;
  quotes.splice(index, 1, { ...quote, id });
  response.send(quotes);
});


// DELETE
app.delete("/quotes/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let index = quotes.findIndex(item => item.id === id);
  quotes.splice(index, 1);
  response.send(quotes);
});


app.listen(3000, () => console.log("Listening on port 3000"));
