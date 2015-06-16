module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint:{
      files: ['*.js', '!gruntfile.js'],
      options: {
          "curly": true,
          "eqnull": true,
          "eqeqeq": true,
          "undef": false,
          "globals": {
            "jQuery": true
          }
      }
    },
    less:{
      all : {
        options: {
         
        },
        files: {
          "./styles.css": "./styles.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      },
      less: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load the plugin that provides the "jshint" task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin that provides the "less" task
  grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that provides the "watch" task
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'less']);

};