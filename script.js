var size = 60;
var table = document.getElementById("table");

function getCell(x, y) {
  return table.rows[y].children[x].classList;
}

function nextGen() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      getCell(x, y).toggle("corpse", getCell(x, y).contains('alive'));
    }
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let neighbors = countNeighbors(x, y);
      getCell(x, y).toggle('alive', neighbors == 3 || (getCell(x, y).contains('corpse') && neighbors == 2));
    }
  }
}

function countNeighbors(x, y) {
  let sum = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx || dy) {
        let cell = getCell((x + dx + size) % size, (y + dy + size) % size);
        sum += cell.contains('corpse');
      }
    }
  }
  return sum;
}

for (let y = 0; y < size; y++) {
  let row = table.insertRow();
  for (let x = 0; x < size; x++) {
    // row.insertCell().classList.toggle('alive', Math.random() < 0.5);

    let cell = row.insertCell();
    cell.classList.toggle('alive', Math.random() < 0.5);
    cell.onmousemove = function(e) {
      if (e.buttons === 1) {
        cell.classList.add('alive');
      }
    }

  }
}

setInterval(nextGen, 100);
