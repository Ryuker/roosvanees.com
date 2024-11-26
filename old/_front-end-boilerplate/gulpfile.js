// Gulp instructions
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var critical = require('critical').stream;
var uglify = require('gulp-uglify-es').default;
var del = require('del');
var browserSync = require('browser-sync').create();

// Compile the SCSS files into CSS
function scss() {
  return gulp.src('src/scss/*.scss')
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(postcss([autoprefixer]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
}

// Used to concatenate the files in a specific order
var cssSRC = [
  'dist/css/main.css',
];

function concatCSS() {
  return gulp.src(cssSRC)
  .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
  .pipe(concat('main.min.css'))
  .pipe(cleancss())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'));
}

// Generate and Inline the critical-path CSS
function aboveTheFold() {
  return gulp
  .src('dist/*.html')
  .pipe(critical({
    base: 'dist/',
    css: ['dist/css/main.css'],
    width: 1600,
    height: 900,
    minify: true,
    extract: false,
  }))
  .on('error', function(err) {
    log.error(err.message);
  })
  .pipe(gulp.dest('dist/css'));
}

// used to concatenate the files in a specific folder
var jsSRC = [
  'src/js/jquery-3.5.1.min.js',
  'src/js/slick.min.js',
  'src/js/jquery.fittext.js',
  'src/js/main.js'
];

function js() {
  return gulp.src(jsSRC)
  .pipe(concat('combined.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
}

function html() {
  return gulp
  .src(['./src/html/*html'])
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(replace('@get_url', 'http://localhost/3000/'))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
}

function imgmin() {
  return gulp.src('./src/media/*')
  .pipe(changed('dist/media'))
  .pipe( imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 5})
  ]))
  .pipe( gulp.dest('dist/media'));
}

function webfonts() {
  return gulp.src('./src/webfonts/*')
  .pipe(gulp.dest('dist/webfonts'));
}

function watch() {
  browserSync.init({
    server: './dist'
  });
  gulp.watch('src/scss/**/*.scss', gulp.series([scss, concatCSS])).on('change', browserSync.reload);
  gulp.watch('src/js/*js', js);
  gulp.watch('src/html/*.html', html).on('change', browserSync.reload);
  gulp.watch('src/html/**/**/*.html', html).on('change', browserSync.reload);
  gulp.watch('src/media/*', imgmin);
  gulp.watch('src/webfonts/*', webfonts);
}

// Delete dist folder
function clear() {
  return del(['dist'])
}

exports.scss = scss;
exports.js = js;
exports.html = html;
exports.imgmin = imgmin;
exports.webfonts = webfonts;
exports.aboveTheFold = aboveTheFold;
exports.clear = clear;
exports.default = gulp.series(
  html,
  scss, 
  concatCSS,
  js,
  imgmin, 
  webfonts,
  watch
);



