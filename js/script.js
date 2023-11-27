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
const acceptedObjectsContainer = document.querySelector(".accepted-objects");

const closeImage = function () {
  bigContainer.classList.remove("add-blur");
  resultText.parentElement.parentElement.classList.add("hidden");
  overlay.style.display = "none";
  document.querySelector(".result-table-container").lastChild.remove();

  if (acceptedObjectsContainer.children.length > 1) {
    while (acceptedObjectsContainer.children.length > 1) {
      acceptedObjectsContainer.removeChild(acceptedObjectsContainer.lastChild);
    }
  }
};

const findAcceptedObjects = function (
  globalArray,
  arrayOfWeights,
  numberOfObjects,
  maximumCapacity
) {
  let i = numberOfObjects;
  let j = maximumCapacity;
  let acceptedObjects = [];
  while (i > 0 && j > 0) {
    if (globalArray[i][j] === globalArray[i - 1][j]) {
      i--;
    } else {
      acceptedObjects.push(i);
      j = j - arrayOfWeights[i];
      i--;
    }
  }
  return acceptedObjects;
};

const knapsackAlgorithm = function (
  arrayOfProfits,
  arrayOfWeights,
  maximumCapacity,
  numberOfObjects
) {
  const profits = [0, ...arrayOfProfits]; // Create a new array with 0 at the beginning
  const weights = [0, ...arrayOfWeights]; // Create a new array with 0 at the beginning

  let globalArray = []; // Initialize globalArray
  for (let i = 0; i <= numberOfObjects; i++) {
    globalArray[i] = []; // Initialize sub-arrays
    for (let w = 0; w <= maximumCapacity; w++) {
      if (i === 0 || w === 0) {
        globalArray[i][w] = 0;
      } else if (weights[i] <= w) {
        globalArray[i][w] = Math.max(
          profits[i] + globalArray[i - 1][w - weights[i]],
          globalArray[i - 1][w]
        );
      } else {
        globalArray[i][w] = globalArray[i - 1][w];
      }
    }
  }
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
  const globalArray = knapsackAlgorithm(
    arrayOfProfits,
    arrayOfWeights,
    maximumCapacity,
    numberOfObjects
  );

  const acceptedObjectsTable = findAcceptedObjects(
    globalArray,
    [0, ...arrayOfWeights],
    numberOfObjects,
    maximumCapacity
  );
  console.log(acceptedObjectsTable);
  console.log(objects);
  // objects.forEach(function (object, index) {
  //   if (acceptedObjectsTable.includes(index + 1)) {
  //     const newObjectRow = document.createElement("p");
  //     newObjectRow.innerHTML = `
  //       <p>${object.objectName}</p>
  //       `;
  //     acceptedObjectsContainer.appendChild(newObjectRow);
  //   }
  // });

  acceptedObjectsTable.forEach((objectIndex) => {
    const newObjectRow = document.createElement("p");
    newObjectRow.innerHTML = `
        <p>${objects[objectIndex - 1].objectName}</p>
        `;
    acceptedObjectsContainer.appendChild(newObjectRow);
  });
  //const tableContainer = document.createElement("div");
  const resultTable = document.createElement("table");
  //tableContainer.classList.add("table-container");
  resultTable.classList.add("table-de-calcul");

  //tableContainer.appendChild(resultTable);
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
  document.querySelector(".result-table-container").appendChild(resultTable);
  resultText.textContent = globalArray[numberOfObjects][maximumCapacity];
});
