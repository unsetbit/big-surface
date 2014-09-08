var gulp = require('gulp'), 
  boilerplate = require('boilerplate-gulp');

boilerplate(gulp, {
  jsMain: './src/surface.js',
  name: 'BigSurface',
  karmaConfig: {
    files: [
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/easy-tween/dist/easyTween.js',
      'bower_components/hammerjs/hammer.js'
    ],
    
    preprocessors: {
      'bower_components/eventEmitter/EventEmitter.js' : ['commonjs'],
      'bower_components/easy-tween/dist/easyTween.js' : ['commonjs'],
      'bower_components/hammerjs/hammer.js' : ['commonjs']
    },
  }
});