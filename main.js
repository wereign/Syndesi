/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => Syndesi
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var Syndesi = class extends import_obsidian.Plugin {
  async onload() {
    console.log("Loading Plugin");
    this.addCommand({
      id: "create-mindmap",
      name: "Convert Current Document to Mindmap",
      callback: () => {
        var _a, _b;
        console.log(
          `The current file is ${(_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path}`
        );
        const basePath = this.app.vault.adapter.basePath;
        const docPath = (_b = this.app.workspace.getActiveFile()) == null ? void 0 : _b.path;
        const docAbsPath = `${basePath}\\${docPath}`;
        const canvasPath = docPath == null ? void 0 : docPath.replace(".md", ".canvas");
        const canvasAbsPath = `${basePath}\\${canvasPath}`;
        console.log("Document path", docAbsPath);
        console.log("Canvas path", canvasAbsPath);
        const pythonPath = `${basePath}\\.obsidian\\plugins\\obsidian-sample-plugin\\main.py`;
        const command = `python "${pythonPath}" --src "${docAbsPath}" --dest "${canvasAbsPath}"`;
        (0, import_child_process.exec)(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
          }
          console.log(`Stdout: ${stdout}`);
        });
        console.log("End");
      }
    });
  }
  async onunload() {
    console.log("Unloading Plugin");
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3luZGVzaSBleHRlbmRzIFBsdWdpbiB7XHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJMb2FkaW5nIFBsdWdpblwiKTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJjcmVhdGUtbWluZG1hcFwiLFxyXG5cdFx0XHRuYW1lOiBcIkNvbnZlcnQgQ3VycmVudCBEb2N1bWVudCB0byBNaW5kbWFwXCIsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXHJcblx0XHRcdFx0XHRgVGhlIGN1cnJlbnQgZmlsZSBpcyAke1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoXHJcblx0XHRcdFx0XHR9YFxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IGJhc2VQYXRoID0gKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgYXMgYW55KS5iYXNlUGF0aDtcclxuXHRcdFx0XHRjb25zdCBkb2NQYXRoID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aDtcclxuXHRcdFx0XHRjb25zdCBkb2NBYnNQYXRoID0gYCR7YmFzZVBhdGh9XFxcXCR7ZG9jUGF0aH1gO1xyXG5cdFx0XHRcdGNvbnN0IGNhbnZhc1BhdGggPSBkb2NQYXRoPy5yZXBsYWNlKFwiLm1kXCIsIFwiLmNhbnZhc1wiKTtcclxuXHRcdFx0XHRjb25zdCBjYW52YXNBYnNQYXRoID0gYCR7YmFzZVBhdGh9XFxcXCR7Y2FudmFzUGF0aH1gO1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkRvY3VtZW50IHBhdGhcIiwgZG9jQWJzUGF0aCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJDYW52YXMgcGF0aFwiLCBjYW52YXNBYnNQYXRoKTtcclxuXHJcblx0XHRcdFx0Y29uc3QgcHl0aG9uUGF0aCA9YCR7YmFzZVBhdGh9XFxcXC5vYnNpZGlhblxcXFxwbHVnaW5zXFxcXG9ic2lkaWFuLXNhbXBsZS1wbHVnaW5cXFxcbWFpbi5weWA7XHJcblx0XHRcdFx0Y29uc3QgY29tbWFuZCA9IGBweXRob24gXCIke3B5dGhvblBhdGh9XCIgLS1zcmMgXCIke2RvY0Fic1BhdGh9XCIgLS1kZXN0IFwiJHtjYW52YXNBYnNQYXRofVwiYDsgLy8gUmVwbGFjZSB3aXRoIHlvdXIgY29tbWFuZFxyXG5cclxuXHRcdFx0XHRleGVjKGNvbW1hbmQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcclxuXHRcdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN0ZGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBTdGRlcnI6ICR7c3RkZXJyfWApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYFN0ZG91dDogJHtzdGRvdXR9YCk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVuZFwiKVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiVW5sb2FkaW5nIFBsdWdpblwiKTtcclxuXHR9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUF1QjtBQUN2QiwyQkFBcUI7QUFFckIsSUFBcUIsVUFBckIsY0FBcUMsdUJBQU87QUFBQSxFQUMzQyxNQUFNLFNBQVM7QUFDZCxZQUFRLElBQUksZ0JBQWdCO0FBRTVCLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNO0FBVm5CO0FBV0ksZ0JBQVE7QUFBQSxVQUNQLHdCQUNDLFVBQUssSUFBSSxVQUFVLGNBQWMsTUFBakMsbUJBQW9DO0FBQUEsUUFFdEM7QUFFQSxjQUFNLFdBQVksS0FBSyxJQUFJLE1BQU0sUUFBZ0I7QUFDakQsY0FBTSxXQUFVLFVBQUssSUFBSSxVQUFVLGNBQWMsTUFBakMsbUJBQW9DO0FBQ3BELGNBQU0sYUFBYSxHQUFHLGFBQWE7QUFDbkMsY0FBTSxhQUFhLG1DQUFTLFFBQVEsT0FBTztBQUMzQyxjQUFNLGdCQUFnQixHQUFHLGFBQWE7QUFFdEMsZ0JBQVEsSUFBSSxpQkFBaUIsVUFBVTtBQUN2QyxnQkFBUSxJQUFJLGVBQWUsYUFBYTtBQUV4QyxjQUFNLGFBQVksR0FBRztBQUNyQixjQUFNLFVBQVUsV0FBVyxzQkFBc0IsdUJBQXVCO0FBRXhFLHVDQUFLLFNBQVMsQ0FBQyxPQUFPLFFBQVEsV0FBVztBQUN4QyxjQUFJLE9BQU87QUFDVixvQkFBUSxNQUFNLFVBQVUsTUFBTSxTQUFTO0FBQ3ZDO0FBQUEsVUFDRDtBQUVBLGNBQUksUUFBUTtBQUNYLG9CQUFRLE1BQU0sV0FBVyxRQUFRO0FBQ2pDO0FBQUEsVUFDRDtBQUVBLGtCQUFRLElBQUksV0FBVyxRQUFRO0FBQUEsUUFFaEMsQ0FBQztBQUVELGdCQUFRLElBQUksS0FBSztBQUFBLE1BQ2xCO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTSxXQUFXO0FBQ2hCLFlBQVEsSUFBSSxrQkFBa0I7QUFBQSxFQUMvQjtBQUNEOyIsCiAgIm5hbWVzIjogW10KfQo=
