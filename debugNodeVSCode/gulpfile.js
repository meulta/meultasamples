var gulp = require('gulp');
var jslint = require('gulp-jslint');

// build the main source into the min file
gulp.task('default', function () {
    return gulp.src(['*.js', '!gulpfile.js'])

        // pass your directives
        // as an object
        .pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            global: [],
            predef: [],
            reporter: 'default',
            edition: '2014-07-08',
            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});