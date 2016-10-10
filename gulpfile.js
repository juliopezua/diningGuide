var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var sassSources = './scss/**/*.scss';
var sassOutput = './app/css';
var htmlSource = 'app/**/*.html';

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSource).on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(sassSources)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);