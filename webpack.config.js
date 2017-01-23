'use strict';
var 
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    util = require('yyl-util'),
    fs = require('fs');


var webpackconfig = {
    entry: (function(){ // 未完成
        var 
            entryPath = util.joinFormat(__dirname, 'src/entry'),
            r = {};

        if(fs.existsSync(entryPath)){
            var dirs = fs.readdirSync(entryPath);
            dirs.forEach(function(dirname){
                var fullname = util.joinFormat(entryPath, dirname, dirname + '.js');
                if(fs.existsSync(fullname)){
                    r[dirname] = fullname;
                }

            });
        }
        return r;

    })(),
    output: {
        path: 'app/views/js',
        filename: '[name].js'
        // publicPath: util.joinFormat(
        //     config.dest.basePath, 
        //     path.relative(
        //         config.alias.root,
        //         config.alias.jsDest
        //     ), 
        //     '/'
        // ),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-es2015'].map(require.resolve)
            }

        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        }, {
            test: /\.jade$/,
            loader: 'pug-loader'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader'
        }, {
            // shiming the module
            test: path.join(__dirname, 'src/js/lib/'),
            loader: 'imports?this=>window'
        }]

    },
    // resolveLoader: { 
    //     fallback: path.join( __dirname, "node_modules") 
    // },
    resolve: {
        // fallback: path.join( __dirname, "node_modules"),
        modules: [
            __dirname,
            'node_modules'
        ],
        alias: {
            'actions': path.join(__dirname, 'src/vuex/actions.js'),
            'getters': path.join(__dirname, 'src/vuex/getters.js'),
            'vue$': 'vue/dist/vue.common.js'
            // 'vue': path.join(__dirname, './node_modules/vue/dist/vue.min.js')
        }

    },
    plugins: []
};


webpackconfig.plugins = webpackconfig.plugins.concat((function(){ // html 输出
    var 
        entryPath = util.joinFormat( __dirname, 'src/entry'),
        outputPath = [],
        r = [];

    if(fs.existsSync(entryPath)){
        outputPath = outputPath.concat(util.readFilesSync(entryPath, /(\.jade|\.html)$/));
    }

    var entrys = [];

    for(var key in webpackconfig.entry){
        if(webpackconfig.entry.hasOwnProperty(key)){
            entrys.push(key);
        }
    }

    outputPath.forEach(function(iPath){
        var iBaseName = path.basename(iPath).replace(/(\.jade|\.html)$/, '');
        var iExclude = [].concat(entrys);
        var fPath;

        for(var i = 0; i < iExclude.length;){
            if(util.type(iExclude[i]) == 'array'){
                i++;

            } else {
                fPath = webpackconfig.entry[iExclude[i]];
                if(util.type(fPath) == 'array'){
                    fPath = fPath[0];
                }
                if(webpackconfig.resolve.alias[fPath]){
                    fPath = webpackconfig.resolve.alias[fPath];
                }
                fPath = util.joinFormat(fPath);
                
                if(iExclude[i] == iBaseName || (fPath.substr(0, entryPath.length) != entryPath)){
                    iExclude.splice(i, 1);
                } else {
                    i++;
                }

            }
        }

        r.push(new HtmlWebpackPlugin({
            template: iPath,
            filename: path.join(__dirname, 'app/views/html', iBaseName + '.html'),
            excludeChunks: iExclude,
            minify: false
        }));
    });


    return r;

})());

module.exports = webpackconfig;
