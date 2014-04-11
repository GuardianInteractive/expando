module.exports = function(grunt) {

  grunt.initConfig({
    config: grunt.file.readJSON('src/settings.json'),

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/*'],
        tasks: ['clean', 'copy', 'replace']
      },
    },


    replace: {
      example: {
        src: ['src/r2_code_block.html', 'src/boot.js'],
        dest: 'build/',
        replacements: [{
          from: '@@launchImage',
          to: '<%= config.launchImage %>'
        },
        {
          from: '@@iframeURL',
          to: '<%= config.iframeURL %>'
        },
        {
          from: '@@S3NextGenPath',
          to: '<%= config.S3NextGenPath %>'
        }]
      }
    },

    s3: {
      test: {
        options: {
            bucket: 'gdn-cdn',
            region: 'us-east-1',
            access: 'public-read',
            headers: {
              'Cache-Control': 'max-age=60, public',
            },
            debug: true
        },
        upload: [
          {
            src: 'build/boot.js',
            dest: '/next-gen<%= config.S3NextGenPath %>boot.js',
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
            src: 'src/boot.js',
            dest: '/next-gen<%= config.S3NextGenPath %>boot.js',
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
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ['clean', 'copy','replace', 'connect', 'watch']);
  grunt.registerTask('deploy', ['s3:prod']);
  grunt.registerTask('test-deploy', ['s3:test']);

};
