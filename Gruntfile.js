module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {

            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:dev']
            },
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

        less: {
            dev: {
                options: {
                    paths: ["src/styles"],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                    ],
                    compress: false,
                    sourceMap: true,
                    sourceMapFileInline: true
                },
                files: {
                    'dev/css/styles.css': 'src/less/bootstrap.less'
                }
            },

            dist: {
                options: {
                    paths: ["src/styles"],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                    ],
                    compress: true,
                    sourceMap: false
                },
                files: {
                    'dist/css/styles.css': 'src/less/bootstrap.less'
                }
            }
        },

        sass: {
            dev: {
                options: {
                    sourcemap: 'inline',
                    style: 'expanded'
                },
                    files: {
                    'dev/css/sass_style.css': 'src/sass/main.scss'       // 'destination': 'source'
                }
            },
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                    files: {
                    'dist/css/sass_style.css': 'src/sass/main.scss',       // 'destination': 'source'
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
                            cwd: './src',
                            src: ['*.html', 'pages/*.html'],
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

        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'dist/index.html': 'dist/index.html',     // 'destination': 'source'
              }
            }
          }

    });

    grunt.registerTask('default', [
        'clean:dev',
        'copy:dev',
        'less:dev',
        'sass:dev',
        'processhtml:dev',
        'connect',
        'watch']);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'less:dist',
        'sass:dist',
        'processhtml:dist',
        'htmlmin:dist',
        'connect']);
};