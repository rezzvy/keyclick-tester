export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  // Initializes event listeners for user input
  init() {
    // Event listener for keydown events
    window.addEventListener("keydown", (e) => {
      e.preventDefault(); // Prevent default action (e.g., scrolling for arrow keys)
      const key = e.key === "\\" ? "Backslash" : e.key; // Normalize the key value

      this.#keyDownHandler(key); // Call the private method to handle keydown
    });

    // Event listener for keyup events
    window.addEventListener("keyup", (e) => {
      e.preventDefault(); // Prevent default action
      const key = e.key === "\\" ? "Backslash" : e.key; // Normalize the key value

      this.#keyUpHandler(key); // Call the private method to handle keyup
    });

    // Event listener for mouse button press events
    window.addEventListener("mousedown", (e) => {
      const map = { 0: "Left", 1: "Middle", 2: "Right" }; // Map button codes to button names

      this.#mouseDownHandler(map[e.button]); // Call the private method for mouse button press
    });

    // Event listener for mouse button release events
    window.addEventListener("mouseup", (e) => {
      const map = { 0: "Left", 1: "Middle", 2: "Right" }; // Map button codes to button names

      this.#mouseUpHandler(map[e.button]); // Call the private method for mouse button release
    });

    // Prevent the default context menu action
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  // Private method to handle keydown events
  #keyDownHandler(keyName) {
    if (!this.model.checkExist(keyName)) {
      // Check if the key is already active
      this.model.push(keyName, "Keyboard"); // Add the key to the model's active events
      this.view.highlight("keyboard", keyName, true); // Highlight the key in the view
      this.view.updateActiveEvents(keyName, "Keyboard"); // Update the event display in the view
    }
  }

  // Private method to handle keyup events
  #keyUpHandler(keyName) {
    const index = this.model.getCurrentKeyIndex(keyName); // Get the index of the key in the model
    if (index !== -1) {
      // If the key is found
      this.model.delete(index); // Remove the key from the model
      this.view.highlight("keyboard", keyName, false); // Remove the highlight from the view
      this.view.deleteActiveEvent(keyName); // Remove the active event display from the view
    }

    // Special handling for the "Meta" key
    const metaIndex = this.model.getCurrentKeyIndex("Meta");
    if (metaIndex !== -1) {
      this.model.delete(metaIndex);
      this.view.clearMeta(); // Clear the meta key display in the view
    }
  }

  // Private method to handle mousedown events
  #mouseDownHandler(keyName) {
    if (!this.model.checkExist(keyName)) {
      // Check if the mouse button is already active
      this.model.push(keyName, "Mouse"); // Add the mouse event to the model
      this.view.highlight("mouse", keyName, true); // Highlight the mouse button in the view
      this.view.updateActiveEvents(keyName, "Mouse"); // Update the event display for the mouse button
    }
  }

  // Private method to handle mouseup events
  #mouseUpHandler(keyName) {
    const index = this.model.getCurrentKeyIndex(keyName); // Get the index of the mouse event in the model

    if (index !== -1) {
      // If the mouse event is found
      this.model.delete(index); // Remove the event from the model
      this.view.highlight("mouse", keyName, false); // Remove the highlight from the view
      this.view.deleteActiveEvent(keyName); // Remove the active event display for the mouse button
    }
  }
}
