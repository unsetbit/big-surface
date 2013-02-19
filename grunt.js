module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    hug: {
      client: {
        src: './src/Surface.js',
        dest: 'dist/surface-expanded.js',
        exportedVariable: 'Surface',
        exports: './src/Surface.js'
      },
      clientExport: {
        src: './src/Surface.js',
        dest: 'dist/surface-module.js',
        exports: './src/Surface.js'
      }
    }, 
    min: {
      client: {
        src: ['<config:hug.client.dest>'],
        dest: 'dist/surface.js'
      }
    },
    watch: {
      all: {
        files: './src/**/*',
        tasks: 'hug'
      }
    }
  });

  grunt.loadNpmTasks('grunt-hug');

  grunt.registerTask('dev', 'hug watch');
  grunt.registerTask('default', 'hug min');
};