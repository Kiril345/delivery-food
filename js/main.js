'use strict';

const optionSlider = {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'coverflow',
};

const swiper = new Swiper('.swiper-container', optionSlider)

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
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
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const sectionHeading = document.querySelector('#section-heading');
const restaurantCategory = document.querySelector('.category');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');
const buttonCartSvg = document.querySelector('.button-cart-svg');

let login = localStorage.getItem('kiril345'); //запись логина в браузер

const cart = [];

console.log(cart);

const getData = async function ur(url) { //запрос на сервре для получения данных

  const response = await fetch(url);
  //console.dir(response);
  //const data = await response.json();
  //console.log(data);

  if (!response.ok) {
    throw new Error(`ошибка по адресу ${url}, статус ошибки ${response.status}!`);
  }
  return await response.json();
};




const validName = function(str) {              //валидация ввода логина
  const regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/;
  return regName.test(str);
}


function toogleModalAuth() {                  //модальное окно авторизации
  modalAuth.classList.toggle('is-open');
}


function toggleModal() {                      //модальное окно корзины
  modal.classList.toggle('is-open');
}


function authorized() {

  function logOut() {    //выход 
    login = null;
    localStorage.removeItem('kiril345');  //ключ для записи на local storage
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut); //очистка события
    chekAuth();
  }
 
  

  console.log('Авторизован');
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';
  buttonOut.addEventListener('click', logOut);
}


function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {    //вход на сайт
    //console.log(event);
    event.preventDefault();
    //console.log('Логин');
    if (validName(loginInput.value)){
    login = loginInput.value;
    localStorage.setItem ('kiril345', login);
    //console.log(login);
    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth); //очистка событий
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    loginInput.style.borderColor = '';
    logInForm.reset();
    chekAuth();
    } else {
      loginInput.style.borderColor = 'red';
      loginInput.value ='';
      //console.log('введите логин и пароль');
    }
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
}


function chekAuth() {                   //проверка на авторизацию
  if (login) {
  authorized();
  } else {
  notAuthorized();
  }
}


function createCardRestaurant({ image, kitchen, name, 
  price, stars, products, time_of_delivery: timeOfDelivery }) {


  const cardRestaurant = document.createElement('a');
  cardRestaurant.classList.add('card', 'card-restaurant');
  cardRestaurant.products = products;
  console.log(products);
  cardRestaurant.info = { kitchen, name, price, stars };
  //console.log(cardRestaurant.info);

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


function createCardGood({ description, id, image, name, price }) { //формируем карту товара ресторана

  

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
 console.log(card);
 cardsMenu.insertAdjacentElement('beforeend', card); // всьавляем карту товара в меню ремторана

}


function openGoods(event) { //при клике по карте ресторана открываем его меню и скрываем список других ресторанов

  const target = event.target;
 
  console.log(target);
  if(login){ //проверка на вход на сайт при клике на карту ресторана

    const restaurant = target.closest('.card-restaurant');
    console.log('restaurant', restaurant);
    if(restaurant) {

      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      cardsMenu.textContent = ''; //очистка меню ресторана при возврате на главную страницу
      sectionHeading.textContent = ''; //очистка заголовка ресторана при возврате на главную страницу

      const { name, kitchen, price, stars } = restaurant.info;

      //console.log(restaurant.products);

      function headingRestaurant(ret) {  //добавляем заголовок на странице меню ресторана
        console.log(ret);
      
        const card = `<h2 class="section-title restaurant-title">${name}</h2>
                      <div class="card-info">
                        <div class="rating">${stars}</div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                      </div>`;
      
        sectionHeading.insertAdjacentHTML('beforeend', card);
      
      }

      headingRestaurant();

      //restaurantTitle.textContent = name;
      ////restaurantRating.textContent = stars;
      ////restaurantPrice.textContent = `От ${price} ₽`;
      //restaurantCategory.textContent = kitchen;

      
      getData(`./db/${restaurant.products}`).then(function(data) { // запрос на получение данных
        console.log(data);
        data.forEach(createCardGood);
      });
      // sectionHeading.textContent = '';
      //headingRestaurant();


    }
  } else {
    toogleModalAuth();
  }

}

function addToCart(event) { //корзина товаров

  const target = event.target;

  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = target.closest('.card');
    const id = card.id;
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    console.log(title, cost, id);

    const food = cart.find(function(item) {
      return item.id === id;
      

    })

    if (food) {
      food.count += 1;

    } else{
      cart.push({
        id, title, cost, count: 1
      });
      cartProduct();

    }

    //console.log(cart);;

  }
 
}

function renderCart() {
  
  modalBody.textContent = '';
  

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

    modalBody.insertAdjacentHTML('afterbegin', itemCart)
  });

  const totalPrice = cart.reduce(function(result, item) { 
    return result + (parseFloat(item.cost) * item.count) ; 
  }, 0)

  modalPrice.textContent = totalPrice + ' ' + '₽' ;

  cartProduct(); 

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
    cartProduct();

  }

}

function cartProduct() {      //подсвечиваем кнопку корзины если в корззине есть товар
  if (cart.length != 0) {
    buttonCartSvg.style.backgroundColor = 'red';
  } else {
      buttonCartSvg.style.backgroundColor = '';
      modalBody.textContent = 'Ваша корзина пустая';
    }
}


function init() {
  getData('./db/partners.json').then(function(data) { // запрос и получение данных
    console.log(data);
    data.forEach(createCardRestaurant); //перебирается массив данных и создаются карты ресторанов
    //data.forEach(heading);
    //console.log(createCardRestaurant);

  });

  cardsMenu.addEventListener('click', addToCart);

  cartButton.addEventListener('click', function() { 
    renderCart(); 
    toggleModal();
  }); //открыть окно корзины

  modalBody.addEventListener('click', changeCount);

  buttonClearCart.addEventListener('click', function(){ //очистка корзины
    cart.length = 0;
    renderCart();
    cartProduct(); 
  });

  close.addEventListener('click', toggleModal);      //закрыть меню корзины

  cardsRestaurants.addEventListener('click', openGoods); //открываем меню ресторана

  logo.addEventListener('click', function (){ //возврат на главную страницу путем нажатия на логотип
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');

  });

  chekAuth();

}

init();

