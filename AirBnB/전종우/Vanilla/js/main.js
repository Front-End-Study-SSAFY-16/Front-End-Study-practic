const CAROUSEL_SLIDE_SIZE = 500;

window.onload = async function () {
  loadCategory();
  loadContent();

  document.querySelector(".category__leftbtn").addEventListener("click", function () {
    slideCarousel(-CAROUSEL_SLIDE_SIZE);
  });
  document.querySelector(".category__rightbtn").addEventListener("click", function () {
    slideCarousel(CAROUSEL_SLIDE_SIZE);
  });
};

function loadCategory() {
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

function loadContent() {
  fetch("data/place.json")
    .then((response) => response.json())
    .then((json) => {
      const content = document.querySelector(".place");
      let innerHTML = "";

      for (let i = 0; i < json.count; ++i) {
        const randNum = parseInt(2 * Math.random());

        innerHTML += `
        <div class="place__card">
          <div class="place__card__info fs-14 text-center align-middle shadow">게스트 선호</div>
          <img src="img/place/place (${i + 1}).jpg" alt="" />
          <svg
            class="place__card__likeBtn"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="
              display: block;
              fill: rgba(0, 0, 0, 0.5);
              height: 24px;
              width: 24px;
              stroke: var(--linaria-theme_palette-icon-primary-inverse);
              stroke-width: 2;
              overflow: visible;"
          >
            <path
              d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
            ></path>
          </svg>
          <div>
            <div class="flex flex-jc-sb flex-ai-c">
              <p>${json.content.title}</p>
              <p>★ ${json.content.rating}</p>
            </div>
            <p class="text-gray">${json.content.category}</p>
            <p class="text-gray">${json.content.period}</p>
            <p><b>₩${json.content.price.toLocaleString()}</b> /박</p>
          </div>
        </div>
        `;
      }

      content.innerHTML = innerHTML;
    });
}

function slideCarousel(shift) {
  const content = document.querySelector(".category__content");

  content.scrollBy({
    left: shift,
    behavior: "smooth",
  });

  console.log(content.scrollLeft);
}
