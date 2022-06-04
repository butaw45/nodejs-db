const express = require('express');
// const { json } = require('express/lib/response');
const mysql = require('mysql')

const app = express();

app.set('view engine', 'ejs');
app.set("views", "views");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "school"
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MySql Connected...')

    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) => {
        // if (err) throw err
        const users = JSON.parse(JSON.stringify(result))

        console.log("hasil database ->",users)

        app.get('/', (req, res) => {
            res.render("index", {users: users, title: "Data Murid Kelas"})
        })

    })

    

})

app.listen(8000, () => {
    console.log('Server started on port 8000');
    });