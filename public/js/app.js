/*
    * Функция отправки запросов
 */
function sendRequest(url){
    return fetch(url).then((response) => response.json());
}

/*
 * Класс для генерации поля
 */
class Item {

    constructor(productId, productName, productImg,  productPrice) {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.productPrice = productPrice;
    }

    render() {
        return `<div class="feture" id="${this.productId}">
                    <a href="#">
                        <div class="feture-img" style="background-image: url('img/${this.productImg}');"></div>
                        <div class="feture-text">
                            <div class="feture-name">${this.productName}</div>
                            <div class="feture-price">${this.productPrice}</div>
                        </div>
                    </a>
                    <a href="#" class="feture-add-to-cart">Add to cart</a>
                </div>`;
    }
}

/*
 * Класс для генерации списка товаров
 */
class ItemList {

    constructor() {
        this.items = [];
    }

    /*
     * Получение товаров из БД
     * Функция рабочая
     * 25.03.2019
     */

    fetchItems(callback) {
        return sendRequest('/js/products.json').then((items) => {
            this.items = items.map(item => new Item(item.productId, item.productName, item.productImg, item.productPrice));
            this.filteredItems = this.items;
        });
    }

    /*
     * Поиск в интернет магазине на главной странице
     */
    filterItems(query){
        const regExp = new RegExp(query, 'i');
        this.filteredItems = this.items.filter((item) => regExp.test(item.productName));
    }

    /*
     * Функция рендера товаров
     * Функция рабочая
     * 25.03.2019
     */
    render() {
        const itemsHtml = this.filteredItems.map(item => item.render());
        return itemsHtml.join('');
    }
}


/*
 * Класс для работы с корзиной
 * Класс рабочий
 * 25.03.2019
 */
class Cart {

    constructor() {
        // информация о корзине хранится тут
        this.cart = [];

        // получени корзину
        this.basket = document.getElementById('basket');
        this.basket.addEventListener('click', (event) => this.handleRemoveToCartClick(event));

        // получение блока итого сумма - кнопка - кнопка и обработка кликов
        this.basketTotal = document.getElementById('cart-block-total');
        this.cartBlockCheckout = document.getElementById('cart-block-checkout');
        this.cartBlockGo = document.getElementById('cart-block-go');

        // получение отрисованных товаров и обработка кликов по ним
        this.$products = document.getElementById('fetures-items');
        this.$products.addEventListener('click', (event) => this.handleAddToCartClick(event));

    }

    /*
     * Получение индекса для проверки
     * Функция работает
     * Последнее обновление 25.03.2019
     */
    getProductIndex(productName) {
        this.idx = -1;
        for (this.i = 0; this.i < this.cart.length; this.i++) {
            if (this.cart[this.i].productName === productName) {
                this.idx = this.i;
            }
        }
        return this.idx;
    }

    /*
     * Получение индекса для удаления элемента
     *
     */
    getProductIndexForDelete(productId) {
        this.idx = -1;
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].productId === productId) {
                this.idx = i;
            }
        }
        return this.idx;
    }

    /*
     * Обработка клика по товарам (add to cart)
     * Функция рабочая
     * 25.03.2019
     */
    handleAddToCartClick(event) {
        // сброс клика
        event.preventDefault();
        // если клик по ссылке
        if (event.target.tagName === 'A') {
            let $product = event.target.parentElement;
            let productId = $product.id;
            let productName = $product.querySelector('.feture-name').textContent;
            let productPrice = +$product.querySelector('.feture-price').textContent;
            let productImg = $product.querySelector('.feture-img').style.backgroundImage;

            let idx = this.getProductIndex(productName);
            if (idx === -1) {
                // товара нет
                this.cart.push({
                    productId: productId,
                    productName: productName,
                    productPrice: productPrice,
                    productImg: productImg,
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
    }

    /*
     * Обработка клика кнопке "удалить из корзины"
     * Функция работает правильно
     * 25.03.2019
     */
    handleRemoveToCartClick(event) {
        // сброс
        event.preventDefault();

        // обрабатываем только клики по тегу I
        if (event.target.tagName === 'I') {
            this.product = event.target.parentElement;
            this.productId = this.product.id;
            // найти индекс
            const idx = this.getProductIndexForDelete(this.productId);
            // удаление по индексу
            this.cart.splice(idx, 1);
            // рендер
            this.buildTotal(this.cart);
            this.buildBasket(this.cart);
        }
    }

    /*
     * Подсчет итого в корзине
     * Функция рабочая
     * 25.03.2019
     */
    buildTotal() {
        // сумма и количество итого
        let sum = 0;
        let count = 0;

        // подсчет суммы
        sum = this.cart.reduce((acc, c) => acc + (c.productPrice * c.quantity), 0);
        // подсчет количества
        for (let i = 0; i < this.cart.length; i++) {
            count = this.cart[i].quantity + count;
        }

        // если количество 0 - корзина пуста
        if (this.cart.length === 0) {
            this.basketTotal.textContent = 'Корзина пуста';

            this.cartBlockCheckout.style.display = 'none'; // пустая корзина - кнопок нет
            this.cartBlockGo.style.display = 'none'; // пустая корзина - кнопок нет
            this.basketTotal.style.display = 'block'; // говорим что пусто
        } else {
        // выводим инфу о том что товары есть и их сумму
            this.basketTotal.textContent = 'Сумма товаров в корзине: ' + sum + ' рублей';

            this.cartBlockCheckout.style.display = 'block'; // не пустая корзина - кнопка есть
            this.cartBlockGo.style.display = 'block'; // не пустая корзина - кнопка есть
            this.basketTotal.style.display = 'block'; // говорим что не пусто блочим
        }
        // количество итого в штуках
        this.countTotal = document.querySelector('.header-right-cart-circle-text').textContent = count;
    }

    /*
     * Отрисовка корзины
     * Функция рабочая
     * 25.03.2019
     */
    buildBasket(cart) {
        // обнуляем для перерисовки
        this.basket.innerHTML = '';

        // сделать через шаблон
        for (let i = 0; i < cart.length; i++) {
            // клонируем шаблон
            let $template = document.querySelector('.cart-block').cloneNode(true);
            // добавление изображения
            $template.querySelector('.cart-block-img').style.backgroundImage = cart[i].productImg;
            $template.querySelector('.cart-block-img').style.backgroundSize = 'contain';
            $template.querySelector('.cart-block-img').style.backgroundRepeat = 'no-repeat';
            // добавление названия
            $template.querySelector('.cart-block-name').textContent = cart[i].productName;
            // цена
            $template.querySelector('.cart-block-price-count').textContent = cart[i].quantity + ' X ' + cart[i].productPrice;
            // ссылка удалить
            $template.querySelector('.action-delete-basket').id = cart[i].productId;
            // выводим блок
            $template.style.display = 'block';
            // добавляем в конец
            basket.insertBefore($template, basket.firstChild);
        }
    }
}

/*
 * Класс собирающий у себя все запуски
 * Рабочий класс
 * 25.03.2019
 */
class Launch {

    render() {
        // запуск рендера товаров
        const items = new ItemList();
        items.fetchItems().then(() => {
            document.querySelector('.fetures-items').innerHTML = items.render();
        });

        const $searchText = document.querySelector('.header-form-input');
        const $searchButton = document.querySelector('.header-form-search');

        $searchButton.addEventListener('click', () => {
            items.filterItems($searchText.value);
            document.querySelector('.fetures-items').innerHTML = items.render();
        });

        // запуск рендера корзины
        const Basket = new Cart();
        Basket.buildTotal();

    }
}

// Запуск приложения 1 функцией
const app = new Launch();
app.render();

