let list = [];

function toggleListMaker(open) {
  let listMaker = document.getElementById("list-maker");

  listMaker.setAttribute("style", open ? "display: block" : "display: none");
}

function addEntity() {
  let obj = {
    finished: 0,
    date: document.getElementById("to-do-date").value,
    content: document.getElementById("to-do-content").value,
  };

  list.push(obj);
  updateList();
  toggleListMaker(false);
}

function updateList() {
  list.sort((a, b) => {
    if (a.finished === b.finished) {
      return a.date < b.date ? -1 : 1;
    }

    return a.finished < b.finished ? -1 : 1;
  });

  let listContents = document.getElementById("list-contents");

  listContents.innerHTML = ``;

  for (let i = 0; i < list.length; ++i) {
    let div = document.createElement("div");

    div.classList.add("to_do_list-box");
    div.setAttribute(
      "style",
      list[i].finished ? "background-color: silver;" : "background-color: white;"
    );
    div.innerHTML = `
    <div class="list-content">
      <p>${list[i].date}</p>
      <p>${list[i].content}</p>
    </div>
    <div class="flex-row-right-container">
      <button><img src="img/CheckBoxButton.png" alt=""></button>
      <button><img src="img/CloseButton.png" alt=""></button>
    </div>
    `;

    let buttons = div.querySelectorAll("button");

    // Complete Button
    buttons[0].addEventListener("click", function () {
      list[i].finished = 1;
      updateList();
    });

    // Remove Button
    buttons[1].addEventListener("click", function () {
      list.splice(i, 1);
      updateList();
    });

    listContents.appendChild(div);
  }
}
