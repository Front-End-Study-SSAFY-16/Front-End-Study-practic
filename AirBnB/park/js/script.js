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
};
