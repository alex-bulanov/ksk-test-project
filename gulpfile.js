const gulp = require('gulp');
const {src, dest} = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const del = require('del');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 3 versions']});
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpCss = require('gulp-webp-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

const projectFolder = 'dist';
const sourceFolder = 'source';

const path = {
  build: {
    html: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    images: projectFolder + '/img/',
  },
  source: {
    html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
    css: sourceFolder + '/less/style.less',
    js: sourceFolder + '/js/*.js',
    images: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/less/**/*.less',
    js: sourceFolder + '/js/**/*.js',
    images: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },

  clean: './' + projectFolder + '/'
}

function server() {
  browserSync.init({
    server: {
      baseDir: './' + projectFolder + '/'
    },
    port: 3000,
    notify: false
  })
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
}


function clean() {
  return del(path.clean);
}

function copy() {
  return src([
    'source/fonts/**/*.woff2',
    'source/fonts/**/*.woff',
    'source/vendors/**/*',
    'source/*.ico'
  ], {
    base: sourceFolder
  })
    .pipe(gulp.dest(projectFolder));
}


function css() {
  return src(path.source.css)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(gcmq())
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(webpCss())
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(sourcemap.write('.'))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

function html() {
  return src(path.source.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function images() {
  return src(path.source.images)
    .pipe(webp({
      quality: 80
    }))
    .pipe(dest(path.build.images))
    .pipe(src(path.source.images))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream())
}

function js() {
  return src(path.source.js)
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemap.write('.'))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

const build = gulp.series(clean, copy, images, css, html, js);
const start = gulp.series(build, gulp.parallel(watchFiles, server));

exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;

exports.build = build;
exports.start = start;
exports.default = start;
