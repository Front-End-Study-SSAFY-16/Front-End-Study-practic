let MOCK_DATA = [];

window.onload = async () => {
  const data = await fetchData();
  setState(data);
  setList();
};

const setLiHTML = (data) => {
  const { image_uri, name, dist, date, price, rating } = data;
  return `<li class="room flex flex-col gap-2">
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

const setList = () => {
  const cardList = document.querySelector('#cardList');
  const ul = cardList.querySelector('ul');

  MOCK_DATA.map((data) => {
    ul.innerHTML += setLiHTML(data);
  });
};

const setState = (data) => {
  MOCK_DATA = [...data];

  setList();
};

const fetchData = async () => {
  const response = await fetch('/AirBnB/park/assets/data/data.json');
  const data = await response.json();

  return data;
};
