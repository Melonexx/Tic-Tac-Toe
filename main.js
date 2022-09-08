"use strict";

// model

/**
 * an object of this class represents a player.
 */
class Player {
  /**
   * this attribute represents the name of the player.
   */
  name;
  constructor(name) {
    if (typeof name !== "string")
      throw new Error(`name has to be of type string, provided: ${name}`);
    this.name = name;
  }
}

/**
 * an object of this class represents a row.
 */
class Row {
  /**
   * this attribute represents the index of the row.
   */
  index;
  /**
   * this attribute represents the values of the row.
   */
  values;
  constructor(index, values) {
    if (typeof index !== "number")
      throw new Error(`index has to be of type number, provided: ${index}`);
    this.index = index;
    if (!Array.isArray(values))
      throw new Error(`values has to be of type array, provided: ${values}`);
    this.values = values;
  }
  /**
   * this method returns the value of the specified column. it throws an error, if the column doesnt exist.
   */
  getValue(columnIndex) {
    if (this.values.length <= columnIndex)
      throw new Error(`column at provided index: ${columnIndex} doesnt exist`);
    return this.values[columnIndex];
  }
  /**
   * this method set the value of the specified column. throws an error if cell doesnt exist.
   */
  setValue(columnIndex, value) {
    if (!this.hasCell(columnIndex))
      throw new Error(`no cell at provided index: ${columnIndex}`);
    this.values[columnIndex] = value;
  }
  /**
   * this method returns true if column at provided index has a value, else false. throws an error if cell doesnt exist.
   */
  hasValue(columnIndex) {
    if (!this.hasCell(columnIndex))
      throw new Error(`no cell at provided index: ${columnIndex}`);
    if (columnIndex in this.values) {
      return true;
    }
    return false;
  }
  /**
   * this methods returns true if a cell at specified column index exists and if specified column index is positive or neutral, else false.
   */
  hasCell(columnIndex) {
    if (this.values.length > columnIndex && columnIndex >= 0) {
      return true;
    }
    return false;
  }
}

class Grid {
  /**
   * this attribute represents the rows of a grid.
   */
  rows;
  /**
   * this method returns a grid with x rows and y columns.
   */
  constructor(rows, columns) {
    if (rows <= 0 || columns <= 0)
      throw new Error(
        `provided coordinates: [${rows}, ${columns}] are not valid`
      );
    this.rows = new Array(rows);
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = new Row(rowIndex, new Array(columns));
      this.rows[rowIndex] = row;
    }
  }

  /**
   * this method returns the value of a cell based on provided row and column location. it throws an error when the cell doesnt exist or if provided location is negative.
   */
  getValue(rowIndex, columnIndex) {
    if (rowIndex < 0 || columnIndex < 0)
      throw new Error(
        `provided coordinates: [${rowIndex}, ${columnIndex}] have to be neutral or positive.`
      );
    if (!this.hasCell(rowIndex, columnIndex))
      throw new Error(
        `no cell at provided coordinates: [${rowIndex}, ${columnIndex}]`
      );
    const row = this.rows[rowIndex];
    return row.getValue(columnIndex);
  }

  /**
   * this method returns a boolean. true if a cell at provided location exists, else false.it throws an error, if cell doesnt exist or if provided location is negative.
   */
  hasValue(rowIndex, columnIndex) {
    if (rowIndex < 0 || columnIndex < 0)
      throw new Error(
        `provided coordinates: [${rowIndex}, ${columnIndex}] have to be neutral or positive.`
      );
    if (!this.hasCell(rowIndex, columnIndex))
      throw new Error(
        `no cell at provided coordinates: [${rowIndex}, ${columnIndex}]`
      );
    const row = this.rows[rowIndex];
    return row.hasValue(columnIndex);
  }

  /**
   * this method sets value of cell at provided location. throws an error if row index or column index is negative.
   */
  setValue(rowIndex, columnIndex, value) {
    if (rowIndex < 0 || columnIndex < 0)
      throw new Error(
        `provided coordinates: [${rowIndex}, ${columnIndex}] have to be neutral or positive.`
      );
    if (!this.hasCell(rowIndex, columnIndex))
      throw new Error(
        `no cell at provided coordinates: [${rowIndex}, ${columnIndex}]`
      );
    const row = this.rows[rowIndex];
    return row.setValue(columnIndex, value);
  }

  /**
   * this method returns true if a cell exists, else false. throws an error if row index or column index is negative.
   */
  hasCell(rowIndex, columnIndex) {
    if (rowIndex < 0 || columnIndex < 0)
      throw new Error(
        `provided coordinates: [${rowIndex}, ${columnIndex}] have to be neutral or positive.`
      );
    if (this.rows.length > rowIndex && rowIndex >= 0) {
      const row = this.rows[rowIndex];
      return row.hasCell(columnIndex);
    }
    return false;
  }
}

