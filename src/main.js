const activeEventContainer = document.querySelector(".event-wrapper");

const activeEvents = [];

function generateActiveEventItem(key, source) {
  const inputtedKey = key === " " ? "Space" : key;
  return `
  <div class="event-item border p-2 rounded-2 text-center">
    <div class="fs-4">${inputtedKey}</div>
    <div class="badge text-bg-primary">${source}</div>
  </div>`;
}

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  activeEventContainer.classList.remove("none");
  const key = e.key === "\\" ? "Backslash" : e.key;
  const el = document.querySelectorAll(`[data-key="${key.toLocaleLowerCase()}"]`);

  if (!activeEvents.includes(e.key.toUpperCase())) {
    activeEvents.push(e.key.toUpperCase());
    activeEventContainer.innerHTML += generateActiveEventItem(e.key.toUpperCase(), "Keyboard");
  }

  if (el.length > 1) {
    el.forEach((element) => {
      element.classList.add("text-bg-light");
    });
  } else if (el.length === 1) {
    el[0].classList.add("text-bg-light");
  }
});

window.addEventListener("keyup", (e) => {
  e.preventDefault();

  const key = e.key === "\\" ? "Backslash" : e.key;
  const el = document.querySelectorAll(`[data-key="${key.toLocaleLowerCase()}"]`);

  activeEventContainer.classList.add("none");
  activeEventContainer.innerHTML = "";
  activeEvents.length = 0;

  if (el.length > 1) {
    el.forEach((element) => {
      element.classList.remove("text-bg-light");
    });
  } else if (el.length === 1) {
    el[0].classList.remove("text-bg-light");
  }
});

window.addEventListener("mousedown", (e) => {
  activeEventContainer.classList.remove("none");
  switch (e.button) {
    case 0:
      if (!activeEvents.includes("MouseLeft")) {
        activeEvents.push("MouseLeft");
        activeEventContainer.innerHTML += generateActiveEventItem("MouseLeft", "Mouse");
      }

      document.querySelector(".mouse-key.left").classList.add("text-bg-dark");
      break;
    case 1:
      if (!activeEvents.includes("MouseMiddle")) {
        activeEvents.push("MouseMiddle");
        activeEventContainer.innerHTML += generateActiveEventItem("MouseMiddle", "Mouse");
      }

      document.querySelector(".mouse-key.middle").classList.add("text-bg-dark");

      break;
    case 2:
      if (!activeEvents.includes("MouseRight")) {
        activeEvents.push("MouseRight");
        activeEventContainer.innerHTML += generateActiveEventItem("MouseRight", "Mouse");
      }

      document.querySelector(".mouse-key.right").classList.add("text-bg-dark");

      break;
    default:
  }
});

window.addEventListener("mouseup", (e) => {
  switch (e.button) {
    case 0:
      document.querySelector(".mouse-key.left").classList.remove("text-bg-dark");
      break;
    case 1:
      document.querySelector(".mouse-key.middle").classList.remove("text-bg-dark");
      break;
    case 2:
      document.querySelector(".mouse-key.right").classList.remove("text-bg-dark");
      break;
    default:
  }

  activeEventContainer.classList.add("none");
  activeEventContainer.innerHTML = "";
  activeEvents.length = 0;
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
