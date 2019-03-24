
/*
 * Класс для генерации поля
 */
class Item {
    constructor(product_id, product_name, product_img,  product_price) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_img = product_img;
        this.product_price = product_price;
    }

    render() {
        return `<div class="feture" id="${this.product_id}">
    <a href="#">
        <div class="feture-img" style="background-image: url('img/${this.product_img}');"></div>
        <div class="feture-text">
            <div class="feture-name">${this.product_name}</div>
            <div class="feture-price">${this.product_price}</div>
        </div>
    </a>
    <a href="#" class="feture-add-to-cart">Add to cart</a>
</div>`;
    }
}

/*
 * Класс для генерации списка
 */
class ItemList {
    constructor() {
        this.items = [];
    }

    /*
     * Получение товаров из БД
     */
    fetchItems() {
        this.items = [
            {
                product_id: 1,
                product_name: 'Mango  People  T-shirt 1',
                product_img: 'f1.jpg',
                product_price: 52
            },
            {
                product_id: 2,
                product_name: 'Mango  People  T-shirt 2',
                product_img: 'f2.jpg',
                product_price: 52
            },
            {
                product_id: 3,
                product_name: 'Mango  People  T-shirt 3',
                product_img: 'f3.jpg',
                product_price: 52
            },
            {
                product_id: 4,
                product_name: 'Mango  People  T-shirt 4',
                product_img: 'f4.jpg',
                product_price: 52
            },
            {
                product_id: 5,
                product_name: 'Mango  People  T-shirt 5',
                product_img: 'f5.jpg',
                product_price: 52
            },
            {
                product_id: 6,
                product_name: 'Mango  People  T-shirt 6',
                product_img: 'f6.jpg',
                product_price: 52
            },
            {
                product_id: 7,
                product_name: 'Mango  People  T-shirt 7',
                product_img: 'f7.jpg',
                product_price: 52
            },
            {
                product_id: 8,
                product_name: 'Mango  People  T-shirt 8',
                product_img: 'f8.jpg',
                product_price: 52
            },
        ];

        this.items = this.items.map(item => new Item(item.product_id, item.product_name, item.product_img, item.product_price));
    }

    render() {
        const itemsHtml = this.items.map(item => item.render());
        return itemsHtml.join('');
    }
}


/*
 * Класс для работы с корзиной
 */
class Cart {

    constructor() {

        // массив для корзины
        this.cart = [];

        // получени корзину
        this.basket = document.getElementById('basket');
        this.basket.addEventListener('click', (event) => this.handleRemoveToCartClick(event));

        // получение блока итого сумма - кнопка - кнопка и обработка кликов
        this.basketTotal = document.getElementById('cart-block-total');
        this.cartBlockCheckout = document.getElementById('cart-block-checkout');
        this.cartBlockGo = document.getElementById('cart-block-go');

        // получение отрисованных товаров и обработка кликов по ним
        let $products = document.getElementById('fetures-items');
        $products.addEventListener('click', (event) => this.handleAddToCartClick(event));

    }

    /*
     * Получение индекса для проверки
     */
    getProductIndex(name) {

        this.idx = -1;
        for (this.i = 0; this.i < this.cart.length; this.i++) {
            if (this.cart[this.i].name === name) {
                this.idx = this.i;
            }
        }
        return this.idx;
    }

    /*
     * Получение индекса для удаления элемента
     */
    getProductIndexForDelete(name) {

        this.idx = -1;
        for (this.i = 0; this.i < this.cart.length; this.i++) {
            if (this.cart[this.i].name === name) {
                delete this.cart[this.i];
            }
        }
        return this.idx;

    }

    /*
     * Обработка клика по товарам (add to cart)
     */
    handleAddToCartClick(event) {

        // сброс клика
        event.preventDefault();

        // если клик по ссылке
        if (event.target.tagName === 'A') {
            let $product = event.target.parentElement;
            this.id = $product.id;
            this.name = $product.querySelector('.feture-name').textContent;
            this.price = +$product.querySelector('.feture-price').textContent;
            //console.log($price); // не получается получить цифры
            this.img = $product.querySelector('.feture-img').style.backgroundImage;
        }

        let idx = this.getProductIndex(this.name);
        if (idx === -1) {
            // товара нет
            this.cart.push({
                id: this.id,
                name: this.name,
                price: this.price,
                img: this.img,
                quantity: 1
            });
        } else {
            //товар есть
            this.cart[idx].quantity++;
        }

        // отрисовка заново
        this.buildTotal(this.cart);
        this.buildBasket(this.cart);
    }

    // обработка клика кнопке "удалить из корзины"
    handleRemoveToCartClick(event) {

        // сброс
        event.preventDefault();

        if (event.target.tagName === 'I') {
            this.product = event.target.parentElement;
            this.product_id = this.product.id;
        }
        const recToRemove = this.cart.find((elem) => elem.id = this.id);

        console.log(this.cart.indexOf(recToRemove));
        this.cart.splice(this.cart.indexOf(recToRemove), 1);

        this.buildTotal(this.cart);
        this.buildBasket(this.cart);
    }


    // подсчет итого
    // cart - корзина
    buildTotal() {

        this.sum = 0; // сумма
        this.count = 0; // количество итого
        for (this.i = 0; this.i < this.cart.length; this.i++) {
            this.sum = this.sum + this.cart[this.i].price * this.cart[this.i].quantity;
            this.count = this.cart[this.i].quantity + this.count;
        }

        if (this.cart.length === 0) {
            this.basketTotal.textContent = 'Корзина пуста';

            this.cartBlockCheckout.style.display = 'none'; // пустая корзина - кнопок нет
            this.cartBlockGo.style.display = 'none'; // пустая корзина - кнопок нет
            this.basketTotal.style.display = 'block'; // говорим что пусто
        } else {
            this.basketTotal.textContent = 'Сумма товаров в корзине: ' + this.sum + ' рублей';

            this.cartBlockCheckout.style.display = 'block'; // не пустая корзина - кнопка есть
            this.cartBlockGo.style.display = 'block'; // не пустая корзина - кнопка есть
            this.basketTotal.style.display = 'block'; // говорим что не пусто блочим
        }

        // количество итого в штуках
        this.countTotal = document.querySelector('.header-right-cart-circle-text').textContent = this.count;

    }

    // отрисовка корзины
    buildBasket(cart) {

        // обнуляем для перерисовки
        this.basket.innerHTML = '';

        for (this.i = 0; this.i < cart.length; this.i++) {
            // клонируем шаблон
            let $template = document.querySelector('.cart-block').cloneNode(true);

            // добавление изображения
            $template.querySelector('.cart-block-img').style.backgroundImage = cart[this.i].img;
            $template.querySelector('.cart-block-img').style.backgroundSize = 'contain';
            $template.querySelector('.cart-block-img').style.backgroundRepeat = 'no-repeat';

            // добавление названия
            $template.querySelector('.cart-block-name').textContent = cart[this.i].name;

            // цена
            $template.querySelector('.cart-block-price-count').textContent = cart[this.i].quantity + ' X ' + cart[this.i].price;

            // выводим блок
            $template.style.display = 'block';

            // добавляем в конец
            this.basket.insertBefore($template, this.basket.firstChild);
        }

    }

}




/*
 * Класс собирающий у себя все запуски
 */
class Launch {

    render() {
        // запуск рендера товаров
        const items = new ItemList();
        items.fetchItems();

        const cart = new Cart();
        //Cart.buildTotal(cart);

        document.querySelector('.fetures-items').innerHTML = items.render();



    }
}

// Запуск всего 1 функцией
const app = new Launch();
app.render();