class TicTacToe {
  loser;
  winner;
  playerOne;
  playerTwo;
  currentPlayer;
  grid;
  finished;

  constructor(playerOne, playerTwo) {
    this.grid = new Grid(3, 3);
    this.currentPlayer = playerOne;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.finished = false;
  }

  /**
   * this method evaluates this grid. If a player has won (full column, full row, full diagonale) or the grid is full, loser and winner are set and this game is finished , else the next player is drawn.
   */
  evaluate() {
    let won = false;
    let draw = false;

    if (
      this.grid.getValue(0, 0) === this.currentPlayer &&
      this.grid.getValue(0, 1) === this.currentPlayer &&
      this.grid.getValue(0, 2) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(1, 0) === this.currentPlayer &&
      this.grid.getValue(1, 1) === this.currentPlayer &&
      this.grid.getValue(1, 2) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(2, 0) === this.currentPlayer &&
      this.grid.getValue(2, 1) === this.currentPlayer &&
      this.grid.getValue(2, 2) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(0, 0) === this.currentPlayer &&
      this.grid.getValue(1, 0) === this.currentPlayer &&
      this.grid.getValue(2, 0) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(0, 1) === this.currentPlayer &&
      this.grid.getValue(1, 1) === this.currentPlayer &&
      this.grid.getValue(2, 1) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(0, 2) === this.currentPlayer &&
      this.grid.getValue(1, 2) === this.currentPlayer &&
      this.grid.getValue(2, 2) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(0, 0) === this.currentPlayer &&
      this.grid.getValue(1, 1) === this.currentPlayer &&
      this.grid.getValue(2, 2) === this.currentPlayer
    ) {
      won = true;
    } else if (
      this.grid.getValue(0, 2) === this.currentPlayer &&
      this.grid.getValue(1, 1) === this.currentPlayer &&
      this.grid.getValue(2, 0) === this.currentPlayer
    ) {
      won = true;
    }

    let full = true;

    for (let rowIndex = 0; rowIndex < this.grid.rows.length; rowIndex++) {
      const row = this.grid.rows[rowIndex];
      for (let colIndex = 0; colIndex < row.values.length; colIndex++) {
        full = full && this.grid.hasValue(rowIndex, colIndex);
        if (!full) break;
      }
      if (!full) break;
    }

    draw = full && !won;

    if (draw) {
      this.finished = true;
    } else if (won) {
      this.winner = this.currentPlayer;
      this.loser =
        this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
      this.finished = true;
    } else {
      this.currentPlayer =
        this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    }
  }

  /**
   * this method places the symbol of the current player at provided location. throws an error if cell doesnt exist or already has a value or when the game is finished . evaluates the new state.
   */
  placeSymbol(rowIndex, columnIndex) {
    // TODO if finished, throw error
    if (this.finished) {
      throw new Error(`game is already finished`);
    }

    if (this.grid.hasValue(rowIndex, columnIndex)) {
      throw new Error(
        `cell at provided location: [${rowIndex}, ${columnIndex}] already has a value: ${this.grid.getValue(
          rowIndex,
          columnIndex
        )} .`
      );
    }
    this.grid.setValue(rowIndex, columnIndex, this.currentPlayer);
    this.evaluate();
  }
}

// controller

/** this function updates whole view depending on provided ttt object. */
function updateView(tttObject) {
  //highlight current player

  //grid
  for (let row = 0; row < tttObject.grid.rows.length; row++) {
    for (
      let column = 0;
      column < tttObject.grid.rows[row].values.length;
      column++
    ) {
      const currentButton = document.querySelector(`#cell_${row}_${column}`);
      const currentValue = tttObject.grid.getValue(row, column);
      if (currentValue === tttObject.playerOne) {
        currentButton.innerHTML = "x";
        currentButton.disabled = true;
      } else if (currentValue === tttObject.playerTwo) {
        currentButton.innerHTML = "O";
        currentButton.disabled = true;
      } else currentButton.innerHTML = "";
    }
  }

  //result
  const result = document.querySelector("#result");

  if (tttObject.finished) {
    result.innerHTML =
      tttObject.winner != null ? `${tttObject.winner.name} has won` : "draw";
  } else {
    result.innerHTML = "";
  }
}

