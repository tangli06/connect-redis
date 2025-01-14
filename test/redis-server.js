var spawn = require('child_process').spawn;
var redisSrv;
var port = (exports.port = 18543);

exports.connect = () =>
  new Promise((resolve, reject) => {
    redisSrv = spawn('redis-server', ['--port', port, '--loglevel', 'notice'], {
      stdio: 'inherit',
    });

    redisSrv.on('error', function(err) {
      reject(new Error('Error caught spawning the server:' + err.message));
    });

    setTimeout(resolve, 1500);
  });

exports.disconnect = function() {
  redisSrv.kill('SIGKILL');
  return Promise.resolve();
};
