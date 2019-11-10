"use strict";

var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    server = require("browser-sync").create(),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sass = require("gulp-sass"),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    svgstore = require("gulp-svgstore"),
    posthtml = require("gulp-posthtml"),
    del = require("del"),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    include = require("posthtml-include");


/* Paths to source/build/watch files
=========================*/

var path = {
    build: {
        html: "build",
        js: "build/assets/js/",
        vendors: "build/assets/vendors/",
        css: "build/assets/css/",
        img: "build/assets/img/",
        fonts: "build/assets/fonts/"
    },
    src: {
        html: "src/pages/**/*.html",
        js: "src/assets/js/**/*.js",
        vendors: "src/assets/vendors/**/*.*",
        css: "src/assets/sass/style.scss",
        img: "src/assets/img/**/*.*",
        svg: "src/assets/img/icon-*.svg",
        fonts: "src/assets/fonts/**/*.*"
    },
    watch: {
        html: "src/pages/**/*.html",
        layout: "src/templates/**/*.html",
        vendors: "src/assets/vendors/**/*.*",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.scss",
        img: "src/assets/img/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    clean: "./build",
    json: "./src/data/data.json"
};


/* Tasks
=========================*/


gulp.task("serve", async function () {
  server.init({
    server: "build/"
  });

  gulp.watch(path.watch.html).on("change", gulp.series('html:build'));
  gulp.watch(path.watch.css).on("change", gulp.series('css:build'));

  gulp.watch(path.watch.img).on("change", gulp.series('image:build', 'sprite:build'));
  gulp.watch(path.watch.js).on("change", gulp.series('js:build'));
  gulp.watch(path.watch.fonts).on("change", gulp.series('fonts:build'));
});

gulp.task("css:build", async function () {
  gulp.src(path.src.css)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(path.build.css))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(path.build.css))

    .pipe(server.stream());
});

gulp.task('js:build', async function() {
  return gulp.src('src/assets/js/**/*.js')
  .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/assets/js/'))
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest(path.build.js))
    .pipe(server.reload({stream: true}));
});

gulp.task("html:build", async function () {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(path.build.html))
    .pipe(server.reload({stream: true}));
});

gulp.task("image:build", async function () {
  gulp.src(path.src.img)
      .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ]))
      .pipe(gulp.dest(path.build.img));
});

gulp.task("sprite:build", async function () {
  return gulp.src(path.src.svg)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(path.build.img));
});

gulp.task("fonts:build", async function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task("clean", async function () {
  return del("build");
});

var build = gulp.series(
  "clean",
  "html:build",
  "css:build",
  "js:build",
  "fonts:build",
  "image:build",
  "sprite:build",
  "serve"

  );

gulp.task("default", build);
