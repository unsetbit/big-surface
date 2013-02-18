module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    hug: {
      client: {
        src: './src/surface.js',
        dest: 'dist/surface-expanded.js',
        exportedVariable: 'createSurface',
        exports: './src/surface.js'
      },
      clientExport: {
        src: './src/surface.js',
        dest: 'dist/surface-module.js',
        exports: './src/surface.js'
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