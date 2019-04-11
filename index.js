const fs = require('fs');

fs.readFile('./public/js/products.json', (err, data) => {
    if(err){
        console.log(err);
        return;
    }

    const product = JSON.parse(data);

//    product.push({productId});

  //  fs.writeFile('./public/js/products.json', JSON.stringify(product));
});