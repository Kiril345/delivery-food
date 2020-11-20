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
var modal = document.querySelector('.modal');
var close = document.querySelector('.close');
var sectionHeading = document.querySelector('#section-heading');
var restaurantCategory = document.querySelector('.category');
var modalBody = document.querySelector('.modal-body');
var modalPrice = document.querySelector('.modal-pricetag');
var buttonClearCart = document.querySelector('.clear-cart');
var buttonCartSvg = document.querySelector('.button-cart-svg');
var login = localStorage.getItem('kiril345'); //запись логина в браузер

var cart = JSON.parse(localStorage.getItem("kiril345_".concat(login))) || [];
console.log(cart);

function saveCart() {
  localStorage.setItem("kiril345_".concat(login), JSON.stringify(cart));
}

function downloadCart() {
  if (localStorage.getItem("kiril345_".concat(login))) {
    var data = JSON.parse(localStorage.getItem("kiril345_".concat(login)));
    cart.push.apply(cart, _toConsumableArray(data));
  }
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
  var regName = /^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/;
  return regName.test(str);
};

function toogleModalAuth() {
  //модальное окно авторизации
  modalAuth.classList.toggle('is-open');
}

function toggleModal() {
  //модальное окно карзины
  modal.classList.toggle('is-open');
}

function returnMain() {
  //возврат на главную страницу
  containerPromo.classList.remove('hide'); //swiper.autoplay.start()

  swiper.init();
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function authorized() {
  function logOut() {
    //выход 
    login = null;
    localStorage.removeItem('kiril345'); //ключ для записи на local storage

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut); //очистка события

    cart.length = 0;
    chekAuth();
    returnMain();
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

  function logIn(event) {
    //вход на сайт
    event.preventDefault();

    if (validName(loginInput.value)) {
      login = loginInput.value;
      localStorage.setItem('kiril345', login);
      toogleModalAuth();
      downloadCart();
      buttonAuth.removeEventListener('click', toogleModalAuth); //очистка событий

      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      loginInput.style.borderColor = '';
      logInForm.reset();
      chekAuth();
    } else {
      loginInput.style.borderColor = 'red';
      loginInput.value = '';
    }
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function chekAuth() {
  //проверка на авторизацию
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }

  cartProduct();
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
  card.insertAdjacentHTML('beforeend', "\n\t\t\t\t\t\t<img src=\"".concat(image, "\" class=\"card-image\"/>\n\t\t\t\t\t\t<div class=\"card-text\">\n\t\t\t\t\t\t\t<div class=\"card-heading\">\n\t\t\t\t\t\t\t\t<h3 class=\"card-title card-title-reg\">").concat(name, "</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-info\">\n\t\t\t\t\t\t\t\t<div class=\"ingredients\">").concat(description, "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"card-buttons\">\n\t\t\t\t\t\t\t\t<button class=\"button button-primary button-add-cart\">\n\t\t\t\t\t\t\t\t\t<span class=\"button-card-text\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n\t\t\t\t\t\t\t\t\t<span class=\"button-cart-svg\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<strong class=\"card-price card-price-bold\">").concat(price, " \u20BD</strong>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>"));
  console.log(card);
  cardsMenu.insertAdjacentElement('beforeend', card); // всьавляем карту товара в меню ремторана
}

function openGoods(event) {
  //при клике по карте ресторана открываем его меню и скрываем список других ресторанов
  var target = event.target;
  console.log(target);

  if (login) {
    //проверка на вход на сайт при клике на карту ресторана
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
      headingRestaurant(); //restaurantTitle.textContent = name;
      ////restaurantRating.textContent = stars;
      ////restaurantPrice.textContent = `От ${price} ₽`;
      //restaurantCategory.textContent = kitchen;

      getData("./db/".concat(restaurant.products)).then(function (data) {
        // запрос на получение данных
        console.log(data);
        data.forEach(createCardGood);
      }); // sectionHeading.textContent = '';
      //headingRestaurant();
    }
  } else {
    toogleModalAuth();
  }
}

function addToCart(event) {
  //корзина товаров
  console.log(event);
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
}

function renderCart() {
  modalBody.textContent = '';
  cart.forEach(function (_ref3) {
    var id = _ref3.id,
        title = _ref3.title,
        cost = _ref3.cost,
        count = _ref3.count;
    var itemCart = "<div class=\"food-row\">\n                        <span class=\"food-name\">".concat(title, "</span>\n                        <strong class=\"food-price\">").concat(cost, "</strong>\n                        <div class=\"food-counter\">\n                          <button class=\"counter-button counter-minus\" data-id=").concat(id, ">-</button>\n                          <span class=\"counter\">").concat(count, "</span>\n                          <button class=\"counter-button counter-plus\" data-id=").concat(id, ">+</button>\n                        </div>\n                      </div>");
    modalBody.insertAdjacentHTML('afterbegin', itemCart);
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
    buttonCartSvg.style.backgroundColor = 'red';
  } else {
    buttonCartSvg.style.backgroundColor = '';
    modalBody.textContent = 'Ваша корзина пустая';
  }
}

function init() {
  getData('./db/partners.json').then(function (data) {
    // запрос и получение данных
    console.log(data);
    data.forEach(createCardRestaurant); //перебирается массив данных и создаются карты ресторанов
  });
  cardsMenu.addEventListener('click', addToCart);
  cartButton.addEventListener('click', function () {
    //открыть окно корзины
    renderCart();
    toggleModal();
  });
  modalBody.addEventListener('click', changeCount);
  buttonClearCart.addEventListener('click', function () {
    //очистка корзины
    cart.length = 0;
    renderCart();
  });
  close.addEventListener('click', toggleModal); //закрыть меню корзины

  cardsRestaurants.addEventListener('click', openGoods); //открываем меню ресторана

  logo.addEventListener('click', returnMain);
  chekAuth();
  cartProduct();
}

init();
swiper.init();