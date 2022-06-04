const express = require('express');
// const { json } = require('express/lib/response');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');

  // Untuk get data
  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      // console.log("hasil database ->",users)
      res.render('index', { users: users, title: 'Data Murid Kelas' });
    });
  });

  // Untuk post data
  app.post('/tambah', (req, res) => {
    const insert = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`;
    db.query(insert, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