// listener
const starti = document.querySelector("#starti");
let currentGame;
const tttButtons = document.querySelectorAll("#grid > button");

starti.addEventListener("click", () => {
  for (const currentButton of tttButtons) {
    currentButton.disabled = false;
  }

  //new players name insertion
  updateView(
    (currentGame = new TicTacToe(
      new Player("Player One"),
      new Player("Player Two")
    ))
  );
});

for (let i = 0; i < tttButtons.length; i++) {
  const currentButton = tttButtons[i];
  currentButton.addEventListener("click", () => {
    const currentCoordinates = currentButton.id.split("_").map(Number);
    currentGame.placeSymbol(currentCoordinates[1], currentCoordinates[2]);
    updateView(currentGame);
  });
}

// util

/** returns true if a and b reference the same object (objects) or are equal (primitives), else false*/
const equals = (a, b) => a === b;
/** returns true if a is not undefined, else false */
const isDefined = (a) => a !== undefined;
/**executes the provided function and expects the function to return a boolean, logs the test result */
const test = (name, fn) => {
  let result;

  // kindersicherung 1
  try {
    result = fn();
  } catch (error) {
    console.error(`An error occured in the test '${name}'! Error = ${error}`);
    return;
  }

  // kindersicherung 2
  if (typeof result !== "boolean") {
    console.error(`Test '${name}' has to return a boolean!`);
    return;
  }

  if (result === true) console.log(name + " passed");
  else console.error(name + " failed");
};

// Player tests

test("A new player should have a name", () => {
  const p1 = new Player("Eileen");
  return isDefined(p1.name);
});

test("The player 'Eileen' should have the name 'Eileen'", () => {
  const p1 = new Player("Eileen");
  return equals(p1.name, "Eileen");
});

test("An error should occur if a Player is created without a name", () => {
  try {
    new Player();
  } catch (error) {
    return true;
  }
  return false;
});

// Row tests
test("Tested method: getValue. An error should be thrown if you try to access a column which doesnt exist.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.getValue(3);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: getValue. An error should not be thrown if you try to access a column which exists.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.getValue(2);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: getValue. Should return the first element if you provide 0.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(row.getValue(0), "x");
});

test("Tested method: setValue. Should return value at provided column index.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  row.setValue(2, "w");
  return equals("w", row.getValue(2));
});

test("Tested method: setValue. An error should be thrown when provided column index is negative.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.setValue(-1, 66);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: setValue. An error should not be thrown when provided column index is neutral or positive.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.setValue(1, 66);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: hasValue. An error should be thrown when provided column index is negative.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.hasValue(-1);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: hasValue. An error should not be thrown when provided column index is neutral or positive.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.hasValue(1);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: hasValue. Should return true if row has a value at provided column index.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(true, row.hasValue(1));
});

test("Tested method: hasValue. Should return false if row doesnt have a value at provided column index.", () => {
  const row = new Row(1, ["x", , "y", "z"]);
  return equals(false, row.hasValue(1));
});

test("Tested method: hasValue. Should return true if row has undefined at provided column index.", () => {
  const row = new Row(1, ["x", undefined, "y", "z"]);
  return equals(true, row.hasValue(1));
});

test("Tested method: hasCell. Should return true if cell exists", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(true, row.hasCell(2));
});

test("Tested method: hasCell. Should return false if cell doesnt exist.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(false, row.hasCell(3));
});

test("Tested method: hasCell. Should return false if provided column index is negative.", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(false, row.hasCell(-1));
});

// Grid tests

test("Tested method: setValue. Should return value at provided location", () => {
  const grid = new Grid(3, 4);
  grid.setValue(1, 2, 66);
  return equals(66, grid.getValue(1, 2));
});

