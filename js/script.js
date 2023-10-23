"use strict";

const addObjectbtn = document.querySelector(".add-object-btn");
const calculateResultBtn = document.querySelector(".calculate-result-btn");
const tableBody = document.querySelector("table tbody");
const enteredCapacity = document.querySelector("#poids-max");
const resultText = document.querySelector("#result");
const bigContainer = document.querySelector(".container");

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

addObjectbtn.addEventListener("click", addNewObject);

tableBody.addEventListener("click", function (e) {
  removeObject(e);
});

calculateResultBtn.addEventListener("click", function (e) {
  e.preventDefault();
  bigContainer.classList.add("add-blur");
  resultText.parentElement.parentElement.classList.remove("hidden");
  const objects = [];
  const capacity = enteredCapacity.value;
  const objectRowsTable = [...document.querySelectorAll("table tbody tr")];
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
  console.log(objects);

  // objects.sort(
  //   (a, b) => b.objectProfit / b.objectWeight - a.objectProfit / a.objectWeight
  // );

  // const n = objects.length;
  // const dp = Array(n + 1)
  //   .fill()
  //   .map(() => Array(capacity + 1).fill(0));

  // for (let i = 1; i <= n; i++) {
  //   for (let w = 1; w <= capacity; w++) {
  //     if (objects[i - 1].objectWeight <= w) {
  //       dp[i][w] = Math.max(
  //         dp[i - 1][w],
  //         dp[i - 1][w - objects[i - 1].objectWeight] +
  //           objects[i - 1].objectProfit
  //       );
  //     } else {
  //       dp[i][w] = dp[i - 1][w];
  //     }
  //   }
  // }
  // console.log(dp[n][capacity]);
  // resultText.textContent = dp[n][capacity];
});
