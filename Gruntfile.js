var load = require('load-grunt-tasks');

module.exports = function(grunt) {

	load(grunt);

	grunt.initConfig({
		sass: {
			main: {
				options: {
					sourceMap: true
				},
				src: 'styles/scss/main.scss',
				dest: 'styles/main.css'
			}
		},

		autoprefixer: {
			main: {
				options: {
					map: true
				},
				src: 'styles/main.css',
				dest: 'styles/main.css'
			}
		},

		watch: {
			sass: {
				options: {
					livereload: true
				},
				files: ['styles/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			// js: {
			// 	files: ['scripts/src/**/*.js']
			// }
		},

		connect: {
			main: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		}
	});

	grunt.registerTask('build', [
		'sass',
		'autoprefixer'
	]);


	grunt.registerTask('dev', ['build', 'connect', 'watch']);

	grunt.registerTask('default', ['build']);

};