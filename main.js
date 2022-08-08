"use strict";

// model 

/**
 * 
 * this class represents a player.
 */
class Player {
    /**
     * this attribute represents the name of the player.
     */
    name;
    constructor(name) {
        if (typeof name !== "string") throw new Error(`name has to be of type string, provided: ${name}`)
        this.name = name;
    }
}
// controller

// util

/** returns true if a and b reference the same object (objects) or are equal (primitives), else false*/
const equals = (a, b) => a === b
/** returns true if a is not undefined, else false */
const isDefined = (a) => a !== undefined
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

    if (result === true)
        console.log(name + " passed");
    else console.error(name + " failed");
}

// test

test("A new player should have a name", () => {
    const p1 = new Player("Eileen")
    return isDefined(p1.name)
}
)

test("The player 'Eileen' should have the name 'Eileen'", () => {
    const p1 = new Player("Eileen")
    return equals(p1.name, "Eileen")
}
)

test("An error should occur if a Player is created without a name", () => {
    try {
        new Player();
    } catch (error) {
        return true;
    }
    return false;
})

// test("kindersicherung 1", () => { throw "hupsi" })
// test("kindersicherung 2", () => undefined)
// test("test ohne test fn")

