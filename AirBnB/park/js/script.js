let MOCK_DATA = [];
let Category_DATA = [];

window.onload = async () => {
  const data = await fetchData("/AirBnB/park/assets/data/data.json");
  const category = await fetchData("/AirBnB/park/assets/data/category.json");
  setState(data);
  setCategory(category);

  setList();
  setCategoryList();
};

const setCategoryHTML = (data) => {
  const { iconImage, name } = data;
  return `
  <li
    class="py-1 transition border-b-2 border-white cursor-pointer hover:border-b-2 hover:border-black">
    <div class="flex flex-col items-center">
      <img src=${iconImage} alt="category" />
      <span class="text-sm">${name}</span>
    </div>
  </li>`;
};

const setLiHTML = (data) => {
  const { image_uri, name, dist, date, price, rating } = data;
  return `<li class="room flex flex-col gap-2 transition">
              <div class="images rounded-xl overflow-hidden">
                <img src=${image_uri} alt="" />
              </div>
              <div class="room_info grid grid-cols-[70%_30%]">
                <div class="room_info_title col-start-1">
                  <span>${name}</span>
                </div>
                <div class="room_info_dist col-start-1">
                  <span>${dist}km 거리</span>
                </div>
                <div class="room_info_date col-start-1">
                  <span>${date}</span>
                </div>
                <div class="room_info_price col-start-1">
                  <span>₩ ${price}</span> <span>/박</span>
                </div>
                <div class="room_info_rating col-start-2 -row-start-2">
                  <div class="flex items-center justify-center gap-1">
                    <span class="size-2">
                      <img src="./assets/svg/start.svg" alt="" />
                    </span>
                    <span class="text-sm">${rating}</span>
                  </div>
                </div>
              </div>
            </li>`;
};

const setCategoryList = () => {
  const categoryList = document.querySelector("#categoryList");

  Category_DATA.map((data) => {
    categoryList.innerHTML += setCategoryHTML(data);
  });
};

const setList = () => {
  const cardList = document.querySelector("#cardList");
  const ul = cardList.querySelector("ul");

  MOCK_DATA.map((data) => {
    ul.innerHTML += setLiHTML(data);
  });
};

const setCategory = (data) => {
  Category_DATA = [...data];
};

const setState = (data) => {
  MOCK_DATA = [...data];
};

const fetchData = async (uri) => {
  const response = await fetch(uri);
  const data = await response.json();

  return data;
};
