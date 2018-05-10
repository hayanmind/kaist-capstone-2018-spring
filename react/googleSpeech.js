// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

export default (audioBytes) => {
  // Creates a client
  const client = new speech.SpeechClient({
    keyFilename: 'GOOGLE_KEY_PATH',
  });

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
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
    .recognize(request)
    .then(data => {
      const response = data[0];
      return response;
    });
};
