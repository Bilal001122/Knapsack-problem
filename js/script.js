"use strict";

const addObjectbtn = document.querySelector(".add-object-btn");
const calculateResultBtn = document.querySelector(".calculate-result-btn");
const tableBody = document.querySelector("table tbody");

const addNewObject = function () {
  const currentObjectNumber = tableBody.children.length + 1;
  const newObjectRow = document.createElement("tr");
  newObjectRow.innerHTML = `
        <td><input type="text" id="objet-${currentObjectNumber}" required value="Objet N°${currentObjectNumber}"></td>
        <td><input type="number" class="objet-${currentObjectNumber}poids"></td>
        <td><input type="number" class="objet-${currentObjectNumber}profit"></td>
        <td>
          <a href="#">
            <ion-icon class="delete-icon" name="trash-outline"></ion-icon>
          </a>
        </td>
    `;
  tableBody.appendChild(newObjectRow);
};

addObjectbtn.addEventListener("click", addNewObject);

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-icon")) {
    e.preventDefault();
    e.target.closest("tr").remove();
  }
});
