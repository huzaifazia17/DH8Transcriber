const transcriber = require('./transcriber');

let btnClicked = false;

document.getElementById('start').onclick = () => {
    if (btnClicked) return;
    btnClicked = true;
    transcriber.transcribe(document.getElementById('path').value);
};