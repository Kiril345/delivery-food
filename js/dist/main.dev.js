'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var optionSlider = {
  sliderPerView: 1,
  loop: true,
  autoplay: true,
  effect: 'coverflow'
};
var swiper = new Swiper('.swiper-container', optionSlider);
var buttonAuth = document.querySelector('.button-auth');
var modalAuth = document.querySelector('.modal-auth');
var modalCart = document.querySelector('.modal-cart');
var modalDialog = document.querySelector('.modal-dialog-auth');
var closeAuth = document.querySelector('.close-auth');
var logInForm = document.querySelector('#logInForm');
var loginInput = document.querySelector('#login');
var userName = document.querySelector('.user-name');
var buttonOut = document.querySelector('.button-out');
var cardsRestaurants = document.querySelector('.cards-restaurants');
var containerPromo = document.querySelector('.container-promo');
var restaurants = document.querySelector('.restaurants');
var menu = document.querySelector('.menu');
var logo = document.querySelector('.logo');
var cardsMenu = document.querySelector('.cards-menu');
var cartButton = document.querySelector('#cart-button');
var closeCart = document.querySelector('.close-cart');
var sectionHeading = document.querySelector('#section-heading');
var cartModalBody = document.querySelector('.modal-body');
var modalPrice = document.querySelector('.modal-pricetag');
var buttonClearCart = document.querySelector('.clear-cart');
var buttonCartSvg = document.querySelector('.button-cart-svg');
var login = localStorage.getItem('kiril345'); //запись ключа 

var cart = JSON.parse(localStorage.getItem("kiril345_".concat(login))) || [];

function saveCart() {
  localStorage.setItem("kiril345_".concat(login), JSON.stringify(cart));
}

function downloadCart(handler) {
  if (localStorage.getItem("kiril345_".concat(login))) {
    var data = JSON.parse(localStorage.getItem("kiril345_".concat(login)));
    cart.push.apply(cart, _toConsumableArray(data));
  }

  handler();
}

var getData = function ur(url) {
  var response;
  return regeneratorRuntime.async(function ur$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 5;
            break;
          }

          throw new Error("\u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 ".concat(url, ", \u0441\u0442\u0430\u0442\u0443\u0441 \u043E\u0448\u0438\u0431\u043A\u0438 ").concat(response.status, "!"));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          return _context.abrupt("return", _context.sent);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

var validName = function validName(str) {
  //валидация ввода логина
  var regName = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  return regName.test(str);
};

function toogleModalAuth() {
  modalAuth.classList.toggle('show-modal'); //модальное окно авторизации

  setTimeout(function () {
    return modalAuth.classList.toggle('fade');
  }, 100);
}

function closeModelAuth() {
  setTimeout(function () {
    return modalAuth.classList.toggle('show-modal');
  }, 300);
  modalAuth.classList.toggle('fade');
  modalAuth.classList.toggle('hide-modal-auth');
  setTimeout(function () {
    return modalAuth.classList.toggle('hide-modal-auth');
  }, 300);
}

function toggleModal() {
  //модальное окно карзины
  modalCart.classList.toggle('show-modal');
  setTimeout(function () {
    return modalCart.classList.toggle('fade');
  }, 100);
}

function closeModalCart() {
  //модальное окно карзины
  modalCart.classList.toggle('fade');
  setTimeout(function () {
    return modalCart.classList.toggle('show-modal');
  }, 200);
  modalCart.classList.toggle('hide-modal-cart');
  setTimeout(function () {
    return modalCart.classList.toggle('hide-modal-cart');
  }, 200);
}

function returnMain(handler) {
  //возврат на главную страницу
  containerPromo.classList.remove('hide');
  swiper.init();
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
  handler();
}

function logIn() {
  loginInput.classList.remove('error-input'); //вход на сайт

  if (validName(loginInput.value)) {
    login = loginInput.value;
    localStorage.setItem('kiril345', login);
    logInForm.reset();
    closeModelAuth();
    downloadCart(chekAuth);
  } else {
    loginInput.classList.add('error-input');
    logInForm.reset();
  }
}

function logOut() {
  //выход 
  login = null;
  localStorage.removeItem('kiril345'); //ключ для записи на local storage

  buttonAuth.classList.remove('hidden');
  userName.classList.remove('visible');
  buttonOut.classList.remove('visible');
  cartButton.classList.remove('visible');
  buttonOut.removeEventListener('click', logOut); //очистка события

  cart.length = 0;
  returnMain(chekAuth);
}

function chekAuth() {
  if (login != null) {
    console.log('Авторизован');
    userName.textContent = login.substring(0, login.indexOf('@'));
    userName.classList.add('visible');
    buttonAuth.classList.add('hidden');
    buttonOut.classList.add('visible');
    cartButton.classList.add('visible');
    cartProduct();
  } else {
    console.log('Не авторизован');
    userName.classList.remove('visible');
    buttonAuth.classList.remove('hidden');
    buttonOut.classList.remove('visible');
    cartButton.classList.remove('visible');
  }
}

function createCardRestaurant(_ref) {
  var image = _ref.image,
      kitchen = _ref.kitchen,
      name = _ref.name,
      price = _ref.price,
      stars = _ref.stars,
      products = _ref.products,
      timeOfDelivery = _ref.time_of_delivery;
  var cardRestaurant = document.createElement('a');
  cardRestaurant.classList.add('card', 'card-restaurant');
  cardRestaurant.products = products;
  console.log(products);
  cardRestaurant.info = {
    kitchen: kitchen,
    name: name,
    price: price,
    stars: stars
  };
  var card = "\n    <img src=".concat(image, " alt=").concat(name, " class=\"card-image\"/>\n    <div class=\"card-text\">\n      <div class=\"card-heading\">\n        <h3 class=\"card-title\">").concat(name, "</h3>\n        <span class=\"card-tag tag\">").concat(timeOfDelivery, " \u043C\u0438\u043D</span>\n      </div>\n      <div class=\"card-info\">\n        <div class=\"rating\">\n          ").concat(stars, "\n        </div>\n        <div class=\"price\">\u041E\u0442 ").concat(price, " \u20BD</div>\n        <div class=\"category\">").concat(kitchen, "</div>\n      </div>\n    </div>\n  ");
  cardRestaurant.insertAdjacentHTML('beforeend', card);
  cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurant);
}

