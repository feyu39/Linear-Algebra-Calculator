let matDimensionsButton = document.querySelector(".set-matrix-dimensions");
matDimensionsButton.addEventListener("click", setMatrixDimension);

function removeMatrixGrid(grid){
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.lastChild);
    }
}
function setMatrixDimension(){
    let matrixGrid = document.querySelector(".matrix-values");
    let rowDimension = document.getElementById("row-dimension").value;
    let columnDimension = document.getElementById("column-dimension").value;

    removeMatrixGrid(matrixGrid);

    matrixGrid.style.gridTemplateColumns = `repeat(${columnDimension}, 100px)`;
    matrixGrid.style.gridTemplateColumns = `repeat(${rowDimension}, 100px)`;

    for(let rows = 0; rows < columnDimension*rowDimension; ++rows)
    {
        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("values");
        matrixGrid.appendChild(input);
    }
    return columnDimension;
}

function populateMatrix(colDimensionInput)
{
    let matrixInput = document.querySelectorAll(".values");
    let matrix = [];
    //populate matrix as a 2D array
    let querySelectorCounter = 0;
    for(let row = 0; row < (matrixInput.length/colDimensionInput); ++row)
    {
        for(let col = 0; col < colDimensionInput; ++col)
        {
            matrix[row][col] = matrixInput[querySelectorCounter];
            querySelectorCounter++;
        }
    }
    return matrix;
}