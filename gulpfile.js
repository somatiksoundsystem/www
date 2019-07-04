'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');

const paths = {
  styles: {
    src: 'source/sass/**/*.scss',
    main: 'source/sass/style.scss',
    dest: 'build/css/'
  },
  pug: {
    src: 'source/views/**/*.pug',
    dest: 'build/'
  },
  templates: {
    src: 'templates/**/*.html',
    dest: 'build/'
  },
  favicon: {
    src: 'source/favicon/*.*',
    dest: 'build/'
  },
  icons: {
    src: [
      'node_modules/@fortawesome/fontawesome-free/svgs/brands/telegram.svg',
      'node_modules/@fortawesome/fontawesome-free/svgs/brands/instagram.svg',
      'node_modules/@fortawesome/fontawesome-free/svgs/brands/facebook.svg',
      'node_modules/@fortawesome/fontawesome-free/svgs/brands/vk.svg',
      'node_modules/@fortawesome/fontawesome-free/svgs/brands/soundcloud.svg',
    ],
    dest: 'build/icon/'
  },
  images: {
    src: 'source/img/**/*',
    dest: 'build/img/'
  },
  fonts: {
    src: 'source/fonts/**/*',
    dest: 'build/fonts/'
  },
  cname: {
    src: 'CNAME',
    dest: 'build/'
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
  return gulp.src(paths.styles.main)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
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
    ]))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
});


gulp.task('scripts', () => {
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
});

const dataPugRender = require('./plugin/pug-data');

gulp.task('pug', () => dataPugRender(paths.pug.dest));

gulp.task('templates', () => {
  return gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('favicon', () => {
  return gulp.src(paths.favicon.src)
    .pipe(gulp.dest(paths.favicon.dest));
});

const svgo = require('gulp-svgo');
const svgstore = require('gulp-svgstore');
gulp.task('icons', () => {
  return gulp.src(paths.icons.src)
    .pipe(svgo())
    .pipe(svgstore())
    .pipe(rename('bundle.min.svg'))
    .pipe(gulp.dest(paths.icons.dest));
});

const imagemin = require('gulp-imagemin');
gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
          removeViewBox: true
        }
      ]
    }, true))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});


gulp.task('cname', () => {
  return gulp.src(paths.cname.src)
    .pipe(gulp.dest(paths.cname.dest));
});


gulp.task('static', gulp.parallel('scripts', 'style', 'images', 'icons', 'fonts', 'cname', 'favicon'));


gulp.task('copy', gulp.parallel('pug', 'static'));


gulp.task('copy:templates', gulp.parallel('templates', 'static'));


const imageResize = require('gulp-image-resize');
gulp.task('resize', function () {
  return gulp.src('source/img/**/album_*.jpg')
    .pipe(imageResize({
      width: 200,
      height: 200,
      crop: false,
      upscale: false,
      interlace: true
    }))
    .pipe(rename((path) => {
      const name = path.basename.substr('album_'.length);
      path.basename = `album_thumb_${name}`;
    }))
    .pipe(gulp.dest('dist'));
});


const del = require('del');
gulp.task('clean', () => del(['build']));

gulp.task('build', gulp.series('clean', 'copy'));
gulp.task('build:templates', gulp.series('clean', 'copy:templates'));


const server = require('browser-sync').create();
gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(paths.styles.src, gulp.series('style'));
  gulp.watch(paths.scripts.src, gulp.series('scripts')).on('change', server.reload);
  gulp.watch(paths.pug.src, gulp.series('pug')).on('change', server.reload);
  gulp.watch(paths.templates.src, gulp.series('templates')).on('change', server.reload);
});


gulp.task('serve:build', gulp.series('build', 'serve'));


gulp.task('serve:templates', gulp.series('build:templates', 'serve'));


gulp.task('start', gulp.series('serve:build'));


const branchName = require('branch-name');
const ghPages = require('gh-pages');
const deploy = (cb) => {
  branchName.assumeMaster().then((name) => {
    console.log(`Current branch: ${name}...`);
    if (name.toLowerCase() === `master`) {
      ghPages.publish('build', cb);
    } else {
      gulp.src('build/**/*')
        .pipe(gulp.dest(`build/${name}/`))
        .on('finish', () => {
          del.sync(['build/**', '!build', `!build/${name}/**`]);
          ghPages.publish('build', {add: true}, cb);
        });
    }
  });
};


gulp.task('deploy', gulp.series('build', deploy, 'clean'));
