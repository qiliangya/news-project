var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:'./index.js',
    output:{
        publicPath:'',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.js$/,exclude:/node_modules/,
                loader:'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", 'css')
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract("style", 'css!sass')   //开发时暂时不用
            // },
            {
                test:/\.scss$/,
                loaders:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css") //提取出来的样式放在style.css文件中
    ]

}