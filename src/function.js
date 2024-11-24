// Utility functions to manage the active event container and UI updates

const activeEventContainer = document.querySelector(".event-wrapper");

// Hides the active event container and clears its content
export function clearActiveEventContainer() {
  activeEventContainer.classList.add("none");
  activeEventContainer.innerHTML = "";
}

// Displays an item in the active event container
export function updateActiveEventContainer(item) {
  activeEventContainer.classList.remove("none");
  activeEventContainer.innerHTML += item;
}

// Toggles the highlight for a specific keyboard key
export function highlightActiveKeyboardKey(boolean, key) {
  const el = document.querySelectorAll(`[data-key="${key.toLocaleLowerCase()}"]`);

  if (el.length > 1) {
    // Handle multiple matching elements
    el.forEach((element) => {
      boolean ? element.classList.add("text-bg-light") : element.classList.remove("text-bg-light");
    });
  } else if (el.length === 1) {
    // Handle a single matching element
    boolean ? el[0].classList.add("text-bg-light") : el[0].classList.remove("text-bg-light");
  }
}

// Toggles the highlight for a specific mouse button
export function highlightActiveMouse(boolean, num) {
  const elements = {
    0: document.querySelector(".mouse-key.left"),
    1: document.querySelector(".mouse-key.middle"),
    2: document.querySelector(".mouse-key.right"),
  };

  boolean ? elements[num].classList.add("text-bg-dark") : elements[num].classList.remove("text-bg-dark");
}

// Creates a formatted HTML string for an active event
export function generateActiveEventElement(key, source) {
  return `
    <div class="event-item border p-2 rounded-2 text-center">
      <div class="fs-4">${key === " " ? "SPACE" : key.toUpperCase()}</div>
      <div class="badge text-bg-primary">${source}</div>
    </div>`;
}
