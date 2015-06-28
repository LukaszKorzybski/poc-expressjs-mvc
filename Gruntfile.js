module.exports = function(grunt) {
    grunt.initConfig({
        express: {            
            app: {
                options: {
                    script: 'src/app.js'
                },
            },
            backend: {
                options: {
                    script: 'src/backend-server.js'
                }
            }
        },
        watch: {
            app: {
                files:  [ 'src/**/*.js' ],
                tasks:  [ 'express:app' ],
                options: {
                    spawn: false
                }
            },
            backend: {
                files:  [ 'src/backend-server.js' ],
                tasks:  [ 'express:backend' ],
                options: {
                    spawn: false
                }
            }
        },
        jshint: {
            src: ['src/**/*.js', 'test/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('analyze', ['jshint']);
    grunt.registerTask('run', [ 'express:app', 'watch:app' ]);
    grunt.registerTask('run-backend', [ 'express:backend', 'watch:backend' ]);
};