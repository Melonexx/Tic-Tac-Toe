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
}

class Grid {
  /**
   * this method returns a grid with x rows and y columns.
   */
  constructor(row, column) {}

  /**
   * this method returns the value of a cell based on provided row and column location. it throws an error when the cell doesnt exist.
   */
  getValue(row, column) {}

  /**
   * this method returns a boolean. true if a cell at provided location exists, else false.
   */
  hasValue(row, column) {}

  /**
   * this method sets value of cell at provided location.
   */
  setValue(row, column, value) {}
}
// controller

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
test("An error should be thrown if you try to access a column which doesnt exist", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.getValue(3);
  } catch (error) {
    return true;
  }
  return false;
});

test("An error should not be thrown if you try to access a column which exists", () => {
  const row = new Row(1, ["x", "y", "z"]);
  try {
    row.getValue(2);
  } catch (error) {
    return false;
  }
  return true;
});

test("should return the first element if you provide 0", () => {
  const row = new Row(1, ["x", "y", "z"]);
  return equals(row.getValue(0), "x");
});

// Grid tests

test("should return value at provided location", () => {
  const grid = new Grid(3, 4);
  grid.setValue(1, 2, 66);
  return equals(66, grid.getValue(1, 2));
});

test("an error should be thrown if cell doesnt exist", () => {
  const grid = new Grid(3, 4);
  try {
    grid.getValue(-1, -1);
  } catch (error) {
    return true;
  }
  return false;
});

test("should return true if cell exists", () => {
  const grid = new Grid(2, 3);
  return equals(true, grid.hasValue(1, 2));
});

test("should return true if cell exists", () => {
  const grid = new Grid(2, 3);
  return equals(true, grid.hasValue(0, 0));
});

test("should return false if cell doesnt exist", () => {
  const grid = new Grid(4, 5);
  return equals(false, grid.hasValue(4, 5));
});

test("should return false if cell doesnt exist", () => {
  const grid = new Grid(4, 5);
  return equals(false, grid.hasValue(-1, -1));
});

// test("kindersicherung 1", () => { throw "hupsi" })
// test("kindersicherung 2", () => undefined)
// test("test ohne test fn")
