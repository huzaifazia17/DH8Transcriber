const transcriber = require('./transcriber');

document.getElementById('start').onclick = () => {
    transcriber.transcribe(document.getElementById('path').value);
};