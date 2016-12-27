// npm i -g grunt

module.exports = function (grunt) {
	grunt.initConfig({
		ts: {
			"default": {
				files: [
					{
						src: ["src/sqlite-promised.ts"],
						dest: "build"
					}
				]
				//tsconfig: true
			},
			options: {
				"module": "commonjs",
				comments: false,
				target: "es6",
				declaration: false,
				sourceMap: false
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['sqlite-promised.d.ts'],
						dest: 'build/', filter: 'isFile'
					}
				],
			},
		}
	});

	
	grunt.loadNpmTasks("grunt-ts"); // https://www.npmjs.com/package/grunt-ts
	grunt.loadNpmTasks('grunt-contrib-copy'); // https://github.com/gruntjs/grunt-contrib-copy

	grunt.registerTask("default", ["ts", "copy"]);
};