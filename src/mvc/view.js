export default class View {
  constructor() {
    this.activeEventContainer = document.querySelector(".event-wrapper");
  }

  // Method to clear the visual representation of the "Meta" key
  clearMeta() {
    const keyEl = document.querySelector('[data-key="meta"');
    const eventEl = document.querySelector('[data-active_event="Meta"]');

    // Remove the highlight from the "Meta" key if it has the "text-bg-light" class
    if (keyEl.classList.contains("text-bg-light")) {
      keyEl.classList.remove("text-bg-light");
    }

    // Remove the event display element if it exists
    if (eventEl) {
      eventEl.remove();
    }
  }

  // Method to remove an active event display from the UI
  deleteActiveEvent(keyName) {
    const eventEl = document.querySelector(`[data-active_event="${keyName}"]`);
    if (eventEl) eventEl.remove(); // Remove the event element if it exists

    // Add the "none" class if there are no children left in the container
    if (this.activeEventContainer.children.length === 0) {
      this.activeEventContainer.classList.add("none");
    }
  }

  // Method to add an active event display to the UI
  updateActiveEvents(keyName, keySource) {
    this.activeEventContainer.innerHTML += this.#generateActiveEventElement(
      keyName,
      keySource
    ); // Add new event to the container
    this.activeEventContainer.classList.remove("none"); // Ensure the container is visible
  }

  // Method to highlight a key or mouse button in the UI
  highlight(device, keyName, boolean) {
    if (device === "keyboard") {
      this.#highlightKeyboard(keyName, boolean); // Highlight keyboard key
      return;
    }

    this.#highlightMouse(keyName, boolean); // Highlight mouse button
  }

  // Private method to highlight a mouse button
  #highlightMouse(keyName, boolean) {
    const elements = {
      Left: document.querySelector(".mouse-key.left"),
      Middle: document.querySelector(".mouse-key.middle"),
      Right: document.querySelector(".mouse-key.right"),
    };

    // Add or remove the highlight class based on the boolean flag
    boolean
      ? elements[keyName].classList.add("text-bg-dark")
      : elements[keyName].classList.remove("text-bg-dark");
  }

  // Private method to highlight a keyboard key
  #highlightKeyboard(keyName, boolean) {
    const el = document.querySelectorAll(
      `[data-key="${keyName.toLocaleLowerCase()}"]`
    );

    // Add or remove the highlight class for all matching elements
    if (el.length > 1) {
      el.forEach((element) => {
        boolean
          ? element.classList.add("text-bg-light")
          : element.classList.remove("text-bg-light");
      });
    } else if (el.length === 1) {
      boolean
        ? el[0].classList.add("text-bg-light")
        : el[0].classList.remove("text-bg-light");
    }
  }

  // Private method to generate an HTML element for an active event
  #generateActiveEventElement(keyName, keySource) {
    return `
    <div data-active_event="${keyName}" class="event-item border p-2 rounded-2 text-center">
      <div class="fs-4">
      ${keyName === " " ? "SPACE" : keyName.toUpperCase()}
      </div>
      <div class="badge text-bg-primary">${keySource}</div>
    </div>`;
  }
}
