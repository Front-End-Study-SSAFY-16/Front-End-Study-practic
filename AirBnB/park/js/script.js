import fetchData from './fetchData.js';
import { setRoomList, setList } from './roomList.js';
import {
  setCategoryList,
  setCategory,
  handleRightButton,
  handleLeftButton,
} from './category.js';

window.onload = async () => {
  // Room Data 가져오기
  const data = await fetchData('/AirBnB/park/assets/data/data.json');
  setRoomList(data);
  setList();

  // category Data 가져오기
  const category = await fetchData('/AirBnB/park/assets/data/category.json');
  setCategory(category);
  setCategoryList();

  // category left Button
  document
    .querySelector('#category_left_button')
    .addEventListener('click', handleLeftButton);

  // category right Button
  document
    .querySelector('#category_right_button')
    .addEventListener('click', handleRightButton);

  // infinite scroll

  const cardList = document.querySelector('#cardList ul');

  const infiniteScroll = (entries, observer) => {
    entries.forEach(async (entry) => {
      // isIntersecting : 교차상태일 때
      if (entry.isIntersecting) {
        // Room Data 가져오기
        const data = await fetchData('/AirBnB/park/assets/data/data.json');
        setRoomList(data);
        setList();

        // observer 지우고 새로 등록
        observer.unobserve(entry.target);

        const newElement = cardList.lastElementChild;
        console.log(newElement);

        newElement && observer.observe(newElement);
      }
    });
  };

  const observer = new IntersectionObserver(infiniteScroll, {
    root: null,
    rootMargin: '0px',
    threshold: 0.75,
  });

  observer.observe(cardList.lastElementChild);
};
