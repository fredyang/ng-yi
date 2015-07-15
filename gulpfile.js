var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('default', function () {

  var fs = require('fs');

  var header = fs.readFileSync('./gulp/header.txt');
  var footer = fs.readFileSync('./gulp/footer.txt');
  var version = fs.readFileSync('./gulp/version.txt');
  var copyRight = fs.readFileSync('./gulp/copy_right.txt');


  return gulp.src(['module.js', './src/**/*.js', '!./src/**/*_spec.js'])
    .pipe($.concat('yi.js'))
    .pipe($.headerfooter.header(header))
    .pipe($.headerfooter.footer(footer))
    .pipe($.header(copyRight, {
      version: version
    }))
    .pipe(gulp.dest('./dist'))
    .pipe($.rename('yi.min.js'))
    .pipe($.jshint())
    ////.pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.header(copyRight, {
      version: version
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));


});


