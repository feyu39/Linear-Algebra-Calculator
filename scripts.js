import { create, all } from './node_modules/mathjs'

//for some reason importing here and then linking script doesn't work
const math = create(all);

function removeMatrixGrid(grid){
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.lastChild);
    }
}

function setMatrixDimension(){
    const matrixGrid = document.querySelector(".matrix-values");
    const rowDimension = document.getElementById("row-dimension").value;
    const columnDimension = document.getElementById("column-dimension").value;

    removeMatrixGrid(matrixGrid);

    matrixGrid.style.gridTemplateRows= `repeat(${rowDimension}, 10px)`;
    matrixGrid.style.gridTemplateColumns = `repeat(${columnDimension}, 10px)`;


    for(let rows = 0; rows < columnDimension*rowDimension; ++rows)
    {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("values");
        matrixGrid.appendChild(input);
    }
    return columnDimension;
}

function populateMatrix2dArray()
{
    const matrixInput = document.querySelectorAll(".values");
    const colDimensionInput = document.getElementById("column-dimension").value;
    let matrix = [];
    //populate matrix as a 2D array
    let querySelectorCounter = 0;
    for(let row = 0; row < (matrixInput.length/colDimensionInput); ++row)
    {
        matrix[row] = [];
        for(let col = 0; col < colDimensionInput; ++col)
        {
            matrix[row][col] = matrixInput[querySelectorCounter].value;
            querySelectorCounter++;
        }
    }
    return matrix;
}

function reduceRowEchelonFormCalc(matrix){
    let lead = 0;
    const rows = matrix.length;
    const columns = matrix[0].length;
    for (let r = 0; r < rows; r++) {
      if (columns <= lead) {
        return matrix;
      }
      let i = r;
      while (matrix[i][lead] == 0) {
        i++;
        if (rows == i) {
          i = r;
          lead++;
          if (columns == lead) {
            return matrix;
          }
        }
      }
      let temp = matrix[i];
      matrix[i] = matrix[r];
      matrix[r] = temp;
      let value = matrix[r][lead];
      for (let j = 0; j < columns; j++) {
        matrix[r][j] /= value;
      }
      for (let i = 0; i < rows; i++) {
        if (i == r) continue;
        value = matrix[i][lead];
        for (let j = 0; j < columns; j++) {
          matrix[i][j] -= value * matrix[r][j];
        }
      }
      lead++;
    }
    return matrix;
}


function showAnswer(matrix)
{
    const rowDimension = matrix.length;
    const columnDimension = matrix[0].length;
    let answerGridMain = document.querySelector(".answer");
    let answerGrid = document.createElement("div");
    answerGrid.classList.add("answer");

    removeMatrixGrid(answerGrid);

    answerGrid.style.gridTemplateColumns = `repeat(${columnDimension}, 100px)`;
    answerGrid.style.gridTemplateRows = `repeat(${rowDimension}, 100px)`;

    for(let row = 0; row < matrix.length; ++row)
    {
        for(let column = 0; column < matrix[0].length; ++column)
        {
            let display = document.createElement("div");
            display.classList.add("answer-number");
            display.textContent = matrix[row][column];
            answerGrid.appendChild(display);
        }
    }
    answerGridMain.appendChild(answerGrid);
}

function filterById(item){
    if(item.id === "L" || item.id === "U") return true;
    return false;
}

function rrefButtonClicked(){
    let matrix = populateMatrix2dArray();
    const reducedMatrix = reduceRowEchelonFormCalc(matrix);
    showAnswer(reducedMatrix);
}

function LUButtonClicked(){
    let matrix = populateMatrix2dArray();
    let lUMatrix = math.lup(matrix).filter(filterById);
    const lMatrixLabel = document.createElement("span");
    lMatrixLabel.textContent = "L: ";
    lMatrixLabel.style.fontSize = "16px";
    showAnswer(lUMatrix["L"]);
    let gridL = document.querySelector(".answer");
    gridL.appendChild(lMatrixLabel);

    const uMatrixLabel = document.createElement("span");
    uMatrixLabel.textContent = "U: ";
    uMatrixLabel.style.fontSize = "16px";
    showAnswer(lUMatrix["U"]);
    let gridU= document.querySelectorAll(".answer");
    gridU[1].appendChild(uMatrixLabel);
}

let matDimensionsButton = document.querySelector(".set-matrix-dimensions");
matDimensionsButton.addEventListener("click", setMatrixDimension);

let rrefButton = document.querySelector(".rref");
rrefButton.addEventListener("click", rrefButtonClicked);

let lUButton = document.querySelector(".lu-button");
lUButton.addEventListener("click", LUButtonClicked);