function createCardGood(_ref2) {
  var description = _ref2.description,
      id = _ref2.id,
      image = _ref2.image,
      name = _ref2.name,
      price = _ref2.price;
  //формируем карту товара ресторана
  var card = document.createElement('div');
  card.className = 'card';
  card.id = id;
  card.insertAdjacentHTML('beforeend', "\n\t\t\t\t\t\t<img src=\"".concat(image, "\" class=\"card-image\"/>\n\t\t\t\t\t\t<div class=\"card-text\">\n\t\t\t\t\t\t\t<div class=\"card-heading\">\n\t\t\t\t\t\t\t\t<h3 class=\"card-title card-title-reg\">").concat(name, "</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t\t\t<div class=\"ingredients\">").concat(description, "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-buttons\">\n\t\t\t\t\t\t\t\t<button class=\"button button-primary button-add-cart\">\n\t\t\t\t\t\t\t\t\t<span class=\"button-card-text\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n\t\t\t\t\t\t\t\t\t<span class=\"button-cart-svg\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<strong class=\"card-price card-price-bold\">").concat(price, " \u20BD</strong>\n\t\t\t\t\t\t\t</div>\n            </div>"));
  console.log(card);
  cardsMenu.insertAdjacentElement('beforeend', card); // всьавляем карту товара в меню ремторана
}

function openGoods(event) {
  //при клике по карте ресторана открываем его меню и скрываем список других ресторанов
  var target = event.target;
  console.log(target);
  var restaurant = target.closest('.card-restaurant');
  console.log('restaurant', restaurant);

  if (restaurant) {
    var headingRestaurant = function headingRestaurant() {
      //добавляем заголовок на странице меню ресторана
      var card = "<h2 class=\"section-title restaurant-title\">".concat(name, "</h2>\n                      <div class=\"card-info\">\n                        <div class=\"rating\">").concat(stars, "</div>\n                        <div class=\"price\">\u041E\u0442 ").concat(price, " \u20BD</div>\n                        <div class=\"category\">").concat(kitchen, "</div>\n                      </div>");
      sectionHeading.insertAdjacentHTML('beforeend', card);
    };

    containerPromo.classList.add('hide');
    swiper.destroy(false); //отключение свайпера

    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    cardsMenu.textContent = ''; //очистка меню ресторана при возврате на главную страницу

    sectionHeading.textContent = ''; //очистка заголовка ресторана при возврате на главную страницу

    var _restaurant$info = restaurant.info,
        name = _restaurant$info.name,
        kitchen = _restaurant$info.kitchen,
        price = _restaurant$info.price,
        stars = _restaurant$info.stars;
    headingRestaurant();
    getData("./db/".concat(restaurant.products)).then(function (data) {
      // запрос на получение данных
      console.log(data);
      data.forEach(createCardGood);
    });
  }
}

