//Variables

var gulp = require("gulp");
var scss = require("gulp-sass");
var scssLint = require("gulp-sass-lint");
var consolidate = require("gulp-consolidate");
var iconfont = require("gulp-iconfont");

//Plugins

// 1. Scss to scss

gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});

//2. Gulp Watcher

gulp.task("default", ["scss", "scss-lint"], () => {
  gulp.watch("src/**/*.scss", ["scss"]);
});

// 3. Sass Lint

gulp.task("scss-lint",  () => {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(
      scssLint({
        configFile: ".sass-lint.yml",
      })
    )
    .pipe(scssLint.format())
    .pipe(scssLint.failOnError());
});

// 4. Icon Font

gulp.task("iconfont", () => {
  return gulp
    .src("src/svg/*.svg")
    .pipe(
      iconfont({
        fontName: "iconfont",
        formats: ["ttf", "eot", "woff", "woff2"],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true,
      })
    )
    .on("glyphs", function (glyphs, options) {
      gulp
        .src("src/iconfont-template/iconfont.scss")
        .pipe(
          consolidate("underscore", {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime(),
          })
        )
        .pipe(gulp.dest("src/scss/base/icon-font"));
    })
    .pipe(gulp.dest("dist/fonts"));
});

// 5. Gulp project build

gulp.task("project-build", ["copy-html", "copy-js", "copy-img", "copyfonts", "copy-svg"])

//Copy html
gulp.task("copy-html", () => {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
});

//Copy js
gulp.task("copy-js", () => {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/js"));
});

//Copy img
gulp.task("copy-img", () => {
  return gulp
    .src("src/images/*.{gif,jpg,jpeg,png}")
    .pipe(gulp.dest("dist/images"));
});

//Copy fonts
gulp.task("copyfonts", () => {
  return gulp
    .src("src/fonts/*.{woff,woff2}")
    .pipe(gulp.dest("dist/text-fonts"));
});

//Copy svg
gulp.task("copy-svg", () => {
  return gulp.src("src/svg/*.svg").pipe(gulp.dest("dist/svg"));
});
