import googleSpeech from './googleSpeech';

const fs = require('fs');

const path = require('path');
const express = require('express');

const { exec } = require('child_process');

const app = express();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use(express.static(dist));

app.get('/', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.get('/speech-to-text', (req, res) => {

  // The name of the audio file to transcribe
  const fileName = './test-rec.wav';

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  googleSpeech(audioBytes)
    .then((response) => {
      exec(`python example.py ${audioBytes}`, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        const pitchResult = JSON.parse(stdout);

        const result = {
          pitchResult,
          asrResult: response,
        };

        res.status(200).json({ data: result });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});
