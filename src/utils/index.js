const path = require("path");
const os = require("os");

export function getRelativePath(item) {
  return path.join(os.homedir(), item);
}
