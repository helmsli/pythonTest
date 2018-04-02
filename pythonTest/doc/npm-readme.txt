������ĿĿ¼
���룺npm init

�� npm ��װ Webpack
npm install webpack -g
��ʱ Webpack �Ѿ���װ����ȫ�ֻ����£�ͨ�����ǻὫ Webpack ��װ����Ŀ�������У������Ϳ���ʹ����Ŀ���ذ汾�� Webpack��
# ������ĿĿ¼
# ��װ webpack ����:
$ npm install webpack --save-dev

�� npm ��װ ģ�������(loader)
$ npm install style-loader css-loader -g

�� style-loader css-loader ��װ����Ŀ��������
# ������ĿĿ¼
# ��װ style-loader css-loader ����:
$ npm install style-loader css-loader --save-dev

�� npm ��װ html-webpack-plugin
# ������ĿĿ¼
# ��װ html-webpack-plugin ����:
$ npm install html-webpack-plugin --save-dev

6.�� npm ��װ webpack-dev-server
# ������ĿĿ¼
# ��װ webpack-dev-server ����:
$ npm install webpack-dev-server --save-dev
7.�� npm ��װ babel-cli: babelת����
$ npm install babel-cli -g
# ������ĿĿ¼
# ��װ babel-cli ����:
$ npm install babel-cli --save-dev
8.�� npm ��װ babel-preset-es2015
$ npm install babel-preset-es2015 -g
# ������ĿĿ¼
# ��װ babel-preset-es2015 ����:
$ npm install babel-preset-es2015 --save-dev
9.�� npm ��װ babel-loader
# ������ĿĿ¼
# ��װ babel-loader ����:
$ npm install babel-loader --save-dev
10.�� npm ��װ react
$ npm install react react-dom babel-preset-react -g
# ������ĿĿ¼
# ��װ react ����:
$ npm install react react-dom babel-preset-react --save-dev
11.�� npm ��װ react-hot-loader
# ������ĿĿ¼
# ��װ react-hot-loader ����:
$ npm install react-hot-loader --save-dev
11.����Ŀ�ļ�Ŀ¼�´���.babelrc�ļ�
{"preset":["es2015"],"react"}
12.����Ŀ�ļ�Ŀ¼�´���example�ļ���,���������洴�������ļ�
index.jsx��
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

13.����Ŀ�ļ�Ŀ¼�½���webpack.config.js
var htmlWebpackPlugin = require('html-webpack-plugin'); //ʹ���Զ�����html�ļ���һ�����
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
14.webpack���
# ������ĿĿ¼
$ webpack
��ʱ��ĿĿ¼�½�������example_build�ļ��У����ڲ�Ҳ����build.js �� index.html�ļ���

15.webpack-dev-server �ȼ���
# ������ĿĿ¼
$ webpack-dev-server --hot --inline
��ʱ��������д�http://localhost:8080/�����ῴ��example_build��index.htmlҳ�����ݡ�
��ʱ���޸�example�µ�index.jsx���ݣ�ҳ�潫���Զ�ˢ�£��޸�exampleg�µ�app.js���ݣ�ҳ�潫��ֲ�ˢ�¡