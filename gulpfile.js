'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const del = require('del');

const paths = {
  styles: {
    src: 'source/sass/style.scss',
    dest: 'build/css/'
  },
  html: {
    src: 'source/*.html',
    dest: 'build/'
  },
  favicon: {
    src: 'source/favicon/*.*',
    dest: 'build/'
  },
  images: {
    src: 'source/img/**/*',
    dest: 'build/img/'
  },
  fonts: {
    src: 'source/fonts/**/*',
    dest: 'build/fonts/'
  },
  scripts: {
    src: 'source/scripts/**/*.js',
    dest: 'build/scripts/'
  }
};

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require("css-mqpacker");
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

gulp.task('style', () => {
  return gulp.src(paths.styles.src).
    pipe(plumber()).
    pipe(sass()).
    pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({sort: true})
    ])).
    pipe(sourcemaps.init()).
    pipe(cleanCSS()).
    pipe(sourcemaps.write()).
    pipe(rename('style.min.css')).
    pipe(gulp.dest(paths.styles.dest)).
    pipe(server.stream());
});


const server = require('browser-sync').create();

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('style'));
  gulp.watch(paths.html.src, gulp.series('html'));
});

gulp.task('scripts', (done) => {
  done();
});


gulp.task('html', () => {
  return gulp.src(paths.html.src).
    pipe(gulp.dest(paths.html.dest));
});

gulp.task('favicon', () => {
  return gulp.src(paths.favicon.src).
    pipe(gulp.dest(paths.favicon.dest));
});

const imagemin = require('gulp-imagemin');

gulp.task('images', () => {
  return gulp.src(paths.images.src).
    pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
          removeViewBox: true
        }
      ]
    }, true)).
    pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src).
    pipe(gulp.dest(paths.fonts.dest));
});

const imageResize = require('gulp-image-resize');

gulp.task('resize', function () {
  return gulp.src('source/img/**/album_*.jpg').
    pipe(imageResize({
      width: 200,
      height: 200,
      crop: false,
      upscale: false,
      interlace: true
    })).
    pipe(rename((path) => {
      const name = path.basename.substr('album_'.length);
      path.basename = `album_thumb_${name}`;
    })).
    pipe(gulp.dest('dist'));
});

gulp.task('copy', gulp.parallel('html', 'scripts', 'style', 'images', 'fonts', 'favicon'));

gulp.task('clean', () => del(['build']));

gulp.task('build', gulp.series('clean', 'copy'));

gulp.task('start', gulp.series('build', 'server'));

const ghPages = require('gh-pages');

const deploy = (cb) => {
  ghPages.publish('build', cb);
};

gulp.task('deploy', gulp.series('build', deploy, 'clean'));
