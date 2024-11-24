import * as app from "./function.js";

// Tracks currently active events (keyboard or mouse)
const activeEvents = [];

// Keyboard key press and release handlers
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  const key = e.key === "\\" ? "Backslash" : e.key;

  if (!activeEvents.some((event) => event.name === key)) {
    activeEvents.push({ name: key, source: "Keyboard" });
    app.highlightActiveKeyboardKey(true, key);
    app.updateActiveEventContainer(app.generateActiveEventElement(key, "Keyboard"));
  }
});

window.addEventListener("keyup", (e) => {
  e.preventDefault();
  const key = e.key === "\\" ? "Backslash" : e.key;

  // Remove the key from active events
  const index = activeEvents.findIndex((event) => event.name === key);
  if (index !== -1) {
    activeEvents.splice(index, 1); // Remove the released key
    app.highlightActiveKeyboardKey(false, key);
  }

  // Update the active event container
  app.clearActiveEventContainer();
  activeEvents.forEach((activeKey) => {
    app.updateActiveEventContainer(app.generateActiveEventElement(activeKey.name, activeKey.source));
  });
});

// Mouse button press and release handlers
window.addEventListener("mousedown", (e) => {
  const map = { 0: "Left", 1: "Middle", 2: "Right" };
  const button = map[e.button];

  if (!activeEvents.some((event) => event.name === button)) {
    activeEvents.push({ name: button, source: "Mouse" });
    app.highlightActiveMouse(true, e.button);
    app.updateActiveEventContainer(app.generateActiveEventElement(button, "Mouse"));
  }
});

window.addEventListener("mouseup", (e) => {
  const map = { 0: "Left", 1: "Middle", 2: "Right" };
  const button = map[e.button];

  // Remove the button from active events
  const index = activeEvents.findIndex((event) => event.name === button);
  if (index !== -1) {
    activeEvents.splice(index, 1); // Remove the released button
    app.highlightActiveMouse(false, e.button);
  }

  // Update the active event container
  app.clearActiveEventContainer();
  activeEvents.forEach((activeButton) => {
    app.updateActiveEventContainer(app.generateActiveEventElement(activeButton.name, activeButton.source));
  });
});

// Prevents the context menu from opening on right-click
window.addEventListener("contextmenu", (e) => e.preventDefault());
