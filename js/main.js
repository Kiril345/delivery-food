'use strict';

const optionSlider = {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'coverflow',
};

let swiper = new Swiper('.swiper-container', optionSlider);
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const modalCart = document.querySelector('.modal-cart');
const modalDialog = document.querySelector('.modal-dialog-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const cartButton = document.querySelector('#cart-button');
const closeCart = document.querySelector('.close-cart');
const sectionHeading = document.querySelector('#section-heading');
const cartModalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');
const buttonSendCart = document.querySelector('.send-cart');
const adress = document.querySelector('.input-address');
const buttonCartSvg = document.querySelector('.button-cart-svg');
const authInfo = document.querySelector('.auth-info');
const addressInfo = document.querySelector('.adress-info');

let login = localStorage.getItem('kiril345'); //запись ключа 
const cart = JSON.parse(localStorage.getItem(`kiril345_${login}`)) || [];

function saveCart() {
  localStorage.setItem(`kiril345_${login}`, JSON.stringify(cart));
}


function downloadCart(handler) {
  if (localStorage.getItem(`kiril345_${login}`)) {
    const data = JSON.parse(localStorage.getItem(`kiril345_${login}`));
    cart.push(...data)
  }
  handler();
}


const getData = async function ur(url) { //запрос на сервре для получения данных
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }
  return await response.json();
};


const validName = function(str) {              //валидация ввода логина
  const regName = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  return regName.test(str);
}


function openModalAuth() { 
  modalAuth.classList.toggle('show-modal');             //модальное окно авторизации
  setTimeout(() => modalAuth.classList.toggle('fade'), 50);
  info();
}

function closeModelAuth() {
  setTimeout(() => modalAuth.classList.toggle('show-modal'), 400);
  setTimeout(() => modalAuth.classList.toggle('fade'), 200);
  modalAuth.classList.toggle('hide-modal-auth');
  setTimeout(() => modalAuth.classList.toggle('hide-modal-auth'), 500);
}


function openModalCart() {                      //модальное окно карзины
  modalCart.classList.toggle('show-modal');
  setTimeout(() => modalCart.classList.toggle('fade'), 50);
}

function closeModalCart() {    
  setTimeout(() => modalCart.classList.toggle('show-modal'), 400);                  //модальное окно карзины
  setTimeout(() => modalCart.classList.toggle('fade'), 200);
  modalCart.classList.toggle('hide-modal-cart');
  setTimeout(() => modalCart.classList.toggle('hide-modal-cart'), 500);
}


function returnMain(handler) {                      //возврат на главную страницу
  containerPromo.classList.remove('hide');
  swiper = new Swiper('.swiper-container', optionSlider);
  swiper.init();
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
  swiper.changeDirection ( 'horisontal' );
  handler();
}


function logIn() {   
  loginInput.classList.remove('error-input');//вход на сайт
  if (validName(loginInput.value)){
  login = loginInput.value;
  localStorage.setItem ('kiril345', login);
  logInForm.reset();
  closeModelAuth();
  downloadCart(chekAuth);
  } else {
    loginInput.classList.add('error-input');
    logInForm.reset();
  }
}


function logOut() { //выход 
  login = null;
  localStorage.removeItem('kiril345');   //ключ для записи на local storage
  buttonAuth.classList.remove('hidden');
  userName.classList.remove('visible');
  buttonOut.classList.remove('visible');
  cartButton.classList.remove('visible');
  buttonOut.removeEventListener('click', logOut); //очистка события
  cart.length = 0;
  returnMain(chekAuth);
}


function chekAuth(){
  if(login != null) {
    userName.textContent = login.substring(0, login.indexOf('@'));
    userName.classList.add('visible');
    buttonAuth.classList.add('hidden');
    buttonOut.classList.add('visible');
    cartButton.classList.add('visible');
    cartProduct();
  } else {
    userName.classList.remove('visible');
    buttonAuth.classList.remove('hidden');
    buttonOut.classList.remove('visible');
    cartButton.classList.remove('visible');
  }
}


function createCardRestaurant({ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }) {
  const cardRestaurant = document.createElement('a');
  cardRestaurant.classList.add('card', 'card-restaurant');
  cardRestaurant.products = products;
  cardRestaurant.info = { kitchen, name, price, stars };
  const card = `
    <img src=${image} alt=${name} class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  `;
  cardRestaurant.insertAdjacentHTML('beforeend', card);
  cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurant);
}


function createCardGood({ description, id, image, name, price }) { //формируем карты товара ресторана
    const card = document.createElement('div');
    card.className = 'card';
    card.id = id;
    card.insertAdjacentHTML( 'beforeend', `
						<img src="${image}" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price card-price-bold">${price} ₽</strong>
							</div>
            </div>`);
 cardsMenu.insertAdjacentElement('beforeend', card); // вставляем карту товара в меню реcторана
}


