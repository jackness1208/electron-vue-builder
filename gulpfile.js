'use strict';
var 
    gulp = require('gulp'),
    gulpConnect = require('gulp-connect'),
    connect = require('electron-connect').server.create(),
    // symdest = require('gulp-symdest'),
    // zip = require('gulp-vinyl-zip'),
    webpack = require('webpack'),
    // electron = require('gulp-atom-electron'),

    // clean = require('gulp-clean'),
    webpack = require('webpack'),
    runSequence = require('run-sequence'),
    // fs = require('fs'),
    path = require('path'),
    util = require('yyl-util'),
    webpackConfig = require('./webpack.config.js');

gulp.task('default', function(){
    gulp.run('--help');
});

gulp.task('--help', function(){
    console.log([
        '',
        '',
        '  Ustage:'.yellow + ' gulp <command> --name <project>',
        '',
        '',
        '  Commands:'.yellow,
        '    ' + 'all'.gray + '                   optimize the target',
        
        '',
        '  Options:'.yellow,
        '    ' + '-h, --help'.gray + '            output usage information',
        '',
        ''
    ].join('\n'));

});

gulp.task('all', function(){

});





gulp.task('start', ['webpack'], function(){
    connect.start();

    gulp.watch('app/app.js', connect.restart);
    gulp.watch(['app/views/**/*.*'], connect.restart);
});

gulp.task('watch', ['webpack'], function(){
    gulp.watch('src/**/*.*', ['webpack']);
});

gulp.task('watch:web', ['webpack'], function(){
    gulp.watch('src/**/*.*', function(){
        runSequence('webpack', 'connect-reload');
    });

    gulpConnect.server({
        root: './app/views',
        port: 5000,
        livereload: true
    });
});

gulp.task('connect-reload', function(){
    return gulp.src('./package.json')
        .pipe(gulpConnect.reload());
});

gulp.task('webpack', function(done){
    var 
        iWebpackConfig = util.extend({}, webpackConfig);

    if(gulp.env.isCommit){
        iWebpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));

        iWebpackConfig.devtool = false;
    }


    webpack(iWebpackConfig, function(err, stats){
        if (err) {
            util.msg.error('webpack', err);

        } else {
            util.msg.success('webpack', 'run pass');
        }
        util.msg.info('webpack', stats.toString());

        done();

    });
});

