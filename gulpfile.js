/// <binding BeforeBuild='default' />
'use strict';

// Load plugins
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
//var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync');
var clean = require('gulp-clean');

// error function for plumber
var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


var myScripts = [
    'floodmap_javascript/ParishFloodLayersGaia.js',
    'floodmap_javascript/esri.symbol.MultiLineTextSymbol.js',
    'floodmap_javascript/floodMap.js',
    'floodmap_javascript/respond.js',
    'floodmap_javascript/customizeUserExperience.js',
    'floodmap_javascript/page.js'];

//build datestamp for cache busting
var getStamp = function () {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};

// BrowserSync proxy
gulp.task('browser-sync', function () {
    browsersync({
        proxy: 'localhost:55748',
        port: 3000
    });
});

// BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});


//// Optimize Images task
//gulp.task('images', function () {
//    return gulp.src('./images/**/*.{gif,jpg,png}')
//      .pipe(imagemin({
//          progressive: true,
//          interlaced: true,
//          svgoPlugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill: false }]
//      }))
//      .pipe(gulp.dest('./images/'))
//});


gulp.task('clean-scripts', function () {
    return gulp.src('floodmap_javascript/**/script-*.js', { read: false })
    .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function () {
    var filename = 'script-' + getStamp() + '.js';
    gulp.src(myScripts, { base: 'floodmap_javascript/' })
    .pipe(concat(filename))
    .pipe(uglify())
    .pipe(gulp.dest('./floodmap_javascript'))
    .pipe(notify("Scripts Combined!"));

    return gulp.src('default.aspx', { base: './' })
        .pipe(replace(/<script id="main".*<\/script>/g, '<script id="main" src="floodmap_javascript/' + filename + '"></script>'))
        .pipe(gulp.dest('./'))
        .pipe(notify("File Ref:" + filename + " replaced"));
});

gulp.task('default', ['scripts'], function () {
    // Default task output here
    gulp.src("./default.aspx")
    .pipe(notify("Gulperino Completerino!"));
});