function addToCart(event) {
  //корзина товаров
  if (login != null) {
    var target = event.target;
    var buttonAddToCart = target.closest('.button-add-cart');

    if (buttonAddToCart) {
      var card = target.closest('.card');
      var id = card.id;
      var title = card.querySelector('.card-title-reg').textContent;
      var cost = card.querySelector('.card-price').textContent;
      console.log(title, cost, id);
      var food = cart.find(function (item) {
        return item.id === id;
      });

      if (food) {
        food.count += 1;
      } else {
        cart.push({
          id: id,
          title: title,
          cost: cost,
          count: 1
        });
        cartProduct();
      }

      saveCart();
    }
  } else {
    toogleModalAuth();
  }
}

function renderCart() {
  cartModalBody.textContent = '';
  cart.forEach(function (_ref3) {
    var id = _ref3.id,
        title = _ref3.title,
        cost = _ref3.cost,
        count = _ref3.count;
    var itemCart = "<div class=\"food-row\">\n                        <span class=\"food-name\">".concat(title, "</span>\n                        <strong class=\"food-price\">").concat(cost, "</strong>\n                        <div class=\"food-counter\">\n                          <button class=\"counter-button counter-minus\" data-id=").concat(id, ">-</button>\n                          <span class=\"counter\">").concat(count, "</span>\n                          <button class=\"counter-button counter-plus\" data-id=").concat(id, ">+</button>\n                        </div>\n                      </div>");
    cartModalBody.insertAdjacentHTML('afterbegin', itemCart);
  });
  var totalPrice = cart.reduce(function (result, item) {
    return result + parseFloat(item.cost) * item.count;
  }, 0);
  modalPrice.textContent = totalPrice + ' ' + '₽';
  cartProduct();
  saveCart();
}

function changeCount(event) {
  var target = event.target;

  if (target.classList.contains('counter-button')) {
    var food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });

    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) cart.splice(cart.indexOf(food), 1);
    }

    ;
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }
}

function cartProduct() {
  //подсвечиваем кнопку корзины если в корззине есть товар
  if (cart.length != 0) {
    buttonCartSvg.classList.add('active-icon');
  } else {
    buttonCartSvg.classList.remove('active-icon');
    cartModalBody.textContent = 'Ваша корзина пустая';
  }
}

function init(handler) {
  handler();
  buttonAuth.addEventListener('click', function (event) {
    event.preventDefault();
    toogleModalAuth();
  });
  logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    logIn();
  });
  closeAuth.addEventListener('click', function (event) {
    event.preventDefault();
    closeModelAuth();
  });
  buttonOut.addEventListener('click', function (event) {
    event.preventDefault();
    logOut();
  });
  cardsMenu.addEventListener('click', function (event) {
    event.preventDefault();
    addToCart(event);
  });
  getData('./db/partners.json').then(function (data) {
    // запрос и получение данных
    console.log(data);
    data.forEach(createCardRestaurant); //перебирается массив данных и создаются карты ресторанов
  });
  cartButton.addEventListener('click', function (event) {
    //открыть окно корзины
    event.preventDefault();
    renderCart();
    toggleModal();
  });
  cartModalBody.addEventListener('click', function (event) {
    //измеить количество товаров в корзине
    event.preventDefault();
    changeCount(event);
  });
  buttonClearCart.addEventListener('click', function () {
    //очистка корзины
    cart.length = 0;
    renderCart();
  });
  closeCart.addEventListener('click', function (event) {
    //закрыть меню корзины
    event.preventDefault();
    closeModalCart();
  });
  cardsRestaurants.addEventListener('click', function (event) {
    //открываем меню ресторана
    event.preventDefault();
    openGoods(event);
  });
  logo.addEventListener('click', function (event) {
    //возврат на главную страницу
    event.preventDefault();
    returnMain(chekAuth);
    cartProduct();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init(chekAuth);
  swiper.init();
});