var tarball = require('tarball-extract');
var request = require('request');
var fs = require('fs');
var unzip = require('unzip');
var flvtool2_zip = 'flvtool2.master.zip';

function rethrowAny(err){
  if (err) {
    throw err;
  }
}


request
    .get('https://github.com/konsumer/easy-ffmpeg/releases/download/0.0.8/ffmpeg.tgz')
    .on('error', function(err) {
      throw err
    })
    .pipe(fs.createWriteStream('ffmpeg.tgz'))
    .on('close', function() {
      tarball.extractTarball('ffmpeg.tgz', __dirname, function(err, result) {
        fs.unlink('ffmpeg.tgz', function(err) {
          rethrowAny(err);
        })
      })
    });

request
    .get('https://codeload.github.com/unnu/flvtool2/zip/master')
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(flvtool2_zip))
    .on('close', function() {
      fs.createReadStream(flvtool2_zip).pipe(unzip.Extract({path: __dirname}));
      fs.unlink(flvtool2_zip, function(err) {
        rethrowAny(err);
      });
    });
