module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        nodemon: {
            dev: {
                script: 'app.js',
                ignore:  ['node_modules/**','bower_components/**','public/**']
            }
        }

    });

    grunt.loadNpmTasks('grunt-nodemon');

    // Default task(s).
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', ['nodemon']);


};