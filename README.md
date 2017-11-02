# news-project
这是一个完整的新闻发布平台，使用了react做前台界面，vue做后台界面，elementUI做美化，后台使用nodeJS + mongoDB


1. npm start --启动前台页面

2. npm run dev --启动后台页面

3. supervisor ./bin/www  --启动后台服务器

4. 遇到的问题有
    a) 第一次提交git的时候，出现提交错误，原因是index.lock文件已存在，此时需要进入仓库的.git下输入del index.lock命令，注:在Linux环境下删不掉(不知为何),在cmd中删除即可

    b) 当想使用自定义样式时，需要安装，并在webpack.config.js文件中配置
        css-loader  style-loader  sass-loader  node-sass

        注：在开发时 暂时不要用ExtractTextPlugin进行打包,否则sass解析报错
    
    c) 在请求后台数据时，使用fetch方法，默认是GET请求模式，如果要更换要使用第二个参数

        fetch('http://localhost:3000/cate/list',{method:'POST',cache:'reload'})
        .then(msg=>{
            return msg.json();
        })
        .then(data=>{
            console.log(data);
        })
    d) 一个细节错误，导致浪费了两个小时，在请求数据的时候，要return一个函数
        return 
        dispatch=>{...}
        由于想把代码书写得漂亮点，但这样结果完全不同，因为在javascript中一行语句会自动给你加上分号结果变成了
        return ;
        dispatch=>{...}
        这样就永远不会执行dispatch了

    e) 在执行路由跳转时，由于要传递ID值，于是点击按钮时，执行一个方法
        如果是直接 {this.function} 此时的this指向已发生改变，指向当前所在的元素this
        需要用 ev=>{this.function(ev)} 用ES6箭头函数，this就不会改变了
