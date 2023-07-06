/* eslint-disable no-undef */ // Ignore this line, it just stops the editor from complaining.
// Hello!!!! Welcome to Kaboom!

// This line imports the Kaboom library.
import kaboom from "https://unpkg.com/kaboom@^3000.0.12/dist/kaboom.mjs";

// Now, let's initialize it. This line just gives you a fullscreen canvas.
kaboom();

// Load in a sprite. I've included a few in the project (check the Assets tab to the left). To get a sprite's URL, click it in the Assets view then click "Copy URL".
loadSprite("bean", "https://cdn.glitch.global/6e7edbfb-3679-4519-bb57-df3008b83592/bean.png?v=1688618964513")


// Add some text. The add() command adds what's called a "Game Object". It takes in a list (in [square brackets]) of "components", or properties of the object.
add([
    text("hello, world"),
    pos(120, 80),
]);

// Now let's add a player character. We store this one in a variable, so we can refer to it later.
const player = add([
	sprite("bean"),   // sprite() component makes it render as a sprite
	pos(120, 160),     // pos() component gives it position, also enables movement
	rotate(0),        // rotate() component gives it rotation
	anchor("center"), // anchor() component defines the pivot point (defaults to "topleft")
])