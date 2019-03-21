
// SOLID, KISS, DRY
// 1. Инкапсуляция (сокрытие реализации)
// 2. Наследование (
// 3. Полиморфизм
// 4. Абстракция

/*
function Container(id, className, tagName) {

}

Container.prototype.render = function(){
    return `<${this.tagName} class="${this.className}" id="${this.id}"></${this.tagName}>`;
};


function Menu(id, className, items){
    Container.call(this, id, className, 'ul');

    this.items = items;
}


Menu.prototype = Object.create(Container.prototype);
*/

// ES 6
class Container {
    constructor(id, className, tagName){
        this.id = id;
        this.className = className;
        this.tagName = tagName;
    }

    render() {
        return `<${this.tagName} class="${this.className}" id="${this.id}"></${this.tagName}>`;
    }
}

class Menu extends Container {
    // все идет в PROTO
    constructor(id, className, items){
        super(id, className, 'ul'); // указатель на родительский класс
        this.items = items;
    }

    render() {

    }
}


class Item {
    constructor(id, img, title, price){
        this.id = id;
        this.img = img;
        this.title = title;
        this.price = price;
    }

    render(){
        return `<div class="feture">
    <a href="page.html/${this.id}">
        <div class="feture-img" style="background-image: url('img/${this.img}');"></div>
        <div class="feture-text">
            <div class="feture-name">${this.title}</div>
            <div class="feture-price">${this.price}</div>
        </div>
    </a>
    <a href="#" class="feture-add-to-cart">Add to cart</a>
</div>`;
    }
}

class ItemList {
    constructor(){
        this.items = [];
    }

    fetchItems() {
        this.items = [
            { product_id: 1, product_name: 'Mango  People  T-shirt', product_img: 'f1.jpg', product_price: 52 },
            { product_id: 2, product_name: 'Mango  People  T-shirt', product_img: 'f2.jpg', product_price: 52 },
            { product_id: 3, product_name: 'Mango  People  T-shirt', product_img: 'f3.jpg', product_price: 52 },
            { product_id: 4, product_name: 'Mango  People  T-shirt', product_img: 'f4.jpg', product_price: 52 },
            { product_id: 5, product_name: 'Mango  People  T-shirt', product_img: 'f5.jpg', product_price: 52 },
            { product_id: 6, product_name: 'Mango  People  T-shirt', product_img: 'f6.jpg', product_price: 52 },
            { product_id: 7, product_name: 'Mango  People  T-shirt', product_img: 'f7.jpg', product_price: 52 },
            { product_id: 8, product_name: 'Mango  People  T-shirt', product_img: 'f8.jpg', product_price: 52 },
            { product_id: 9, product_name: 'Mango  People  T-shirt', product_img: 'f9.jpg', product_price: 52 },
        ];

        this.items = this.items.map(item => new Item(item.product_id, item.product_img, item.product_name, item.product_price));
    }

    render(){
        const itemsHtml = this.items.map(item => item.render());
        return itemsHtml.join('');
    }
}

const items = new ItemList();
items.fetchItems();

document.querySelector('.fetures-items').innerHTML = items.render();




// Я пока что оставил код который писал ранее
// Добавил функцию отрисовки товаров на JS

// корзина
/*var cart = [];

// получение блока корзины и обработчик
var $basket = document.getElementById('basket');
$basket.addEventListener('click', handleRemoveToCartClick);


// получение блока итого сумма - кнопка - кнопка
var $basketTotal = document.getElementById('cart-block-total');
var $cartBlockCheckout = document.getElementById('cart-block-checkout');
var $cartBlockGo = document.getElementById('cart-block-go');


// получение отрисованных товаров
var $products = document.getElementById('product-fetures-items');
$products.addEventListener('click', handleAddToCartClick);
*/

// отрисовка товаров на js
// UPDATE 18-19.03.2019

// Товары
/*const goods = [
    { product_id: 1, product_name: 'Mango  People  T-shirt', product_img: 'f1.jpg', product_price: 52 },
    { product_id: 2, product_name: 'Mango  People  T-shirt', product_img: 'f2.jpg', product_price: 52 },
    { product_id: 3, product_name: 'Mango  People  T-shirt', product_img: 'f3.jpg', product_price: 52 },
    { product_id: 4, product_name: 'Mango  People  T-shirt', product_img: 'f4.jpg', product_price: 52 },
    { product_id: 5, product_name: 'Mango  People  T-shirt', product_img: 'f5.jpg', product_price: 52 },
    { product_id: 6, product_name: 'Mango  People  T-shirt', product_img: 'f6.jpg', product_price: 52 },
    { product_id: 7, product_name: 'Mango  People  T-shirt', product_img: 'f7.jpg', product_price: 52 },
    { product_id: 8, product_name: 'Mango  People  T-shirt', product_img: 'f8.jpg', product_price: 52 },
    { product_id: 9, product_name: 'Mango  People  T-shirt', product_img: 'f9.jpg', product_price: 52 },
];

// Подготовка вида
const renderGoodsItems = (title, price, img, id) => {
    return `<div class="feture">
    <a href="page.html/${id}">
        <div class="feture-img" style="background-image: url('img/${img}');"></div>
        <div class="feture-text">
            <div class="feture-name">${title}</div>
            <div class="feture-price">${price}</div>
        </div>
    </a>
    <a href="#" class="feture-add-to-cart">Add to cart</a>
</div>`;
};

// Рендер товара
const renderGoodsList = (list) => {
    document.querySelector('.fetures-items').innerHTML = list.map(item => renderGoodsItems(item.product_name, item.product_price, item.product_img, item.product_id));
};

renderGoodsList(goods);

*/

/*
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

    // сброс клика
    event.preventDefault();

    // если клик по ссылке
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

    // отрисовка заново
    buildTotal(cart);
    buildBasket(cart);
}

// обработка клика кнопке "удалить из корзины"
function handleRemoveToCartClick(event){

    // сброс
    event.preventDefault();

    if(event.target.tagName === 'I') {
        var $product = event.target.parentElement;
        var $id = $product.id;
    }


    // подготовка формата и удаление
    var recToRemove = {id: $id};
    cart.splice(cart.indexOf(recToRemove), 1);

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

    // обнуляем для перерисовки
    $basket.innerHTML = '';

    for (var i = 0; i < cart.length; i++ ) {
        // клонируем шаблон
        var $template = document.querySelector('.cart-block').cloneNode(true);

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

        // добавляем в конец
        $basket.insertBefore($template, $basket.firstChild);
    }

}

buildTotal(cart);*/