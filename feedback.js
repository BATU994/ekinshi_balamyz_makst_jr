fetch(
  "https://docs.google.com/spreadsheets/d/1xGt-xQ7k0nBMIgWryOehE-pij71AdKV4XNBAHAhOmlA/gviz/tq?tqx=out:json&gid=782328948"
)
  .then((response) => response.text())
  .then((text) => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const data = rows.map((row) => ({
      name: row.c[0]?.v || "Аноним",
      review: row.c[1]?.v || "Без отзыва",
      rating: row.c[2]?.v || 0,
      img: row.c[3]?.v || "images/carbon_user-avatar.png",
      quantity: row.c[5]?.v || 0,
    }));

    const container = document.querySelector(".reviews-container");

    data.forEach((userData) => {
      const cart = document.createElement("div");
      cart.classList.add("cart");

      cart.innerHTML = `
          <div class="profile">
            <img src="${userData.img}" alt="User" />
            <h3>${userData.name}</h3>
          </div>
          <div class="stars" style="display: flex"></div>
          <p class="text">${userData.review}</p>
        `;

      const starsContainer = cart.querySelector(".stars");
      starsContainer.innerHTML = "";

      for (let i = 0; i < 5; i++) {
        const star = document.createElement("img");
        star.classList.add("starimage");

        if (i < Math.floor(userData.quantity)) {
          star.src = "images/star_purple500.png";
        } else if (
          i === Math.floor(userData.quantity) &&
          userData.quantity % 1 !== 0
        ) {
          star.src = "images/star_half.png";
        } else {
          star.src = "images/star_outline.png";
        }

        starsContainer.appendChild(star);
      }

      container.style.marginRight = "auto";
      container.style.marginLeft = "auto";

      container.appendChild(cart);
    });
  })
  .catch((error) => console.error("Ошибка загрузки JSON:", error));

function onSubmit(token) {
  document.getElementById("demo-form").submit();
}

let container2 = document.querySelector(".container");
let button2 = document.querySelector(".action-button");
let overlay;

button2.addEventListener("click", function () {
  overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  container2.style.display = "flex";
  container2.style.position = "absolute";
  container2.style.top = "50%";
  container2.style.left = "50%";
  container2.style.transform = "translate(-50%, -50%)";
  container2.style.justifyContent = "center";
  container2.style.alignItems = "start";
  container2.style.zIndex = "1001";

  button2.style.display = "none";

  overlay.addEventListener("click", hello);
});

function hello() {
  container2.style.display = "none";
  button2.style.display = "block";

  if (overlay) {
    overlay.remove();
  }
}

document.addEventListener("DOMContentLoaded", loadReviews);

document
  .querySelector(".action-button2")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.querySelector(".input-field1").value;
    let review = document.querySelector(".input-field2").value;
    let review2 = document.querySelector(".input-field3").value;
    let img = "images/default_user.png";

    let newReview = { name, review, review2 };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    addReviewToPage(newReview);
    alert("Отзыв добавлен!");
  });

function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(addReviewToPage);
}

function addReviewToPage(userData) {
  const container = document.querySelector(".reviews-container");

  const cart = document.createElement("div");
  cart.classList.add("cart");
  cart.innerHTML = `
        <div class="profile">
            <img src="images/logo.png" alt="User" />
            <h3>${userData.name}</h3>
        </div>
        <h2 class="text">${userData.review2}</h2>
    `;

  container.appendChild(cart);
}
