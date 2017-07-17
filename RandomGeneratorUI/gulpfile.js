let gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    uglify = require('gulp-uglify');


let source = 'src/',
    dest = 'static/',
    bootstrapDir = './node_modules/bootstrap-sass/';


let scss = {
    in: source + 'sass/main.scss',
    out: dest + 'css/',
    watch: source + 'sass/**/*',
    sassOpts:{
        outputStyle:'nested',
        precision:3,
        errLogToConsole:true,
        includePaths:[bootstrapDir+'assets/stylesheets']
    }
};

gulp.task('sass',function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});

gulp.task('default',['sass'],function () {
    gulp.watch(scss.watch,['sass']);
});