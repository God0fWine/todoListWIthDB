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
    if (err) { console.log(err); return }
  })
})

app.post("/task/newtodo", (req, res) => {
  console.log(req.body);
  connection.query(`INSERT INTO todo (text) VALUES (?)`, [req.body.text], function (err, results) {
    console.log(results.insertId);
    if (err) {
      console.log('error_______');
      return;
    }
    res.text(results.insertId);
  // connection.query(`INSERT INTO todo SET ?`, [req.body.text], function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results.insertId);
  // });
  // console.log(data.insertId + "_______--s");
  // return data.insertId;
})
})

// установить порт, и слушать запросы
app.listen(3001, () => {
  console.log("Сервер запущен на 3001 порту");
});