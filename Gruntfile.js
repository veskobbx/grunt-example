module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.initConfig({

		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files
		        'dist/index.html': 'dev/index.html'    // 'destination': 'source'		        
		      }
		    },
		  }



    });

 	grunt.registerTask('default', ['htmlmin']);

    

};