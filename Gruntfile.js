module.exports = function(grunt) {

  grunt.initConfig({
    config: grunt.file.readJSON('src/settings.json'),

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true,
          base: 'build'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/*'],
        tasks: ['clean', 'copy', 'replace'],
        options: {
          spawn: false,
        },
      },
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /foo/g,
              replacement: 'bar'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['./src/boot.js'], dest: 'build/'}
        ]
      }
    },

    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: 'launchImage',
    //           replacement: '<%= config.launchImage %>'
    //         },
    //         {
    //           match: 'iframeURL',
    //           replacement: '<%= config.iframeURL %>'
    //         },
    //         {
    //           match: 'iframeURL',
    //           replacement: '<%= config.iframeURL %>'
    //         }
    //       ]
    //     },
    //     files: [
    //       {expand: true, flatten: true, src: ['src/boot.js'], dest: 'build/'}
    //     ]
    //   }
    // },

    s3: {
      test: {
        options: {
            bucket: 'gdn-cdn',
            access: 'public-read',
            headers: {
              'Cache-Control': 'max-age=60, public',
            },
            debug: true
        },
        upload: [
          {
            src: 'boot.js',
            dest: '/nextgen/<%= config.S3NextGenPath %>',
          }
        ]
      },
      prod: {
        options: {
            bucket: 'gdn-cdn',
            access: 'public-read',
            headers: {
              'Cache-Control': 'max-age=60, public',
            }
        },
        upload: [
          {
            src: 'boot.js',
            dest: '/nextgen/<%= config.S3NextGenPath %>',
          }
        ]
      }
    },

    copy: {
      main: {
        src: 'src/index.html',
        dest: 'build/',
        expand: true,
        flatten: true
      }
    },

    clean: ['build']

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ['clean', 'copy','replace', 'connect', 'watch']);
  grunt.registerTask('deploy', ['connect']);
  grunt.registerTask('test-deploy', ['s3:test']);

};