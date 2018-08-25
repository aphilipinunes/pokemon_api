var gulp = require('gulp');
var gutil = require('gulp-util');
var cssmin = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var spritesmith = require('gulp.spritesmith');

var directory = 'build';

// Scripts
gulp.task('scripts', function () {
    return gulp.src(['src/js/jquery.min.js',
    'src/js/jquery-ui.js',
     'src/js/jquery.lazy.js',
     'src/js/jquery.lazy.plugins.js',
          'src/js/jquery.modal.min.js',
    'src/js/main.js'])
  	.on('error', function (err) {
  	    console.error('Error!', err.message);
  	})
    .pipe(uglify())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest(directory + '/js'))
});

// Sass 

gulp.task('sass', function () {
    return gulp.src(['src/sass/style.scss'])
      .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(cssmin())
      .pipe(gulp.dest(directory + '/css'));
});



// Compress Images
gulp.task('images', function () {
    return gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest(directory + '/images'))
});


//Sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/sprites/*')
    .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    })
      .on('error', function (err) {
          console.error('Error!', err.message);
      })

    );

    spriteData.pipe(gulp.dest(directory + '/sprites'))
});

// Browser Sync
gulp.task('browser-sync', function () {
    browserSync.init(["*.html", "build/css/style.min.css", "build/js/scripts.min.js"], {
        server: {
            baseDir: "./"
        }
    });
});

// Watch
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'images', 'browser-sync', 'sprite', 'watch']);
