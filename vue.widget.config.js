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
  const zipName = `${zipDir}/${packageName}@${widgetName}-${version}.zip`;
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
module.exports = (workSpace = "dist") => {
  let packageName = require("./package.json").name;
  const { version, name } = require(path.resolve("package.json"));
  let publicPath = `widgets/${packageName}-${name}-${version}`;
  return {
    publicPath: publicPath,
    devServer: {
      // 设置主机地址
      host: "localhost",
      // 设置默认端口
      port: 8080,
      proxy: {
        "/widgets": {
          target: "http://gaogangsever.cn/", // 目标服务器 host
          changeOrigin: true, // 主要是这里：默认false，是否需要改变原始主机头为目标URL
          ws: true // 是否代理websockets
        }
      }
    },
    chainWebpack: webpckConfig => {
      if (process.env.NODE_ENV === "production") {

        webpckConfig.entryPoints.clear();
        // 要打包index.js和props.js文件
        ["index", "props"].forEach(each => {
          webpckConfig.entry(`${each}`).add(`./${each}.js`);
        });
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
        //   不需要分割代码
        webpckConfig.optimization.minimize(true).splitChunks(false);

        //   拷贝说明文档和组件描述文档
        const copyData = [
          {
            from: "*.+(md)"
          },
          {
            from: "src/*"
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

        // 设置PublicPath
        // webpckConfig.plugin("public-path").use(SetPublicPathPlugin, {});

        // 压缩文件
        zipFile(webpckConfig, workSpace, packageName, name, version);
      }
    }
  };
};
