const express = require('express')
const cors = require('cors')
const monk = require('monk')



const app = express();
const db = monk('localhost/stockdb');
const stocks = db.get('stocks')


app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log('listening on port 5000');
})

app.get('/', (req, res) => {
    res.json({
        message: 'testing'
    });
})

function isValidStock(stock) {
    return stock.name && stock.name.toString().trim() != '' &&
    stock.content && stock.content.toString().trim() != ''
}

app.post('/stocks', (req, res) => {
    if(isValidStock(req.body)) {
        //insert into DB
        const stock = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
    //console.log(stock);
    stocks
        .insert(stock)
        .then(createdStock => {
            res.json(createdMew);
        });

    }else {
        res.status(422);
        res.json({
            message: 'name and content are required'
        })
    }
})