// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

export default (audioBytes) => {
  // Creates a client
  const client = new speech.SpeechClient({
    keyFilename: 'hayanmind01-50b3c4e6655c.json',
  });

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
    uri: 'gs://speech-hayanmind-01/news1.wav',
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'ko-KR',
    // https://cloud.google.com/nodejs/docs/reference/speech/1.4.x/google.cloud.speech.v1#.RecognitionConfig
    enableWordTimeOffsets: true,
  };

  const request = {
    audio,
    config,
  };

  // Detects speech in the audio file
  return client
    .longRunningRecognize(request)
    .then(data => {
      const operation = data[0];
      return operation.promise();
    })
    .then(data => {
      const response = data[0];
      return response.results;
      /*const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcription: ${transcription}`);*/
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};
