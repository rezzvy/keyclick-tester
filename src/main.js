import * as app from "./function.js";

// Tracks currently active events (keyboard or mouse)
const activeEvents = [];

// Keyboard key press and release handlers
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  const key = e.key === "\\" ? "Backslash" : e.key;

  if (!activeEvents.includes(key)) {
    activeEvents.push(key);
    app.highlightActiveKeyboardKey(true, key);
    app.updateActiveEventContainer(app.generateActiveEventElement(key, "Keyboard"));
  }
});

window.addEventListener("keyup", (e) => {
  e.preventDefault();
  const key = e.key === "\\" ? "Backslash" : e.key;

  app.highlightActiveKeyboardKey(false, key);
  app.clearActiveEventContainer();
  activeEvents.length = 0;
});

// Mouse button press and release handlers
window.addEventListener("mousedown", (e) => {
  const map = { 0: "Left", 1: "Middle", 2: "Right" };

  if (!activeEvents.includes(map[e.button])) {
    activeEvents.push(map[e.button]);
    app.highlightActiveMouse(true, e.button);
    app.updateActiveEventContainer(app.generateActiveEventElement(map[e.button], "Mouse"));
  }
});

window.addEventListener("mouseup", (e) => {
  app.highlightActiveMouse(false, e.button);
  app.clearActiveEventContainer();
  activeEvents.length = 0;
});

// Prevents the context menu from opening on right-click
window.addEventListener("contextmenu", (e) => e.preventDefault());
