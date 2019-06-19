'use strict';

const through = require('through2');
const pug = require('pug');
const PluginError = require('plugin-error');
const log = require('fancy-log');

module.exports = function gulpPug(options) {
  const opts = Object.assign({}, options);

  opts.data = Object.assign(opts.data || {}, opts.locals || {});

  return through.obj(function compilePug(file, enc, cb) {
    const data = Object.assign({}, opts.data, file.data || {});

    opts.filename = file.path;
    file.extname = '.html';

    if (file.isStream()) {
      return cb(new PluginError('gulp-pug', 'Streaming not supported'));
    }

    if (file.isBuffer()) {
      try {
        const contents = file.contents.toString('utf-8');
        if (opts.verbose === true) {
          log('compiling file', file.path);
        }
        const compiled = pug.compile(contents, opts)(data);
        file.contents = Buffer.from(compiled, 'utf-8');
      } catch (e) {
        return cb(new PluginError('gulp-pug', e));
      }
    }
    cb(null, file);
  });
};
