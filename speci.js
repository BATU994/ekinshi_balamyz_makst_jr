let url;

function firstChange() {
  url =
    "https://docs.google.com/spreadsheets/d/1xGt-xQ7k0nBMIgWryOehE-pij71AdKV4XNBAHAhOmlA/gviz/tq?tqx=out:json&gid=534921891";
}

function secondChange() {
  url =
    "https://docs.google.com/spreadsheets/d/1xGt-xQ7k0nBMIgWryOehE-pij71AdKV4XNBAHAhOmlA/gviz/tq?tqx=out:json&gid=2019472149";
}
function thirdChange() {
  url =
    "https://docs.google.com/spreadsheets/d/1xGt-xQ7k0nBMIgWryOehE-pij71AdKV4XNBAHAhOmlA/gviz/tq?tqx=out:json&gid=1201755514";
}
async function loadDoctors() {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const speci_list = document.querySelector(".speci_list");
    speci_list.innerHTML = "";

    json.table.rows.forEach((row) => {
      const cells = row.c.map((cell) => cell?.v || "");
      const rowElement = document.createElement("tr");

      rowElement.innerHTML = `
                        <img src="${cells[1]}" class="image_up" alt="">
                        <div class="upper_row">
                            <p>Имя Фамилия</p>
                            <h1>${cells[0]}</h1>
                        </div>
                        <p class="stage">Стаж:${cells[2]}</p>
                        <p class="desc">${cells[3]}</p>
                        <div class="number_row" style="display:flex">
                          <img src="images/Vector (1).svg" style="width:40px"/>
                          <h3>${cells[4]}</h3>
                        </div>
                    `;
      rowElement.classList.add("rowElem");
      speci_list.appendChild(rowElement);
    });
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}
