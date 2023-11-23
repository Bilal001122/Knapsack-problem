"use strict";

const addObjectbtn = document.querySelector(".add-object-btn");
const calculateResultBtn = document.querySelector(".calculate-result-btn");
const tableBody = document.querySelector("table tbody");
const enteredCapacity = document.querySelector("#poids-max");
const resultText = document.querySelector("#result");
const bigContainer = document.querySelector(".container");
const closeImageButton = document.querySelector(".close-img");
const overlay = document.querySelector(".overlay");
const resultContainer = document.querySelector(".result-container");

const closeImage = function () {
  bigContainer.classList.remove("add-blur");
  resultText.parentElement.parentElement.classList.add("hidden");
  overlay.style.display = "none";
  document.querySelector(".result-table-container").lastChild.remove();
};

const knapsackAlgorithm = function (
  arrayOfProfits,
  arrayOfWeights,
  maximumCapacity,
  numberOfObjects
) {
  let globalArray = []; // Initialise globalArray
  arrayOfProfits.unshift(0); // Ajoute un 0 au début du tableau des profits
  arrayOfWeights.unshift(0); // Ajoute un 0 au début du tableau des poids
  for (let i = 0; i <= numberOfObjects; i++) {
    globalArray[i] = []; // Initialise les sous-tableaux
    for (let w = 0; w <= maximumCapacity; w++) {
      if (i === 0 || w === 0) {
        globalArray[i][w] = 0;
      } else if (arrayOfWeights[i] <= w) {
        console.log(arrayOfWeights[i], w);
        globalArray[i][w] = Math.max(
          arrayOfProfits[i] + globalArray[i - 1][w - arrayOfWeights[i]],
          globalArray[i - 1][w]
        );
      } else {
        globalArray[i][w] = globalArray[i - 1][w];
      }
    }
  }
  console.log(arrayOfProfits);
  console.log(arrayOfWeights);
  return globalArray;
};

const addNewObject = function () {
  const currentObjectNumber = tableBody.children.length + 1;
  const newObjectRow = document.createElement("tr");
  newObjectRow.innerHTML = `
        <td><input type="text" id="objet-name" required value="Objet N°${currentObjectNumber}"></td>
        <td><input type="number" class="objet-poids"></td>
        <td><input type="number" class="objet-profit"></td>
        <td>
          <a href="#">
            <ion-icon class="delete-icon" name="trash-outline"></ion-icon>
          </a>
        </td>
    `;
  tableBody.appendChild(newObjectRow);
};

const removeObject = function (e) {
  if (e.target.classList.contains("delete-icon")) {
    e.preventDefault();
    e.target.closest("tr").remove();
  }
};

tableBody.addEventListener("click", function (e) {
  removeObject(e);
});

closeImageButton.addEventListener("click", closeImage);

addObjectbtn.addEventListener("click", addNewObject);

calculateResultBtn.addEventListener("click", function (e) {
  bigContainer.classList.add("add-blur");
  overlay.style.display = "block";
  resultText.parentElement.parentElement.classList.remove("hidden");

  const objects = [];
  const maximumCapacity = Number(enteredCapacity.value);
  const objectRowsTable = [
    ...document.querySelectorAll(".table-principale tbody tr"),
  ];
  objectRowsTable.forEach((objectRow) => {
    const objectName = objectRow.querySelector("input[type=text]").value;
    const objectWeight = Number(
      objectRow.querySelector("input[type=number].objet-poids").value
    );
    const objectProfit = Number(
      objectRow.querySelector("input[type=number].objet-profit").value
    );
    objects.push({ objectName, objectWeight, objectProfit });
  });

  const arrayOfProfits = objects.map((object) => object.objectProfit);
  const arrayOfWeights = objects.map((object) => object.objectWeight);
  const numberOfObjects = arrayOfProfits.length;
  console.log(arrayOfProfits, arrayOfWeights, maximumCapacity, numberOfObjects);
  const globalArray = knapsackAlgorithm(
    arrayOfWeights,
    arrayOfProfits,
    maximumCapacity,
    numberOfObjects
  );
  const tableContainer = document.createElement("div");
  const resultTable = document.createElement("table");
  tableContainer.classList.add("table-container");
  resultTable.classList.add("table-de-calcul");

  tableContainer.appendChild(resultTable);
  resultTable.appendChild(document.createElement("tbody"));
  globalArray.forEach((row) => {
    const newRow = document.createElement("tr");
    row.forEach((element) => {
      const td = document.createElement("td");
      td.textContent = element;
      td.style.color = "black";
      newRow.appendChild(td);
    });
    resultTable.firstChild.appendChild(newRow);
  });
  document.querySelector(".result-table-container").appendChild(tableContainer);
  resultText.textContent = globalArray[numberOfObjects][maximumCapacity];
});
