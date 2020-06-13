const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'me-dumb'
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM news',
    (error, results) => {
      res.render('index.ejs', {news: results});
    }
  );
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM news',
    (error, results) => {
      res.render('index.ejs', {news: results});
    }
  );
});

app.get('/berita', (req, res) => {
  res.render('berita.ejs');
});
app.get('/user', (req, res) => {
  res.render('user.ejs');
});


app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO news (title, deskripsi, image) VALUES (?, ?, ?)',
    [req.body.itemName, req.body.itemDesc, req.body.itemImg],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/create_user', (req, res) => {
  connection.query(
    'INSERT INTO user (name, email) VALUES (?, ?)',
    [req.body.itemUser, req.body.itemEmail],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM news WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM news WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  // Ketik code untuk memperbarui item yang dipilih
  connection.query('UPDATE news SET title = ?, deskripsi = ?, image = ? WHERE id = ?',[req.body.itemName, req.body.itemDesc, req.body.itemImg, req.params.id],
  (error, results)=>{
    res.redirect('/');
  })
  // Hapus code pengalihan ke halaman daftar
});

app.listen(3000);
