const fs = require("fs-extra");
const path = require("path");
const fileManager = require("filemanager-webpack-plugin");

/**
 * 移除不必要的html等plugin
 * @param {*} webpackConfig
 */
function removeHTMLPlugin(webpackConfig) {
  ["html", "preload", "prefetch", "optimize-css"].forEach(each => {
    webpackConfig.plugins.delete(each);
  });
}

/**
 * 压缩组件到zip目录
 * @param {*} webpackConfig
 * @param {*} workSpace
 * @param {*} packageName
 * @param {*} widgetName
 * @param {*} version
 */
function zipFile(webpackConfig, workSpace, packageName, widgetName, version) {
  const zipDir = path.resolve(workSpace, ".zip");
  fs.ensureDirSync(zipDir);
  const zipName = `${zipDir}/${packageName}-${widgetName}-${version}.zip`;
  webpackConfig.plugin("zip").use(fileManager, [
    {
      onEnd: {
        archive: [
          {
            source: "dist",
            destination: zipName
          }
        ]
      }
    }
  ]);
}
module.exports = (dirName = ".", workSpace = "dist") => ({
  chainWebpack: webpckConfig => {
    if (process.env.NODE_ENV === "production") {
      let packageName = require("./package.json").name;
      const { version, name } = require(path.resolve("package.json"));
      const metData = require(path.resolve(dirName, `${name}.json`));
      webpckConfig.entryPoints.clear();
      webpckConfig.entry("./index.js").add(metData.main);
      //   文件名称不需要chunk
      webpckConfig.output
        .filename("[name].js")
        .chunkFilename("chunks/[name].js")
        .libraryTarget("umd")
        .library();
      webpckConfig.externals([
        {
          vue: "vue"
        },
        ...(webpckConfig.get("externals") || [])
      ]);

      removeHTMLPlugin(webpckConfig);
      //   不需要分割代码和压缩
      webpckConfig.optimization.minimize(false).splitChunks(false);

      //   拷贝说明文档和组件描述文档
      const copyData = [
        {
          from: "*.+(md)"
        },
        {
          from: `${name}.json`
        }
      ];
      if (webpckConfig.plugins.has("copy")) {
        webpckConfig.plugin("copy").tap(args => {
          args[0] = copyData;
          return args;
        });
      } else {
        webpckConfig
          .plugin("copy")
          .use(require("copy-webpack-plugin"), [copyData]);
      }

      zipFile(webpckConfig, workSpace, packageName, name, version);
    }
  }
});
