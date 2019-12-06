# ui-designer

预览地址:http://gaogangsever.cn/

此工程为页面构建器的基础组件。核心编辑器，有兴趣请联系:gaogangwork@qq.com

页面构建器所支持功能：

- [x] 托拉拽布局：栅格布局，层叠层叠嵌套 :fire:
- [ ] 组件可扩展性：自定义组件，开发 API
- [ ] 事件编排：组件之间联动
- [ ] 数据下钻
- [ ] 图层展示
- [x] 页面元数据化 :fire:

## 目录

- [一、如何编写自定义组件](#一如何编写自定义组件)
- [二、 组件目录说明](#二-组件目录说明)

## 一、如何编写自定义组件

```bash
# 1. clone当前项目
git clone https://github.com/MrGaoGang/ui-designer

# 2. 安装依赖

yarn

# 3. 创建组件，输入组件名称即可

vue invoke vue-cli-plugin-uibuilder-widget

# 4. 安装组件依赖

yarn

# 5. 打包组件

yarn build

# 如果执行打包指定组件，请使用yarn build --scope 组件名称

# 6. 上传组件即可
```

## 二、 组件目录说明

```
├─.DS_Store
├─.gitignore
├─README.md ------------- // 组件说明文档
├─babel.config.js
├─index.js -------------- // 【必需，不可更改】组件内容导出
├─package.json
├─pie-chart-prop.vue ---- // 自定义组件属性面板
├─pie-chart.vue --------- // 组件内容vue文件
├─props.js -------------- // 【必需，不可更改】组件属性面板导出
├─src ------------------- // 【注意】如果你有其他资源文件，一定要放在此目录下
│ ├─.DS_Store
│ └─assets
│   ├─.DS_Store
│   └─go_back.png
└─vue.config.js
```

**注意事项：**

1. `index.js`，组件内容，**不可更改**，编辑器将会读取此文件;
2. `props.js`，组件属性面板配置，**不可更改**，编辑器将会读取此文件;
3. `src`, 是资源目录，如果你有其他自定义代码/资源文件，请放在此目录

## 三、 组件开发说明

组件属性面板值和组件传递的规则如下:
![](./docs/images/props.png)

**属性面板：**

属性面板所有的配置，建议存放在一个`Object`中，当属性面板数据存在变动时，使用`this.$emit('input',obj)`的方式给组件。

```js
//示例
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$emit("input", val);
      }
    }
  },

```

**组件获取属性面板的配置：**

组件获取到属性面板的配置，将会是属性面板导出对象的展开值。比如属性面板导出`{chartName:'折线图'}`,那么在组件中的 props 将会是

```js
props: {
  chartName: String;
}
```
