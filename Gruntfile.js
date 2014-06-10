module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            source: {
                files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.ejs.html'],
                tasks: ['build']
            }
        },
        'http-server': {
            dev: {
                root: "src/",
                port: 8282,
                host: "127.0.0.1",
                cache: 0,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",
                runInBackground: true
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'images',
                        src: ['**'],
                        dest: 'src/images'
                    }
                ]
            },
            bootstrap2tmp: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/bootstrap/less',
                        src: ['**'],
                        dest: '.tmp/bootstrap'
                    }
                ]
            },
            lessOverrides: {
                files: {
                    '.tmp/bootstrap/variables.less': 'src/less/overrides/bootstrap/variables.less',
                    '.tmp/bootstrap/theme.less': 'src/less/overrides/bootstrap/theme.less'
                }
            },
            libs: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/angular',
                        src: ['**'],
                        dest: 'src/libs/angular'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/**', 'js/**'],
                        dest: 'src/libs/bootstrap'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/angular-bootstrap',
                        src: ['**'],
                        dest: 'src/libs/angular-bootstrap'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/angular-resource',
                        src: ['**'],
                        dest: 'src/libs/angular-resource'
                    }
                ]
            }
        },
        less: {
            bootstrap: {
                files: {
                    'src/libs/bootstrap/css/bootstrap.css': '.tmp/bootstrap/bootstrap.less',
                    'src/libs/bootstrap/css/bootstrap-theme.css': '.tmp/bootstrap/theme.less'
                }
            }
        },
        render: {
            index: {
                options: {
                    data: {
                        API_KEY: process.env.API_KEY ? process.env.API_KEY : '',
                        IMAGE_ROOT: process.env.IMAGE_ROOT ? process.env.IMAGE_ROOT : 'images/default',
                        CUSTOMER_NAME: process.env.CUSTOMER_NAME ? process.env.CUSTOMER_NAME : 'Derp'
                  }
              },
              files: {
                  'src/index.html': ['src/index.ejs.html']
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-ejs-render');

    grunt.registerTask('build', [
      'copy',
      'less',
      'render'
    ]);
    grunt.registerTask('default', ['http-server:dev', 'watch:source']);
};
