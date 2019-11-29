const yarnRootDir = require("find-yarn-workspace-root");
const path = require("path");
const workSpace = yarnRootDir(__dirname);
const rootVueConfig = require(path.resolve(workSpace, "vue.config.js"));
module.exports = rootVueConfig(__dirname, workSpace);