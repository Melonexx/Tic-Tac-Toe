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

// test("kindersicherung 1", () => { throw "hupsi" })
// test("kindersicherung 2", () => undefined)
// test("test ohne test fn")
