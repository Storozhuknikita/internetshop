
// корзина
var cart = [];

// получение блока корзины
var $basket = document.getElementById('basket');
$basket.addEventListener('click', handleRemoveToCartClick);


// получение блока итого сумма - кнопка - кнопка
var $basketTotal = document.getElementById('cart-block-total');
var $cartBlockCheckout = document.getElementById('cart-block-checkout');
var $cartBlockGo = document.getElementById('cart-block-go');


// получение отрисованных товаров
var $products = document.getElementById('product-fetures-items');
$products.addEventListener('click', handleAddToCartClick);


// отрисовка товаров на js


// получение индекса для проверки
function getProductIndex(name){

    var idx = -1;
    for (var i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            idx = i;
        }
    }
    return idx;
}

// получение индекса для удаления элемента
function getProductIndexForDelete(name){

    var idx = -1;
    for (var i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            delete cart[i];
        }
    }
    return idx;
}

// обработка клика по товарам (add to cart)
function handleAddToCartClick(event){

    event.preventDefault();

    if(event.target.tagName === 'A') {
        var $product = event.target.parentElement;
        var $id = $product.id;
        var $name = $product.querySelector('.product-feture-name').textContent;
        var $price = +$product.querySelector('.product-feture-price').textContent;
        //console.log($price); // не получается получить цифры
        var $img = $product.querySelector('.product-feture-img').style.backgroundImage;
    }

    var idx = getProductIndex($name);
    if(idx === -1){
        // товара нет
        cart.push(
            {id: $id, name: $name, price: $price, img: $img, quantity: 1}
            );
    } else {
        //товар есть
        cart[idx].quantity++;
    }

    buildTotal(cart);
    buildBasket(cart);
}

// обработка клика кнопке "удалить из корзины"
function handleRemoveToCartClick(event){

    event.preventDefault();

    if(event.target.tagName === 'I') {
        var $product = event.target.parentElement;
        var $id = $product.id;
    }

    var recToRemove = {id: $id};
    cart.splice(cart.indexOf(recToRemove), 1);

    // не пойму как мне удалить

    buildTotal(cart);
    buildBasket(cart);
}


// подсчет итого
// cart - корзина
function buildTotal(cart){

    var sum = 0; // сумма
    var count = 0; // количество итого
    for (var i = 0; i < cart.length; i++) {
        sum = sum + cart[i].price * cart[i].quantity;
        count = cart[i].quantity + count;
    }

    if (cart.length === 0) {
        $basketTotal.textContent = 'Корзина пуста';
        $cartBlockCheckout.style.display = 'none'; // пустая корзина - кнопок нет
        $cartBlockGo.style.display = 'none'; // пустая корзина - кнопок нет
        $basketTotal.style.display = 'block'; // говорим что пусто
    } else {
        $basketTotal.textContent = 'Сумма товаров в корзине: ' + sum + ' рублей';

        $cartBlockCheckout.style.display = 'block'; // не пустая корзина - кнопка есть
        $cartBlockGo.style.display = 'block'; // не пустая корзина - кнопка есть
        $basketTotal.style.display = 'block'; // говорим что не пусто блочим
    }

    // количество итого в штуках
    $countTotal = document.querySelector('.header-right-cart-circle-text').textContent = count;

}



// отрисовка корзины
function buildBasket(cart){

    // обнуляем
    $basket.innerHTML = '';

    for (var i = 0; i < cart.length; i++ ) {
        // создаем шаблон - клонируем
        var $template = document.querySelector('.cart-block').cloneNode(true);
        console.log($template);

        // добавление изображения
        $template.querySelector('.cart-block-img').style.backgroundImage = cart[i].img;
        $template.querySelector('.cart-block-img').style.backgroundSize = 'contain';
        $template.querySelector('.cart-block-img').style.backgroundRepeat = 'no-repeat';

        // добавление названия
        $template.querySelector('.cart-block-name').textContent = cart[i].name;

        // цена
        $template.querySelector('.cart-block-price-count').textContent = cart[i].quantity + ' X ' + cart[i].price;

        // выводим блок
        $template.style.display = 'block';

        $basket.insertBefore($template, $basket.firstChild);
    }

}

buildTotal(cart);
