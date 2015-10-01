module.exports = function(grunt) {
	grunt.initConfig({
		ts: {
			"default" : {
				files: [
					{
						src: ["src/**/*.ts"],
						dest: "js"
					}
				]
			},
			options: {
				"module": "commonjs",
				comments: false,
				target: "es5",
				declaration: false,
				sourceMap: false
			}
		}
	});
	grunt.loadNpmTasks("grunt-ts");
	grunt.registerTask("default", ["ts"]);
};