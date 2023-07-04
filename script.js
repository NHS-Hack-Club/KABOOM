/* eslint-disable no-undef */ // Ignore this line, it just stops the editor from complaining.
// Hello!!!! Welcome to Kaboom!

// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// Now, let's initialize it. This line just gives you a fullscreen canvas.
kaboom();

// Add some text. The add() command takes in arguments in a list. You can think of each of these as a "property" of the object.

add([
    text("hello, world"),
    pos(120, 80),
]);

