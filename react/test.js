
const { exec } = require('child_process');

exec(`python example.py ${audioBytes}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }
}