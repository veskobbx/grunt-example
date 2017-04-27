module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {

            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass:dev']
            },
            processhtml: {
                files: ['src/**/*.html'],
                tasks: ['processhtml:dev']
            },
            img: {
                files: ['src/img/**/*'],
                tasks: ['copy:img']
            },
            js: {
                files: ['src/js/**/*'],
                tasks: ['copy:js']
            }
        },

        sass: {
            dev: {
                options: {
                    sourcemap: 'inline',
                    style: 'expanded'
                },
                    files: {
                    'dev/css/bootstrap.css': 'src/sass/bootstrap.scss',
                    'dev/css/bootstrap-grid.css': 'src/sass/bootstrap-grid.scss'
                }
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                    files: {
                    'dist/css/bootstrap.css': 'src/sass/bootstrap.scss',       // 'destination': 'source'
                }
            }
        },

        processhtml: {
                options: {
                     process: true
                },
                dev: {
                    files: [
                        {
                            expand: true,
                            cwd: 'src',
                            src: ['*.html'],
                            dest: 'dev/',
                            ext: '.html'
                        }
                    ],
                },
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: './src',
                            src: ['*.html', 'pages/*.html'],
                            dest: 'dist/',
                            ext: '.html'
                        }
                    ],
                }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dev/index.html',
                    // 'dist/contact.html': 'dev/contact.html'
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'src/index.html',
                    // 'dist/contact.html': 'src/contact.html'
                }
            }
        },

        clean: {
            dev: {
                src: ["dev/**"]
            },
            dist: {
                src: ["dist/**"]
            }
        },

        copy: {
            dev: {
                files: [
                    {expand: true, cwd: "src/img", src:["**"], dest: "dev/img"},
                    {expand: true, cwd: "src/js", src: ["**"], dest: "dev/js"},
                    {expand: true, cwd: "src/video", src: ["**"], dest: "dev/video"}
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: "src/img", src:["**"], dest: "dist/img"},
                    {expand: true, cwd: "src/js", src: ["**"], dest: "dist/js"},
                    {expand: true, cwd: "src/video", src: ["**"], dest: "dist/video"}
                ]
            },
            img: {
                files: [
                    {expand: true, cwd: "src/img", src: ["**"], dest: "dev/img"}
                ]
            },
            js: {
                files: [
                    {expand: true, cwd: "src/js", src: ["**"], dest: "dev/js"}
                ]
            }
        },

        connect: {

            server: {
                options: {
                    port: 9000,
                    hostname: "*",
                    base: "dev"
                }
            }

        }

    });

    grunt.registerTask('default', [
        'clean:dev',
        'copy:dev',
        'sass:dev',
        'processhtml:dev',
        'htmlmin:dev',
        'connect',
        'watch']);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'sass:dist',
        'processhtml:dist',
        'htmlmin:dist',
        'connect']);

};