function openGoods(event) { //при клике по карте ресторана открываем его меню и скрываем список других ресторанов
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if(restaurant) {
    document.documentElement.scrollTop = 0;
    swiper.destroy(false, true);
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    cardsMenu.textContent = '';                //очистка меню ресторана при возврате на главную страницу
    sectionHeading.textContent = '';           //очистка заголовка ресторана при возврате на главную страницу
    const { name, kitchen, price, stars } = restaurant.info;
    function headingRestaurant() {  //добавляем заголовок на странице меню ресторана
      const card = `
      <h2 class="section-title restaurant-title">${name}</h2>              
      <div class="card-info">
        <div class="rating">${stars}</div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>`;
      sectionHeading.insertAdjacentHTML('beforeend', card);
    }
    headingRestaurant();
    getData(`./db/${restaurant.products}`).then(function(data) { // запрос на получение данных
    data.forEach(createCardGood);
    });
  }
}


function addToCart(event) {        //корзина товаров
  if(login != null){
  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');
  if (buttonAddToCart) {
    const card = target.closest('.card');
    const id = card.id;
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const food = cart.find(item => item.id === id);
    if (food) {
      food.count += 1;
    } else{
      cart.push({
        id, title, cost, count: 1
      });
      cartProduct();
    }
    saveCart();
  }
  } else {
    openModalAuth();
  }
}


function renderCart() {
  cartModalBody.textContent = '';
  cart.forEach(function({ id, title, cost, count }){
    const itemCart = `<div class="food-row">
                        <span class="food-name">${title}</span>
                        <strong class="food-price">${cost}</strong>
                        <div class="food-counter">
                          <button class="counter-button counter-minus" data-id=${id}>-</button>
                          <span class="counter">${count}</span>
                          <button class="counter-button counter-plus" data-id=${id}>+</button>
                        </div>
                      </div>`;
    cartModalBody.insertAdjacentHTML('afterbegin', itemCart)
  });

  const totalPrice = cart.reduce(function(result, item) { 
    return result + (parseFloat(item.cost) * item.count) ; 
  }, 0);
  modalPrice.textContent = totalPrice + ' ' + '₽' ;
  cartProduct(); 
  saveCart();
}


function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')){
    const food = cart.find(function(item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) cart.splice(cart.indexOf(food), 1);
    };
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }
}

function sendCart() {  //отправляем заказ из корзины
  if(cart.length !=0) {
  cart.length = 0;
  renderCart();
    if(adress.value != 0) {
      cartModalBody.textContent = 'Ваша закза будет отправлен по адрессу' + ' ' + adress.value + ','+' '+'в течении 5 минут с вами свяжется оператор';
    adress.value = '';
    } else {
      cartModalBody.textContent = 'Ваша закза отправлен в обработку, в течении 5 минут с вами свяжется оператор';
    }
  } else {
    cartProduct();
  }
  
}


function cartProduct() {  //подсвечиваем кнопку корзины если в корззине есть товар
  if (cart.length != 0) {
    buttonCartSvg.classList.add('active-icon');
  } else {
      buttonCartSvg.classList.remove('active-icon');
      cartModalBody.textContent = 'Ваша корзина пустая';
    }
}

function info() {
  authInfo.classList.remove('prompt-show');
  authInfo.textContent = '';
  let authInfoHTML = '';
  setTimeout(() => {
    authInfoHTML = `<div class="prompt">для входа введите любой email и нажмите "войти"</div>`;
    authInfo.insertAdjacentHTML('beforeend', authInfoHTML);
  }, 800);
  setTimeout(() => authInfo.classList.add('prompt-show'), 1000);
}


function init(handler) {
  handler();

  getData('./db/partners.json').then(function(data) { // запрос и получение данных
    data.forEach(createCardRestaurant);               //перебирается массив данных и создаются карты ресторанов
  });

  buttonAuth.addEventListener('click',  event => {
    event.preventDefault();
    openModalAuth();
  });
  
  logInForm.addEventListener('submit',  event => {
    event.preventDefault();
    logIn();
  });
  
  closeAuth.addEventListener('click', event => {
    event.preventDefault();
    closeModelAuth();
  });
  
  buttonOut.addEventListener('click', event => { 
    event.preventDefault();
    logOut()
  });

  cardsMenu.addEventListener('click', event => {
    event.preventDefault();
    addToCart(event);
  });
  
  cartButton.addEventListener('click', event => {  //открыть окно корзины
    event.preventDefault();
    renderCart(); 
    openModalCart();
  });           

  cartModalBody.addEventListener('click', event => {  //измеить количество товаров в корзине
    event.preventDefault();
    changeCount(event);
  });

  buttonClearCart.addEventListener('click', function(){ //очистка корзины
    cart.length = 0;
    renderCart();
  });

  buttonSendCart.addEventListener('click', event => { //оформить заказ
    event.preventDefault();
    sendCart();
  });

  closeCart.addEventListener('click', event => { //закрыть меню корзины
    event.preventDefault();
    closeModalCart();
  });          

  cardsRestaurants.addEventListener('click',  event => { //открываем меню ресторана
    event.preventDefault();
    openGoods(event);
  });
  
  logo.addEventListener('click', event => { //возврат на главную страницу
    event.preventDefault();
    returnMain(chekAuth);
    cartProduct();
  });

  loginInput.addEventListener('click', event => {
    event.preventDefault();
    authInfo.classList.remove('prompt-show');
  });

}

document.addEventListener('DOMContentLoaded', () => {
  init(chekAuth);
  swiper.init();
});

