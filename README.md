yarn add @mui/material @emotion/react @emotion/styled

yarn add @mui/icons-material

yarn add @material-ui/core

npm install react-material-ui-form-validator

npm install react-router-dom@5.2.0  低版本路由

yarn add @mui/x-data-grid表单库

npm install --save merge-images https://www.npmjs.com/package/merge-images
<!-- npm install --save jimp 图片拼接库
yarn add core-js

webpack不能引入低版本库问题（找不到低版本模块）：新增 node-polyfill-webpack-plugin' 修改react-scripts 中 webpackconfig文件（导入插件，resolve.fallback里面fs：false） -->

 <!-- yarn add file-saver 保存文件的库 -->
<!-- 
npm install electron --save-dev预加载库 -->

//Register line 75 不能显示两行bug
//图片存在了本地的localstorage里面，关闭服务器的时候记得清理，logout一下
//数据放在缓存里面不安全
//bug新建nft时必须输入所有的属性，没加验证，不加了先
//BUG新用户第一次新建nft时，不会把图片显示出来，后面不会