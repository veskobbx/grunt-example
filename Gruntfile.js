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
            }
        },

        clean: {
            dev: {
                src: ["dev/**"]
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
                    port: 8080,
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
        'processhtml',
        'connect',
        'watch']);
};