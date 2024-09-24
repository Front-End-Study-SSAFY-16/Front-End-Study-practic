function openListMaker() {
  let listMaker = document.getElementById("list-maker");

  listMaker.setAttribute("style", "display: block");
}

function addEntity() {
  let date = document.getElementById("to-do-date").value;
  let content = document.getElementById("to-do-content").value;
  // let div = document.createElement("div");

  console.log(date, content);
}

function closeListMaker() {
  let listMaker = document.getElementById("list-maker");

  listMaker.setAttribute("style", "display: none");
}
