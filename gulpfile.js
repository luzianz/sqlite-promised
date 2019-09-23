var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject(
	'tsconfig.json',
	{
		declaration: true
	}
);

gulp.task('default', function() {
	return tsProject.src()
		.pipe(tsProject())
		// destination is redundant: it is also specified in tsconfig.json
		//TODO: figure out how to use the destination in tsconfig.json
		.pipe(gulp.dest('dist')); 
});

