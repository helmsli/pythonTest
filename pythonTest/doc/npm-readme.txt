进入项目目录
输入：npm init

用 npm 安装 Webpack
npm install webpack -g
此时 Webpack 已经安装到了全局环境下，通常我们会将 Webpack 安装到项目的依赖中，这样就可以使用项目本地版本的 Webpack。
# 进入项目目录
# 安装 webpack 依赖:
$ npm install webpack --save-dev

用 npm 安装 模块加载器(loader)
$ npm install style-loader css-loader -g

将 style-loader css-loader 安装到项目的依赖中
# 进入项目目录
# 安装 style-loader css-loader 依赖:
$ npm install style-loader css-loader --save-dev

用 npm 安装 html-webpack-plugin
# 进入项目目录
# 安装 html-webpack-plugin 依赖:
$ npm install html-webpack-plugin --save-dev

6.用 npm 安装 webpack-dev-server
# 进入项目目录
# 安装 webpack-dev-server 依赖:
$ npm install webpack-dev-server --save-dev
7.用 npm 安装 babel-cli: babel转码器
$ npm install babel-cli -g
# 进入项目目录
# 安装 babel-cli 依赖:
$ npm install babel-cli --save-dev
8.用 npm 安装 babel-preset-es2015
$ npm install babel-preset-es2015 -g
# 进入项目目录
# 安装 babel-preset-es2015 依赖:
$ npm install babel-preset-es2015 --save-dev
9.用 npm 安装 babel-loader
# 进入项目目录
# 安装 babel-loader 依赖:
$ npm install babel-loader --save-dev
10.用 npm 安装 react
$ npm install react react-dom babel-preset-react -g
# 进入项目目录
# 安装 react 依赖:
$ npm install react react-dom babel-preset-react --save-dev
11.用 npm 安装 react-hot-loader
# 进入项目目录
# 安装 react-hot-loader 依赖:
$ npm install react-hot-loader --save-dev
11.在项目文件目录下创建.babelrc文件
{"preset":["es2015"],"react"}
12.在项目文件目录下创建example文件夹,并在其下面创建如下文件
index.jsx：
var React = require("react");
var ReactDOM = require("react-dom");

import App from './app.jsx';

var Hello = React.createClass({
        render:function(){
                return <div>1234<App/></div>
        }
});

var div1 = document.createElement("div");

document.body.appendChild(div1);

ReactDOM.render(<Hello />,div1);
app.jsx:
var React = require("react");
var ReactDOM = require("react-dom");

export default class App extends React.Component{
        render(){
                return <h1>hello reactJs</h1>
        }
}

13.在项目文件目录下建立webpack.config.js
var htmlWebpackPlugin = require('html-webpack-plugin'); //使用自动生成html文件的一个插件
var path = require('path');

module.exports = {
    entry: './example/index.jsx',
    output:{
        path:'./example_build/',
        filename:'build.js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loaders:['style','css'],
                exclude:'node_modules'
            },
            {
                test:/\.jsx?$/,
                loaders:['react-hot','babel?presets[]=es2015&presets[]=react'],
                exclude:"/node_modules/",
                include:path.resolve(__dirname,"example")
            }
        ]    },
    resolve:{
        extensions:['','.js','.css','.jsx']    },
    devServer: {
            hot:true,
            inline:true
    },

    plugins:[
        new htmlWebpackPlugin({
            title:"First react app"
        })
    ]}
14.webpack打包
# 进入项目目录
$ webpack
此时项目目录下将会生成example_build文件夹，其内部也生成build.js 和 index.html文件，

15.webpack-dev-server 热加载
# 进入项目目录
$ webpack-dev-server --hot --inline
此时在浏览器中打开http://localhost:8080/，将会看到example_build下index.html页面内容。
这时，修改example下的index.jsx内容，页面将会自动刷新；修改exampleg下的app.js内容，页面将会局部刷新。