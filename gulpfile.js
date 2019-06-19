'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');

const paths = {
  styles: {
    src: 'source/sass/style.scss',
    dest: 'build/css/'
  },
  html: {
    src: 'source/*.html',
    dest: 'build/'
  },
  pug: {
    src: 'source/views/**/index.pug',
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
  return gulp.src(paths.styles.src)
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
  gulp.watch(paths.html.src, gulp.series('html')).on('change', server.reload);
  gulp.watch(paths.scripts.src, gulp.series('scripts')).on('change', server.reload);
});

gulp.task('scripts', () => {
  // done();
  return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
});


const pug = require('gulp-pug');

gulp.task('views', () => {
  return gulp.src(paths.pug.src)
    .pipe(pug({
      locals: {
        items: {
          Albums: 'index.html',
          Artists: 'artists.html',
          News: 'news.html',
          Shop: 'page-in-progress.html',
          Contacts: 'page-in-progress.html'
        }
      },
      verbose: true
    }))
    .pipe(rename((path) => {
      path.basename = path.dirname === 'albums' ? 'index' : path.dirname;
      path.dirname = '';
    }))
    .pipe(gulp.dest(paths.pug.dest));
});

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
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


gulp.task('copy', gulp.parallel('views', 'scripts', 'style', 'images', 'icons', 'fonts', 'cname', 'favicon'));

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

gulp.task('start', gulp.series('build', 'server'));


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
