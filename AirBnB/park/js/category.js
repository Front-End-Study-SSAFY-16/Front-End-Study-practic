let Category_DATA = [];

const setCategoryList = () => {
  const categoryList = document.querySelector('#categoryList');

  Category_DATA.map((data) => {
    categoryList.innerHTML += setCategoryHTML(data);
  });
};

const setCategory = (data) => {
  Category_DATA = [...data];
};

const setCategoryHTML = (data) => {
  const { iconImage, name } = data;
  return `
              <label
                  aria-hidden="false"
                  class="min-w-16 py-1 flex-shrink-0 transition border-b-2 border-white cursor-pointer hover:border-b-2 hover:border-black"
                >
                  <input type="radio" name="category" class="hidden" />
                  <div class="flex flex-col items-center">
                    <img
                      class="size-6"
                      src="${iconImage}"
                      alt="category"
                    />
                    <span class="text-sm">${name}</span>
                  </div>
                </label>`;
};

const handleRightButton = () => {
  const categoryList = document.querySelector('#categoryList');

  const curScroll = categoryList.scrollLeft; // 현재 스크롤의 위치
  const scrollMax = categoryList.scrollWidth; // 스크롤의 최대 크기
  const offsetWidth = categoryList.offsetWidth; // 현재 box의 너비

  // scroll이 끝까지 다 되었는지 확인하기
  // scrollMax - offsetWidth == Math.round(curScroll)
  categoryList.scrollTo({
    left:
      scrollMax - offsetWidth == Math.round(curScroll) ? 0 : curScroll + 200,
    behavior: 'smooth',
  });
};

const handleLeftButton = () => {
  const categoryList = document.querySelector('#categoryList');
  const curScroll = categoryList.scrollLeft;

  categoryList.scrollTo({
    left: curScroll - 200,
    behavior: 'smooth',
  });
};

export {
  setCategoryList,
  setCategory,
  setCategoryHTML,
  handleRightButton,
  handleLeftButton,
};
