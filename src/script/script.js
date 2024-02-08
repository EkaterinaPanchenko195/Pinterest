// LOCALSTORAGE
import {
  getTableFirst,
  getTableSecond,
  getTableThird,
  setTableFirst,
  setTableSecond,
  setTableThird,
} from "./arr.js";

// ФУНКЦИЯ ДЛЯ СОЗДАНИЯ ОБЪЕКТА В КЛЮЧЕ LOCALSTORAGE
function createItemInTable(arr, avatar, imgItem, hashtagItem, setTable, id) {
  const objTable = {
    avatar,
    imgItem,
    hashtagItem,
    id,
  };
  const newArr = [...arr, objTable];

  setTable(newArr);
}

// ГЛАВНЫЙ ЭЛЕМЕНТ
const main = document.querySelector("main");

// ПОЛУЧАЕМ URL
async function renderItems() {
  const arr = await getData();

  createItem(arr, "init");
}
renderItems();

async function getData() {
  const url = "https://65aea1f21dfbae409a753e05.mockapi.io/pinterest";
  const response = await fetch(url);
  const arr = await response.json();

  return arr;
}
getData();

// COЗДАЕМ ELEMENT
function createElement({ tag, className, text, attribute, place }) {
  const someElem = document.createElement(tag);

  className.forEach((element) => {
    someElem.classList.add(element);
  });

  if (text) {
    someElem.innerText = text;
  }

  if (attribute) {
    for (let key in attribute) {
      someElem.setAttribute(key, attribute[key]);
    }
  }

  place.append(someElem);

  return someElem;
}
const list = createElement({
  tag: "ul",
  className: ["list"],
  place: main,
});

// CОЗДАЕМ  ITEMS
let number = 0; // переменная для изменения картинки
function createItem(array, type) {
  array.forEach((obj) => {
    const containerItem = createElement({
      tag: "div",
      className: ["container-item"],
      place: list,
    });
    const item = createElement({
      tag: "li",
      className: ["item"],
      place: containerItem,
    });
    const itemImg = createElement({
      tag: "img",
      className: ["item__img"],
      attribute: {
        src: "https://avatars.dzeninfra.ru/get-zen_doc/3514290/pub_5fb306099bb3e62374293f7c_5fb306ca7eb1fe4ba023409e/scale_1200",
      },
      place: item,
    });
    const itemMenu = createElement({
      tag: "button",
      className: ["item__button"],
      text: "...",
      place: item,
    });
    const itemClose = createElement({
      tag: "button",
      className: ["item__button", "item__button_none"],
      text: "X",
      place: item,
      attribute: { id: "close" },
    });
    // окно "меню" itemMenu
    const menu = createElement({
      tag: "div",
      className: ["menu", "menu_hidden"],
      place: item,
    });
    const menuButtonAdd = createElement({
      tag: "button",
      className: ["menu__button-add"],
      text: "Добавить на доску",
      place: menu,
    });
    const menuButtonComplain = createElement({
      tag: "button",
      className: ["menu__button-complain"],
      text: "Пожаловаться",
      place: menu,
    });
    //модальное окно при нажатии "добавить на доску"
    const modalWindowAdd = createElement({
      tag: "div",
      className: ["modal-add", "modal-add_hidden"],
      place: item,
    });
    const buttonBack = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Назад",
      place: modalWindowAdd,
    });
    const buttonTableFirst = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Доска 1",
      place: modalWindowAdd,
    });
    const buttonTableSecond = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Доска 2",
      place: modalWindowAdd,
    });
    const buttonTableThird = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Доска 3",
      place: modalWindowAdd,
    });
    //модальное окно при нажатии "Пожаловаться"
    const modalWindowComplain = createElement({
      tag: "div",
      className: ["modal", "modal_hidden"],
      place: item,
    });
    const buttonComplainFirst = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Спам",
      place: modalWindowComplain,
    });
    const buttonComplainSecond = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Ложная информация",
      place: modalWindowComplain,
    });
    const buttonComplainThird = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Сцены насилия",
      place: modalWindowComplain,
    });
    const buttonBackComplain = createElement({
      tag: "button",
      className: ["nav-block__button", "modal-button"],
      text: "Назад",
      place: modalWindowComplain,
    });
    const itemDescriptionBlock = createElement({
      tag: "div",
      className: ["description-block"],
      place: containerItem,
    });
    const containerAvatar = createElement({
      tag: "div",
      className: ["description-block__avatar"],
      place: itemDescriptionBlock,
    });
    const hashtag = createElement({
      tag: "h2",
      className: ["description-block__hashtag"],
      text: "#nature",
      place: itemDescriptionBlock,
    });
    // добавляем hashtag, Avatar, Img для всех item
    const avatar = (containerAvatar.style.backgroundImage =
      type !== "newData"
        ? `url(${obj.avatar + "?random=" + number})`
        : obj.avatar);
    const imgItem = (itemImg.src =
      type !== "newData" ? obj.picture + `?random=${number}` : obj.imgItem);
    const hashtagItem = (hashtag.innerText =
      type !== "newData" ? `#${obj.hashtag}` : obj.hashtagItem);
    number++;

    //---------------------------------by click-----------------------------

    //  по нажатию на кнопку ... появляется блок с кнопками "Добавить на доску", "Пожаловаться"
    itemMenu.addEventListener("click", () => {
      menu.classList.toggle("menu_hidden");
    });
    // по нажатию на кнопку "Добавить на доску", появляется модальное окно
    menuButtonAdd.addEventListener("click", () => {
      menu.classList.toggle("menu_hidden");
      modalWindowAdd.classList.toggle("modal-add_hidden");
    });
    // по нажатию на кнопку "Пожаловаться", появляется модальное окно
    menuButtonComplain.addEventListener("click", () => {
      menu.classList.toggle("menu_hidden");
      modalWindowComplain.classList.toggle("modal_hidden");
    });

    //  по нажатию на кнопку "x", ( на доске 1 || 2 || 3) удаляется выбр. элемент списка
    itemClose.addEventListener("click", () => {
      containerItem.remove();
      const getfirst = getTableFirst();
      const getsecond = getTableSecond();
      const getthird = getTableThird();
      const tableOne = document.querySelector("#first");
      const tableTwo = document.querySelector("#second");

      const deleteItem = (getArr, setArr) => {
        const newArr = getArr.filter((obj) => obj.avatar !== avatar);
        localStorage.removeItem(getArr);
        setArr(newArr);
      };

      if (tableOne) {
        deleteItem(getfirst, setTableFirst);
      } else if (tableTwo) {
        deleteItem(getsecond, setTableSecond);
      } else {
        deleteItem(getthird, setTableThird);
      }
    });
    //ПО НАЖАТИЮ НА КНОПКУ "Доска 1"
    buttonTableFirst.addEventListener("click", () => {
      const arr = getTableFirst();
      createItemInTable(
        arr,
        avatar,
        imgItem,
        hashtagItem,
        setTableFirst,
        obj.id
      );
    });
    //ПО НАЖАТИЮ НА КНОПКУ "Доска 2"
    buttonTableSecond.addEventListener("click", () => {
      const arr = getTableSecond();
      createItemInTable(
        arr,
        avatar,
        imgItem,
        hashtagItem,
        setTableSecond,
        obj.id
      );
    });
    //ПО НАЖАТИЮ НА КНОПКУ "Доска 3"
    buttonTableThird.addEventListener("click", () => {
      const arr = getTableThird();
      createItemInTable(
        arr,
        avatar,
        imgItem,
        hashtagItem,
        setTableThird,
        obj.id
      );
    });
    //ПО НАЖАТИЮ НА КНОПКУ "НАЗАД"
    buttonBack.addEventListener("click", () => {
      modalWindowAdd.classList.toggle("modal-add_hidden");
    });
    buttonBackComplain.addEventListener("click", () => {
      modalWindowComplain.classList.toggle("modal_hidden");
    });
  });
}

