export default class Model {
  constructor() {
    this.activeEvents = []; // Array to store active events
  }

  // Method to get the index of an active key/event by name
  getCurrentKeyIndex(keyName) {
    return this.activeEvents.findIndex((e) => e.name === keyName);
  }

  // Method to check if a key/event is already active
  checkExist(keyName) {
    return this.activeEvents.some((e) => e.name === keyName);
  }

  // Method to remove an active event by index
  delete(index) {
    this.activeEvents.splice(index, 1);
  }

  // Method to add a new key/event to the active events array
  push(keyName, keySource) {
    this.activeEvents.push({ name: keyName, source: keySource });
  }
}
