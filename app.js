const transcriber = require('./transcriber');
const btn = document.getElementById('start');

setInterval(() => {
    if (!transcriber.isLoading()) {
        btn.innerHTML = 'Transcribe!';
    } else if (btn.innerHTML === 'Processing...' || btn.innerHTML === 'Transcribe!') {
        btn.innerHTML = 'Processing';
    } else {
        btn.innerHTML += '.';
    }
}, 400);

document.getElementById('start').onclick = () => {
    if (transcriber.isLoading()) return;
    transcriber.transcribe(document.getElementById('path').value);
};