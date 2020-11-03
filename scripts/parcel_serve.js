const detect = require('detect-port');
const {exec} = require('child_process');

const port = 1234;

detect(port, (err, _port) => {
    if (err) {
        console.log(err);
    }

    if (port == _port) {
        console.log(`port: ${port} was not occupied`);
        var proc = exec('npm run parcel_serve');
        proc.stdout.on('data', (data) => console.log(data));
    } else {
        console.log(`port: ${port} was occupied, try port: ${_port}`);
    }
});
