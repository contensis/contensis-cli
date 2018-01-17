var gulp = require('gulp');
var gulpContensisSync = require('gulp-contensis-sync');

gulp.task('sync-contensis', function () {
	var contensisSync = gulpContensisSync.create({
		"user": "<%= userName %>",
		"password": "<%= password %>",
		"cmsUrl": "<%= rootUrl %>",
		"project": "<%= projectName %>"
	});

	var options = {
		prefix: '<%= folder %>'
	};

	return gulp.src('./build/<%= contentTypeName %>.js')
		.pipe(contensisSync.transfer(options))
		.pipe(contensisSync.sync(options))
		.pipe(gulpContensisSync.reporter());
});