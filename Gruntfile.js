module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['src/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      less: {
        src: ['src/<%= pkg.name %>.less'],
        dest: 'dist/less/<%= pkg.name %>.less'
      }
    },
    clean: {
      dist: 'dist',
    },
    less: {
      dist: {
        options: {
          paths: ['bower_components/lesshat'],
          cleancss: true
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.less'
        }
      },
      src: {
        options: {
          paths: ['bower_components/lesshat'],
          cleancss: false,
          sourceMap: true,
          sourceMapFilename: 'dist/less/<%= pkg.name %>.less.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/<%= pkg.name %>.less'
        }
      }      
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      dist: {
        options: {
          sourceMap: true       
        },
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    }
  });
 
  grunt.registerTask('build', ['clean', 'concat', 'less:src']);
  grunt.registerTask('minify', ['build', 'uglify', 'less:dist']);
  grunt.registerTask('default', ['minify']);
};