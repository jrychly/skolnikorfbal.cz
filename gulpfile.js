var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sassGlob = require('gulp-sass-glob');
var pug = require('gulp-pug');
var clean = require('gulp-rimraf');
var bourbon = require("node-bourbon").includePaths;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('clean', [], function() {
    return gulp.src("./dist", {
        read: false
    }).pipe(clean());
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('views', function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('styles', function() {
    gulp.src(['./src/sass/*.sass'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: bourbon
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('images', function(){
    gulp.src(['./src/img/**/*'])
    .pipe(gulp.dest('dist/img/'))
});


gulp.task('default', ['browser-sync', 'styles', 'views', 'images'], function() {
    gulp.watch("./src/sass/**/*.sass", ['styles']);
    gulp.watch("./src/index.pug", ['views']);
    gulp.watch("./src/img/**/*", ['images']);
});
