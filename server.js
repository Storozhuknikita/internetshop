const express = require('express'); // фреймворк
const fs = require('fs'); // файловая система
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());


// два параметрка: объектк запроса(req - request) и объект ответа (response - res)
app.get('/products', (req, res) => {
    fs.readFile('./db/products.json', 'utf-8', (err, data) => {
        if(err){
            return console.log(err);
        }
        res.send(data);
    })
});

// два параметрка: объектк запроса(req - request) и объект ответа (response - res)
app.get('/cart', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err){
            return console.log(err);
        }
        res.send(data);
    })
});


// добавление в корзину
app.post('/cart', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err){
            return console.log(err);
        }

        const cart = JSON.parse(data);
        cart.push(req.body);

        fs.writeFile('./db/cart.json', JSON.stringify(cart), (err) => {
            if(err){
                console.log(err);
            }
            res.send(data);
        });

    })
});

// запрос на изменение
app.patch('/cart/:id', (req, res) => {
    fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
        if(err){
            return console.log(err);
        }

        let cart = JSON.parse(data);
        cart = cart.map((item) => {
            if(item.id === +req.params.id){
                return {...item, ...req.body};
            }
            return item;
        });

        fs.writeFile('./db/cart.json', JSON.stringify(cart), (err) => {
            if(err){
                console.log(err);
            }
            res.send(cart.find((item) => item.id === +req.params.id));
        });

    })
});

app.listen(3000, () => {
   console.log('server has been starded');
});