// ВЫБРАТЬ ДОСКУ
const navButton = document.querySelector("#navButton");

function selectTable() {
  const navButtonBlock = createElement({
    tag: "div",
    className: ["nav-block", "nav-block_hidden"],
    place: main,
  });
  const tableFirst = createElement({
    tag: "button",
    className: ["nav-block__button"],
    text: "Доска 1",
    place: navButtonBlock,
  });
  const tableSecond = createElement({
    tag: "button",
    className: ["nav-block__button"],
    text: "Доска 2",
    place: navButtonBlock,
  });
  const tableThird = createElement({
    tag: "button",
    className: ["nav-block__button"],
    text: "Доска 3",
    place: navButtonBlock,
  });
  // пояляется кнопка x
  navButton.addEventListener("click", () => {
    navButtonBlock.classList.toggle("nav-block_hidden");
  });

  //------------------------by click-----------------------------
  tableFirst.addEventListener("click", () => {
    list.innerHTML = "";

    const title = createElement({
      tag: "h2",
      className: ["list__title"],
      text: "FIRST BOARD",
      place: list,
      attribute: { id: "first" },
    });
    const newArr = getTableFirst();

    navButtonBlock.classList.toggle("nav-block_hidden");
    createItem(newArr, "newData");
    // пояляется кнопка x
    const close = document.querySelectorAll(".item__button_none");
    close.forEach((elem) => elem.classList.toggle("item__button_close"));
  });
  tableSecond.addEventListener("click", () => {
    list.innerHTML = "";

    const title = createElement({
      tag: "h2",
      className: ["list__title"],
      text: "SECOND BOARD",
      place: list,
      attribute: { id: "second" },
    });
    const newArr = getTableSecond();

    navButtonBlock.classList.toggle("nav-block_hidden");
    createItem(newArr, "newData");
    // пояляется кнопка x
    const close = document.querySelectorAll(".item__button_none");
    close.forEach((elem) => elem.classList.toggle("item__button_close"));
  });
  tableThird.addEventListener("click", () => {
    list.innerHTML = "";

    const title = createElement({
      tag: "h2",
      className: ["list__title"],
      text: "THIRD BOARD",
      place: list,
    });
    const newArr = getTableThird();

    navButtonBlock.classList.toggle("nav-block_hidden");
    createItem(newArr, "newData");
    // пояляется кнопка x
    const close = document.querySelectorAll(".item__button_none");
    close.forEach((elem) => elem.classList.toggle("item__button_close"));
  });
}
selectTable();

// СОРТИРОВКА ФОТОГРАФИЙ ПО ХЕШТЕГУ
// const search = document.querySelector("#search");

// search.addEventListener("input", async ({ target: { value } }) => {
//   const arr = await getData();
//   const hashtagMatches = arr.filter((obj) => obj.hashtag.indexOf(value) !== -1);

//   list.innerHTML = "";
//   createItem(hashtagMatches);
// });

search.addEventListener("input", async ({ target: { value } }) => {
  const arr = document.querySelectorAll(".description-block__hashtag");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].textContent.indexOf(value) !== -1) {
      arr[i].parentNode.parentNode.style.display = "block";
    } else {
      arr[i].parentNode.parentNode.style.display = "none";
    }
  }
});
