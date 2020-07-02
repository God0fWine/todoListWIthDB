const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./app/connection");
const cors = require('cors');

//делаем наш парсинг в формате json
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/task/alltodo", (req, res) => {
  connection.query("SELECT * FROM todo", function (err, data) {
    if (err) { console.log('error'); return }
    res.json(data);
  })
});

app.delete("/task/:todoid", (req, res) => {
  connection.query(`DELETE FROM todo WHERE id = ?`, [req.params.todoid], function (err, data) {
    if (err) { console.log('error'); return }
    // res.send('OK');
  })
})

app.post("/task/newtodo", (req, res) => {
  console.log(req.body);
  connection.query(`INSERT INTO todo (text) VALUES(?)`, [req.body.text], function (err, data) {
    if (err) {
      console.log('error_______');
      return;
    }
  })
})

// установить порт, и слушать запросы
app.listen(3001, () => {
  console.log("Сервер запущен на 3001 порту");
});