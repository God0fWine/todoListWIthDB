// конструктор нашего дела
const Deal = function (deal) {
  this.text = deal.text;
};
//у нашей модели будут функции, с помощью которых можно осуществлять все операции CRUD, которые были озвучены в начале статьи:
Deal.create = (newDeal, result) => {
  sql.query("INSERT INTO TODO SET ?", newDeal, (err, res) => {
    //операция вставки из SQL
    if (err) {
      console.log("error: ", err);
      result(err, null);
      //немного бедная обработка ошибок, но на первое время хватит
      return;
    }

    console.log("Дело сделано", { id: res.insertId, ...newDeal });
    result(null, { id: res.insertId, ...newDeal });
  });
};
Deal.showAll = () => {
  sql.query('SELECT * FROM todo', (err, res) => {
    if (err) {
      console.error('error');
      return;
    }

    return res;
  });
}