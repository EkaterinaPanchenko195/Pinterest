const main = document.querySelector("main");
function createElement({ tag, className, text, attribute, place }) {
    const someElem = document.createElement(tag);
    className.forEach((element)=>{
        someElem.classList.add(element);
    });
    if (text) someElem.innerText = text;
    if (attribute) for(let key in attribute)someElem.setAttribute(key, attribute[key]);
    place.append(someElem);
    return someElem;
}
const list = createElement({
    tag: "ul",
    className: [
        "list"
    ],
    place: main
});
const containerItem = createElement({
    tag: "div",
    className: [
        "container-item"
    ],
    place: list
});
const item = createElement({
    tag: "li",
    className: [
        "item"
    ],
    place: containerItem
});
const itemImg = createElement({
    tag: "img",
    className: [
        "item__img"
    ],
    attribute: {
        src: "https://avatars.dzeninfra.ru/get-zen_doc/3514290/pub_5fb306099bb3e62374293f7c_5fb306ca7eb1fe4ba023409e/scale_1200"
    },
    place: item
});
const itemMenu = createElement({
    tag: "button",
    className: [
        "container-item__button"
    ],
    text: "...",
    place: containerItem
});
const itemDescriptionBlock = createElement({
    tag: "div",
    className: [
        "description-block"
    ],
    place: containerItem
});
const containerAvatar = createElement({
    tag: "div",
    className: [
        "description-block__avatar"
    ],
    place: itemDescriptionBlock
});
const hashtag = createElement({
    tag: "h2",
    className: [
        "description-block__hashtag"
    ],
    text: "#nature",
    place: itemDescriptionBlock
});

//# sourceMappingURL=index.d4a8b14f.js.map
