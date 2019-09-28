var gulp            = require ('gulp'),
    livereload      = require('gulp-livereload'),
    sass            = require ('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleancss        = require('gulp-clean-css'),
    rename          = require('gulp-rename');

gulp.task('watch-css', done => {
    gulp.src('./app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css/'))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/css/'))
    .pipe(livereload());
    done();
});

gulp.task('default', function(done){
    livereload.listen();
    gulp.watch('./app/sass/*.sass', gulp.series('watch-css'));
    done();
});