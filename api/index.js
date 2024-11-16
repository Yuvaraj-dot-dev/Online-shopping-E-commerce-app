import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dineshrajv9',
    database: 'mydatabase',
    // authPlugins: {
    //     mysql_clear_password: () => () => Buffer.from('root')
    // }

})

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});


app.get('/', (req, res) => {
    res.json('Hello World! xgxcghgjvgjvgjvgjHey U');
})

app.get('/employees', (req, res) => {
    const q = "SELECT * FROM mydatabase.userdetails;"
    console.log(db.query(q),"employees")
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    }
)})

app.post('/details', (req, res) => {
    // const userid = req.body.userid;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    console.log(userid);
    db.query( "INSERT INTO userdetails (Name, Email_id, Phone, Password) VALUES (?,?,?,?)",
    [name, email, phone, password],(err, result) =>{
        if (err){
            return console.error(err);
        } 
        else {
            console.log("value is inserted into userdetails")
            res.send("value is inserted into userdetails");
        } 
    })
})

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});