module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({


        watch: {

            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:dev']
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
        'less:dev',
        'processhtml:dev',
        'htmlmin:dev',
        'connect',
        'watch']);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'less:dist',
        'htmlmin:dist',
        'connect',
        'watch'   //сървъра неще да живей. стартира и спира!
        ]);
};
