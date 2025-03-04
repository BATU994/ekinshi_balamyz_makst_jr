const ul = document.querySelector(".nav_list");

let ul_op = false;
function navShow() {
  if (!ul_op) {
    ul.style.display = "flex";
    ul_op = true;
  } else {
    ul.style.display = "none";
    ul_op = false;
  }
}
