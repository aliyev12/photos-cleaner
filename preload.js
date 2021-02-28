const { ipcRenderer } = require("electron");
console.log("hi from preload");
process.once("loaded", () => {
  console.log("process.once(loaded.....");
  window.addEventListener("message", (evt) => {
    if (evt.data.type === "select-dirs") {
      console.log("if (evt.data.type === select-dirs");
      ipcRenderer.send("select-dirs");
    }
  });
});