test("Tested method: getValue. An error should be thrown if cell doesnt exist", () => {
  const grid = new Grid(3, 4);
  try {
    grid.getValue(-1, -1);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: hasCell. Should return true if cell exists", () => {
  const grid = new Grid(2, 3);
  return equals(true, grid.hasCell(1, 2));
});

test("Tested method: hasCell. Should return true if cell exists", () => {
  const grid = new Grid(2, 3);
  return equals(true, grid.hasCell(0, 0));
});

test("Tested method: hasCell. Should return false if cell doesnt exist", () => {
  const grid = new Grid(4, 5);
  return equals(false, grid.hasCell(4, 5));
});

test("Tested method: hasCell. Should return false if cell doesnt exist", () => {
  const grid = new Grid(4, 5);
  try {
    grid.hasCell(-1, -1);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: constructor. An error should be thrown if provided row or column is not positive", () => {
  try {
    new Grid(-2, 5);
  } catch (error) {
    return true;
  }
  return false;
});
test("Tested method: constructor. An error should be thrown if provided row or column is not positive", () => {
  try {
    new Grid(0, 0);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: constructor. Should return a grid with provided row and column", () => {
  const grid = new Grid(3, 3);
  if (grid.rows.length !== 3) {
    return false;
  }
  for (const row of grid.rows) {
    if (row.values.length !== 3) {
      return false;
    }
  }
  return true;
});

test("Tested method: hasValue. An error should be thrown if column index or row index is negative", () => {
  const grid = new Grid(3, 3);
  try {
    grid.hasValue(-1, 0);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: hasValue. An error should not be thrown if column index and row index is positive and cell exists", () => {
  const grid = new Grid(3, 3);
  grid.setValue(1, 0, 3);
  try {
    grid.hasValue(1, 0);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: getValue. An error should be thrown if column index or row index is negative", () => {
  const grid = new Grid(3, 3);
  try {
    grid.getValue(-1, 0);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: getValue. An error should not be thrown if column index and row index is positive and cell exists", () => {
  const grid = new Grid(3, 3);
  try {
    grid.getValue(1, 0);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: setValue. An error should be thrown if column index or row index is negative", () => {
  const grid = new Grid(3, 3);
  try {
    grid.setValue(-1, 0, 3);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: setValue. An error should not be thrown if column index and row index is positive and cell exists", () => {
  const grid = new Grid(3, 3);
  try {
    grid.setValue(1, 0, 3);
  } catch (error) {
    return false;
  }
  return true;
});

test("Tested method: hasCell. An error should be thrown if column index or row index is negative", () => {
  const grid = new Grid(3, 3);
  try {
    grid.hasCell(-1, 0);
  } catch (error) {
    return true;
  }
  return false;
});

test("Tested method: hasCell. An error should not be thrown if column index and row index is positive and cell exists", () => {
  const grid = new Grid(3, 3);
  try {
    grid.hasCell(1, 0);
  } catch (error) {
    return false;
  }
  return true;
});

//TicTacToe tests

test("a game should not be finished when created", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  return equals(false, ttt.finished);
});

test("the current player should be playerOne when a new game is created", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  return equals(playerOne, ttt.currentPlayer);
});

test("an error should be thrown if cell at provided location already has a value", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.placeSymbol(1, 1);
  try {
    ttt.placeSymbol(1, 1);
  } catch (error) {
    return true;
  }
  return false;
});

test("an error should not be thrown if cell at provided location doesnt has a value", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.placeSymbol(1, 1);
  try {
    ttt.placeSymbol(1, 2);
  } catch (error) {
    return false;
  }
  return true;
});

test("placeSymbol should place current player at provided location", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.placeSymbol(1, 1);
  return equals(playerOne, ttt.grid.getValue(1, 1));
});

test("if playerOne has a first full row, playeOne should be set as winner and playerTwo should be set a loser", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.placeSymbol(0, 0);
  ttt.placeSymbol(1, 0);
  ttt.placeSymbol(0, 2);
  ttt.placeSymbol(1, 1);
  ttt.placeSymbol(0, 1);
  return equals(ttt.winner, playerOne) && equals(ttt.loser, playerTwo);
});

test("winner and loser shouldnt be set if game is not finished", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.placeSymbol(0, 0);
  ttt.placeSymbol(1, 0);
  ttt.placeSymbol(0, 2);
  ttt.placeSymbol(1, 1);
  return equals(ttt.winner, undefined) && equals(ttt.loser, undefined);
});

test("an error should be thrown if symbol is placed while game is already finished", () => {
  const playerOne = new Player("Eileen");
  const playerTwo = new Player("Robsi");
  const ttt = new TicTacToe(playerOne, playerTwo);
  ttt.finished = true;
  try {
    ttt.placeSymbol(1, 2);
  } catch (error) {
    return true;
  }
  return false;
});

// test("kindersicherung 1", () => { throw "hupsi" })
// test("kindersicherung 2", () => undefined)
// test("test ohne test fn")
