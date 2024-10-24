const CAROUSEL_SLIDE_SIZE = 500;

window.onload = async function () {
  setCategory();

  document.querySelector(".category__leftbtn").addEventListener("click", function () {
    slideCarousel(-CAROUSEL_SLIDE_SIZE);
  });
  document.querySelector(".category__rightbtn").addEventListener("click", function () {
    slideCarousel(CAROUSEL_SLIDE_SIZE);
  });
};

function setCategory() {
  fetch("data/category.json")
    .then((response) => response.json())
    .then((json) => {
      const content = document.querySelector(".category__content");
      let innerHTML = "";

      json.forEach((element, index) => {
        innerHTML += `
          <label class="text-center" for="category_${index}">
            <input id="category_${index}" type="radio" name="category" />
            <img class="category__icon" src="${element.img}" alt="" />
            <p class="text-gray">${element.name}</p>
          </label>
        `;
      });

      content.innerHTML = innerHTML;
    });
}

function slideCarousel(shift) {
  document.querySelector(".category__content").scrollBy({
    left: shift,
    behavior: "smooth",
  });
}
