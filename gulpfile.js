const gulp = require('gulp');
const ts = require('gulp-typescript');
const jeditor = require('gulp-json-editor');
const path = require('path');

const tsProject = ts.createProject('tsconfig.json');

function doesPropertyExist(obj, propertyName) {
	return typeof obj[propertyName] != 'undefined';
}

function transformPropertyIfExists(source, dest, propertyName, transform) {
	if (doesPropertyExist(source, propertyName)) {
		dest[propertyName] = transform(source[propertyName]);
	}
}

function copyPropertyIfExist(source, dest, propertyName) {
	transformPropertyIfExists(source, dest, propertyName, f => f);
}

gulp.task('ts', function() {
	return tsProject.src()
		.pipe(tsProject())
		.pipe(gulp.dest('dist'));
});

gulp.task('package', function() {
	return gulp.src('package.json')
		.pipe(jeditor(function(json) {
			let newJson = {};
			const propertiesToCopy = ['name', 'version', 'description', 'author', 'license'];
			const propertiesToTransform = ['types', 'main'];

			for (const propertyName of propertiesToCopy) {
				copyPropertyIfExist(json, newJson, propertyName);
			}

			for (const propertyName of propertiesToTransform) {
				transformPropertyIfExists(json, newJson, propertyName, p => path.basename(p));
			}
			newJson['declaration'] = true;

			return newJson;
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('ts', 'package'));
