//const fs = require('file-system');
const transcriber = require('./transcriber');

document.getElementById('start').onclick = () => {
    transcriber.getTranscript();
};