let list = [];

window.onload = function () {
  let viewForm = document.getElementById("view-type-form");

  viewForm.addEventListener("change", (event) => {
    updateList();
  });

  let listMaker = document.getElementById("list-maker");

  // animationstart 이벤트가 발생할 때 이미 요소가 display: none 상태로 숨겨져 있기 때문입니다.
  // display: none 상태에서는 요소가 DOM 트리에는 존재하지만 렌더링되지 않기 때문에,
  // 애니메이션이 시작되지 않으며 animationstart 이벤트도 발생하지 않습니다.
  // listMaker.addEventListener("animationstart", (event) => {
  //   if (event.animationName === "openModal") {
  //     listMaker.style.display = "block";
  //   }
  // });

  // 모달 애니메이션 끝난 후 display 속성을 none으로 설정
  listMaker.addEventListener("animationend", (event) => {
    if (event.animationName === "closeModal") {
      listMaker.style.display = "none";
    }
  });
};

// 등록과 수정을 동일한 DOM 요소로 해결하기 위해 매개변수에 modifyIndex를 추가함
// toggleListMaker(true);와 같이 호출 시, 등록
function toggleListMaker(open, modifyIndex) {
  let listMaker = document.getElementById("list-maker");

  if (open) {
    let title = document.querySelector("#list-maker h1");
    let date = document.getElementById("to-do-date");
    let content = document.getElementById("to-do-content");
    let addEntityBtn = document.getElementById("add-entity-button");
    let modifyEntityBtn = document.getElementById("modify-entity-button");

    if (modifyIndex === undefined) {
      title.innerText = "할 일을 등록해 주세요.";
      date.value = "";
      content.value = "";

      // 등록 버튼 활성화, 수정 버튼 비활성화
      addEntityBtn.setAttribute("style", "display: inline-block");
      modifyEntityBtn.setAttribute("style", "display: none");
    } else {
      title.innerText = "할 일을 수정해 주세요.";
      date.value = list[modifyIndex].date;
      content.value = list[modifyIndex].content;

      // 등록 버튼 비활성화, 수정 버튼 활성화
      addEntityBtn.setAttribute("style", "display: none");
      modifyEntityBtn.setAttribute("style", "display: inline-block");
      modifyEntityBtn.onclick = function () {
        modifyEntity(modifyIndex);
      };
    }

    listMaker.style.display = "block";
    listMaker.style.animation = "openModal 0.3s forwards";
  } else {
    listMaker.style.animation = "closeModal 0.3s forwards";
  }
}

function addEntity() {
  let date = document.getElementById("to-do-date").value;

  if (date.trim() === "") {
    alert("날짜를 입력하세요");
    return;
  }

  let content = document.getElementById("to-do-content").value;

  if (content.trim() === "") {
    alert("내용을 입력하세요");
    return;
  }

  let obj = {
    finished: 0,
    date: date,
    content: content,
  };

  list.push(obj);
  updateList();
  toggleListMaker(false);
}

function modifyEntity(modifyIndex) {
  let date = document.getElementById("to-do-date");
  let content = document.getElementById("to-do-content");
  let listContent = document.querySelectorAll(
    `#list-contents > div:nth-of-type(${modifyIndex + 1}) p`
  );

  listContent[1].innerText = list[modifyIndex].content = content.value;

  // 날짜를 변경했을 때만 전체 리스트 갱신
  if (list[modifyIndex].date !== date.value) {
    listContent[0].innerText = list[modifyIndex].date = date.value;
    updateList();
  }

  toggleListMaker(false);
}

function updateList() {
  let viewForm = document.getElementById("view-type-form");
  let viewType = viewForm["view-type"].value;

  list.sort((a, b) => {
    if (a.finished === b.finished) {
      return a.date < b.date ? -1 : 1;
    }

    return a.finished < b.finished ? -1 : 1;
  });

  let listContents = document.getElementById("list-contents");

  listContents.innerHTML = ``;

  loop: for (let i = 0; i < list.length; ++i) {
    switch (viewType) {
      case "view-to-do":
        if (list[i].finished) {
          continue loop;
        }

        break;
      case "view-complete":
        if (!list[i].finished) {
          continue loop;
        }

        break;
    }

    let div = document.createElement("div");

    div.classList.add("to_do_list-box");
    div.setAttribute(
      "style",
      list[i].finished ? "background-color: silver;" : "background-color: white;"
    );
    div.innerHTML = `
    <div class="list-content">
      <div class="flex-row-between-container">
        <p>${list[i].date}</p>
        <div>
          <button><img src="img/check.png" alt=""></button>
          <button><img src="img/edit-tool.png" alt=""></button>
          <button><img src="img/delete.png" alt=""></button>
        </div>
      </div>
      <p>${list[i].content}</p>
    </div>
    `;

    let buttons = div.querySelectorAll("button");

    // Complete Button
    buttons[0].addEventListener("click", function () {
      list[i].finished = 1;
      updateList();
    });

    // Edit Button
    buttons[1].addEventListener("click", function () {
      toggleListMaker(true, i);
    });

    // Remove Button
    buttons[2].addEventListener("click", function () {
      list.splice(i, 1);
      updateList();
    });

    listContents.appendChild(div);
  }

  updateListInfo();
}

function updateListInfo() {
  let viewForm = document.getElementById("view-type-form");
  let viewType = viewForm["view-type"].value;
  let listInfo = document.getElementById("list-info");

  switch (viewType) {
    case "view-to-do":
      listInfo.innerText = `${list.filter((elm) => !elm.finished).length}개의 리스트`;
      break;
    case "view-complete":
      listInfo.innerText = `${list.filter((elm) => elm.finished).length}개의 리스트`;
      break;
    default:
      listInfo.innerText = `${list.length}개의 리스트`;
      break;
  }
}
