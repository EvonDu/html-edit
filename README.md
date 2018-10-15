# Html元素编辑器（组件）
## 概述
此为一个用来对Html元素进行基本编辑（拖动、拉拽）的Vue组件。

## 演示
从浏览器中访问`demo/index.html`

## 依赖
* JQuery
* VUE

### 使用方法
* 引入依赖的JQuery和Vue
* 引入build中js和css到页面中
* 在页面中添加元素
```
<html-edit @selected="selected"  @removed="removed" :elements="elements" style="height: 940px;"></html-edit>
```

### 事件列表
* selected：选择一个元素
* removed：移除一个元素
* dblselected：双击选择一个元素

### 项目Build
* 项目为使用browserify对多个JS文件进行打包，导成bundle.js
* 命令：browserify src/index.js > build/js/bundle.js
* 而样式为从src/css中拷贝到build/css的