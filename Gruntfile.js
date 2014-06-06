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
          to: '<%= config.S3BootPath %>'
        }]
      }
    },

    s3: {
        options: {
            bucket: 'gdn-cdn',
            access: 'public-read',
            headers: {
              // 5 min cache
              'Cache-Control': 'max-age=300, public',
            },
        },

      test: {
        options: {
            debug: true
        },
        upload: [
          {
            src: 'build/boot.js',
            dest: '/boot<%= config.S3BootPath %>boot.js',
          }
        ]
      },
      prod: {
        upload: [
          {
            src: 'build/boot.js',
            dest: '/boot<%= config.S3BootPath %>boot.js',
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

  grunt.registerTask('build', ['clean', 'copy','replace']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('deploy', ['build', 's3:prod']);
  grunt.registerTask('test-deploy', ['build', 's3:test']);

};
