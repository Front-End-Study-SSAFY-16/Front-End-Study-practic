window.onload = async function () {
  setCategory();

  const leftBtn = document.querySelector(".category__leftbtn");
  const rightBtn = document.querySelector(".category__rightbtn");

  leftBtn.addEventListener("click", slideLeft);
  rightBtn.addEventListener("click", slideRight);
};

function setCategory() {
  fetch("data/category.json")
    .then((response) => response.json())
    .then((json) => {
      const content = document.querySelector(".category__content");

      json.forEach((element, index) => {
        content.innerHTML += `
          <label class="text-center" for="category_${index}">
            <input id="category_${index}" type="radio" name="category" />
            <img class="category__icon" src="${element.img}" alt="" />
            <p class="text-gray">${element.name}</p>
          </label>
        `;
      });
    });
}

function slideLeft() {
  const content = document.querySelector(".category__content");
  const targetLeft = Math.max(content.scrollLeft - 200, 0);

  let timer = setInterval(function () {
    content.scrollLeft -= 5;

    if (content.scrollLeft <= targetLeft) {
      clearInterval(timer);
      console.log("타이머 종료됨");
    }
  }, 5);
}

function slideRight() {
  const content = document.querySelector(".category__content");
  const targetRight = Math.min(content.scrollLeft + 200, content.scrollWidth - content.clientWidth);

  let timer = setInterval(function () {
    content.scrollLeft += 5;

    if (content.scrollLeft >= targetRight) {
      clearInterval(timer);
      console.log("타이머 종료됨");
    }
  }, 5);
}
